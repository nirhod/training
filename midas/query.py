from sqlalchemy.ext.declarative.api import DeclarativeMeta
import sqlalchemy

from .session_creator import session


class Query:
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
        returned = getattr(self.query, item)
        if isinstance(returned, sqlalchemy.orm.query.Query) \
                or (callable(returned) and isinstance(returned(), sqlalchemy.orm.query.Query)):
            return Query(self.type, returned)
        return returned

    def __call__(self, *args, **kwargs):
        return Query(self.type, self.query(*args, **kwargs))

    def __getitem__(self, item):
        return self.query.__getitem__(item)

    def __repr__(self):
        return f'<{self.query.count()} {self.type.__name__}s>'

    def refine(self, *entities, **kwargs) -> 'Query':
        """
        Same as filter and filter_by of sqlalchemy, but return Query object that supports the query API.

        Example: Terrorist.get().refine(id=111) -> <1 Terrorists>
        """
        if kwargs and isinstance(next(iter(kwargs.keys())), str):
            query = self.query.filter_by(*entities, **kwargs)
        else:
            query = self.query.filter(*entities, **kwargs)
        return Query(self.type, query)


class UseQuery:
    """
    Each table class that inherit from UseQuery will the support query API.
    """
    @classmethod
    def get(cls) -> Query:
        """
        :return: All the objects in db with type same as cls.

        Example: Terrorist.get() -> <2 Terrorists>
        """
        return Query(cls, session.query(cls))
