import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime
import tempfile

import config
config.DB_PATH = tempfile.mkstemp()[1]

import datasets
from implement_me import index, get_device_histogram, get_devices_status
from tables import EntryTable


def test_index(dataset, session):
    assert session.query(EntryTable).count() == len(dataset)
    assert session.query(EntryTable).filter_by(ip=dataset[1].ip, protocol=dataset[1].protocol,
                                               timestamp=dataset[1].timestamp).limit(1).count() == 1


def test_get_device_histogram(dataset):
    real_result = [{'timestamp': entry.timestamp, 'protocol': entry.protocol} for entry in dataset
                   if entry.ip == dataset[0].ip]
    real_result.sort(key=lambda entry: entry['timestamp'], reverse=True)
    assert real_result[:10] == get_device_histogram(dataset[0].ip, 10)


def test_get_devices_status(dataset):
    ip_to_max_time = {}
    for data in dataset:
        ip_to_max_time[data.ip] = max(data.timestamp, ip_to_max_time.get(data.ip, datetime.datetime.min))
    real_result = sorted([(ip, max_time) for ip, max_time in ip_to_max_time.items()])
    assert real_result == sorted(get_devices_status())


@pytest.fixture(scope='session')
def dataset():
    return list(datasets.s1narrow())


@pytest.fixture()
def session():
    engine = create_engine(f'sqlite:///{config.DB_PATH}')
    return sessionmaker(bind=engine)()


@pytest.fixture(scope='session', autouse=True)
def create_db(dataset):
    index(dataset)
    yield
