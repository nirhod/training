from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
import datetime

from .session_creator import Base
from .query_api import UseQuery

NAME_LEN = 30
DEFAULT_VARCHAR_LEN = 256

association_table_event_terrorist = Table('association_event_terrorist', Base.metadata,
                                          Column('terrorist_id', Integer, ForeignKey('terrorists.id')),
                                          Column('event_id', Integer, ForeignKey('events.id')))


class Organization(Base, UseQuery):
    """
    Represents a terror organization.
    """
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True)
    prime_location = Column(String(DEFAULT_VARCHAR_LEN))
    name = Column(String(NAME_LEN))

    def __repr__(self):
        return f'<Organization(name={self.name}, prime_location={self.prime_location})>'

    def __str__(self):
        return self.__repr__()


class Terrorist(Base, UseQuery):
    """
    Represents a Terrorist in an organization.
    """
    __tablename__ = 'terrorists'

    id = Column(Integer, primary_key=True)
    name = Column(String(NAME_LEN))
    last_name = Column(String(NAME_LEN))
    role = Column(String(DEFAULT_VARCHAR_LEN))
    location = Column(String(DEFAULT_VARCHAR_LEN))
    organization_id = Column(Integer, ForeignKey('organizations.id'))

    organization = relationship('Organization', backref='terrorists')
    events = relationship('Event', secondary=association_table_event_terrorist, backref='terrorists')

    def __repr__(self):
        return f'<Terrorist(name={self.name}, last_name={self.last_name}, role={self.role}, location={self.location})>'

    def __str__(self):
        return self.__repr__()


class Event(Base, UseQuery):
    """
    Represents a terror attack.
    """
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    location = Column(String(DEFAULT_VARCHAR_LEN))
    date = Column(DateTime, default=datetime.datetime.now())

    def __repr__(self):
        return f'<Event(location={self.location}, date={self.date.strftime("%Y-%m-%d %H:%M")})>'

    def __str__(self):
        return self.__repr__()
