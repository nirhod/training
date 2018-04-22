from sqlalchemy.ext.declarative.api import DeclarativeMeta
import sqlalchemy

from .session_creator import session


class QueryAPI:
    """
    Extends Query class of sqlalchemy, this class also supports the query API.
    """
    def __init__(self, table_type: DeclarativeMeta, query: sqlalchemy.orm.query.Query):
        """
        :param table_type: Terrorist or Organization or Event.
        :param query: Query object of sqlalchemy.
        """
        self.type = table_type
        self.query = query

    def __getattr__(self, item):
        def sqlalchemy_objects_wrapper(returned):
            """
            Like a decorator for sqlalchemy.query objects in order to keep returning QueryAPI objects.

            :param returned: Object returned from getattr on sqlalchemy.query.
            :return: An object that wraps returned.
            """
            def function_wrapper(*args, **kwargs):
                return sqlalchemy_objects_wrapper(returned(*args, **kwargs))

            if isinstance(returned, sqlalchemy.orm.query.Query):
                return QueryAPI(self.type, returned)
            if callable(returned):
                return function_wrapper
            return returned

        return sqlalchemy_objects_wrapper(getattr(self.query, item))

    def __call__(self, *args, **kwargs):
        return QueryAPI(self.type, self.query(*args, **kwargs))

    def __getitem__(self, item):
        return self.query.__getitem__(item)

    def __repr__(self):
        return f'<{self.query.count()} {self.type.__name__}s>'

    def refine(self, *entities, **kwargs) -> 'QueryAPI':
        """
        Same as filter and filter_by of sqlalchemy, but return Query object that supports the query API.

        Example: Terrorist.get().refine(id=111) -> <1 Terrorists>
        """
        # Checks the type of the keys of kwargs, the query is filter_by if the type is str.
        if kwargs and isinstance(next(iter(kwargs.keys())), str):
            query = self.query.filter_by(*entities, **kwargs)
        else:
            query = self.query.filter(*entities, **kwargs)
        return QueryAPI(self.type, query)


class UseQuery:
    """
    Each table class that inherit from UseQuery will support the query API.
    """
    @classmethod
    def get(cls) -> QueryAPI:
        """
        :return: All the objects in db with type same as cls.

        Example: Terrorist.get() -> <2 Terrorists>
        """
        return QueryAPI(cls, session.session.query(cls))
