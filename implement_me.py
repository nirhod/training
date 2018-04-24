from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

from config import DB_PATH
from tables import BASE, EntryTable


def index(data):
    """
    Index the given entries.

    :note: May be called multiple times.

    :param data: A list of 'Entry' instances to index.
    """
    engine = create_engine(f'sqlite:///{DB_PATH}')
    BASE.metadata.create_all(engine)
    session = sessionmaker(bind=engine)()
    for entry in data:
        entry_line_table = EntryTable(ip=entry.ip, protocol=entry.protocol, timestamp=entry.timestamp)
        session.add(entry_line_table)
    session.commit()


def get_device_histogram(ip, n):
    """
    Return the latest 'n' entries for the given 'ip'.
    """
    session = sessionmaker(bind=create_engine(f'sqlite:///{DB_PATH}'))()
    query = session.query(EntryTable).filter_by(ip=ip).order_by(EntryTable.timestamp.desc()).limit(n)
    return [{'timestamp': entry.timestamp, 'protocol': entry.protocol} for entry in query]


def get_devices_status():
    """
    Return a list of every ip and the latest time it was seen it.
    """
    session = sessionmaker(bind=create_engine(f'sqlite:///{DB_PATH}'))()
    return session.query(EntryTable.ip, func.max(EntryTable.timestamp)).group_by(EntryTable.ip).all()
