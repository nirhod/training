import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_PATH = os.path.join(os.path.dirname(__file__), 'midas.db')

Base = declarative_base()
engine = create_engine(f'sqlite:///{DB_PATH}')
session = sessionmaker(bind=engine)()
