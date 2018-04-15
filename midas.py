from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative.api import DeclarativeMeta
import sqlalchemy

NAME_LEN = 30
DEFAULT_VARCHAR_LEN = 256

Base = declarative_base()
DB_PATH = './midas.db'
engine = create_engine(f'sqlite:///{DB_PATH}')
session = sessionmaker(bind=engine)()


class Query:
    """
    This class is very close to Query class of sqlalchemy, but this class also supports the query API.
    """
    def __init__(self, table_type: DeclarativeMeta, query: sqlalchemy.orm.query.Query):
        """
        :param table_type: Terrorist or Organization or Event.
        :param query: Query obbject of sqlalchemy.
        """
        self.type = table_type
        self.query = query

    def __repr__(self):
        return f'<{self.query.count()} {self.type.__name__}s>'

    def __getattr__(self, item):
        return getattr(self.query, item)

    def __getitem__(self, item):
        return self.query.__getitem__(item)

    def refine(self, *entities, **kwargs) -> 'Query':
        """
        Same as filter and filter_by of sqlalchemy, but return Query object that supports the query API.

        Example: Terrorist.get().refine(id=111) -> <1 Terrorists>
        """
        if kwargs and isinstance(next(iter(kwargs.keys())), str):
            query = self.query.filter_by(**kwargs)
        else:
            query = self.query.filter(*entities, **kwargs)
        return Query(self.type, query)


class _UseQuery:
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


association_table_event_terrorist = Table('association', Base.metadata
                                          , Column('terrorist_id', Integer, ForeignKey('Terrorists.id'))
                                          , Column('event_id', Integer, ForeignKey('Events.id')))


class Organization(Base, _UseQuery):
    """
    Represents a terror organization.
    """
    __tablename__ = 'Organizations'

    id = Column(Integer, primary_key=True)
    prime_location = Column(String(DEFAULT_VARCHAR_LEN))
    name = Column(String(NAME_LEN))

    def __repr__(self):
        return f'<Organization(id={self.id}, name={self.name}, prime_location={self.prime_location})>'

    def __str__(self):
        return self.__repr__()


class Terrorist(Base, _UseQuery):
    """
    Represents a Terrorist in an organization.
    """
    __tablename__ = 'Terrorists'

    id = Column(Integer, primary_key=True)
    name = Column(String(NAME_LEN))
    last_name = Column(String(NAME_LEN))
    role = Column(String(DEFAULT_VARCHAR_LEN))
    location = Column(String(DEFAULT_VARCHAR_LEN))
    organization = relationship('Organization', backref='terrorists')
    organization_id = Column(Integer, ForeignKey('Organizations.id'))
    events = relationship('Event', secondary=association_table_event_terrorist, backref='terrorists')

    def __repr__(self):
        events = [event.id for event in self.events]
        return f'<Terrorist(id={self.id}, name={self.name}, last_name={self.last_name}, role={self.role}' \
               f', location={self.location}, organization={self.organization_id}, events={events})>'

    def __str__(self):
        return self.__repr__()


class Event(Base, _UseQuery):
    """
    Represents a terror attack.
    """
    __tablename__ = 'Events'

    id = Column(Integer, primary_key=True)
    location = Column(String(DEFAULT_VARCHAR_LEN))
    date = Column(DateTime)

    def __repr__(self):
        return f'<Event(id={self.id}, location={self.location})>'

    def __str__(self):
        return self.__repr__()
