from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import DB_PATH

Base = declarative_base()
engine = create_engine(f'sqlite:///{DB_PATH}')


class SessionAPI:
    """
    Holds SQLAlchemy session and used in order to connect and disconnect.
    """
    def __init__(self):
        self.session = None

    def connect(self, engine=engine):
        self.session = sessionmaker(bind=engine)()

    def disconnect(self):
        self.session.close()


session = SessionAPI()
