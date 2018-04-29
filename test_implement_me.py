import pytest
import docker
import datetime

import config
from datasets import s1narrow
from implement_me import index, get_device_histogram, get_devices_status, collection


def test_index(dataset):
    assert collection.count() == len(dataset)
    db_entry = collection.find_one(dataset[0]._asdict())
    db_entry.pop('_id')
    assert db_entry == dataset[0]._asdict()


def test_get_device_histogram(dataset):
    real_result = [{'timestamp': entry.timestamp, 'protocol': entry.protocol} for entry in dataset
                   if entry.ip == dataset[0].ip]
    real_result.sort(key=lambda entry: entry['timestamp'], reverse=True)
    db_histogram = get_device_histogram(dataset[0].ip, 15)
    assert real_result[:15] == db_histogram


def test_get_devices_status(dataset):
    ip_to_max_time = {}
    for data in dataset:
        ip_to_max_time[data.ip] = max(data.timestamp, ip_to_max_time.get(data.ip, datetime.datetime.min))
    real_result = sorted([(ip, max_time) for ip, max_time in ip_to_max_time.items()])
    assert real_result == sorted(get_devices_status())


@pytest.fixture(scope='session')
def dataset():
    return list(s1narrow())


@pytest.fixture(scope='session', autouse=True)
def create_db(dataset):
    client = docker.from_env()
    container = client.containers.run('mongo', ports={config.MONGO_PORT: config.MONGO_PORT}, detach=True, remove=True)
    index(dataset)
    yield
    container.stop()
