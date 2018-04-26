from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

IP_LEN = 15
DEFAULT_VARCHAR_LEN = 256
BASE = declarative_base()


class EntryTable(BASE):
    """
    Represents an entry (line in a table).
    """
    __tablename__ = 'entries'

    id = Column(Integer, primary_key=True)
    ip = Column(String(IP_LEN))
    protocol = Column(String(DEFAULT_VARCHAR_LEN))
    timestamp = Column(DateTime)
