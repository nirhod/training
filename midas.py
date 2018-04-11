from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker

NAME_LEN = 30
DEFAULT_VARCHAR_LEN = 256

Base = declarative_base()
engine = create_engine('sqlite:///./midas.db')
session = sessionmaker(bind=engine)()


class Member(Base):
    """
    Represents a member in an organization.
    """
    __tablename__ = 'members'

    id = Column(Integer, primary_key=True)
    name = Column(String(NAME_LEN))
    last_name = Column(String(NAME_LEN))
    role = Column(String(DEFAULT_VARCHAR_LEN))
    location = Column(String(DEFAULT_VARCHAR_LEN))

    def __repr__(self):
        return f'<User(id={self.id}, name={self.name}, last_name={self.last_name}, role={self.role}' \
               f', location={self.location})>'

    def __str__(self):
        return self.__repr__()
