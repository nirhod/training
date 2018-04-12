from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker

NAME_LEN = 30
DEFAULT_VARCHAR_LEN = 256

Base = declarative_base()
engine = create_engine('sqlite:///./midas.db')
session = sessionmaker(bind=engine)()


class Terrorist(Base):
    """
    Represents a Terrorist in an organization.
    """
    __tablename__ = 'Terrorists'

    id = Column(Integer, primary_key=True)
    name = Column(String(NAME_LEN))
    last_name = Column(String(NAME_LEN))
    role = Column(String(DEFAULT_VARCHAR_LEN))
    location = Column(String(DEFAULT_VARCHAR_LEN))

    def __repr__(self):
        return f'<Terrorist(id={self.id}, name={self.name}, last_name={self.last_name}, role={self.role}' \
               f', location={self.location})>'

    def __str__(self):
        return self.__repr__()


class Organization(Base):
    """
    Represents a terror organization.
    """
    __tablename__ = 'Organizations'

    id = Column(Integer, primary_key=True)
    prime_location = Column(String(DEFAULT_VARCHAR_LEN))
    name = Column(String(NAME_LEN))


class Event(Base):
    """
    Represents a terror attack.
    """
    __tablename__ = 'Events'

    id = Column(Integer, primary_key=True)
    location = Column(String(DEFAULT_VARCHAR_LEN))
    date = Column(DateTime)


