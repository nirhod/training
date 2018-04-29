import pytest
import docker
import datetime

import config
from implement_me import connection, index, get_device_histogram, get_devices_status
from datasets import s1narrow


def test_index(dataset):
    db_first_entry = connection.zrange(dataset[0].ip, 0, -1)
    real_first_entry = f'{dataset[0].timestamp}{config.INDEX_SEPARATOR}{dataset[0].protocol}'.encode()
    assert real_first_entry in db_first_entry
    ips = {entry.ip for entry in dataset}
    db_counter = sum([connection.zcard(ip) for ip in ips])
    assert db_counter == len(set(dataset))


def test_get_device_histogram(dataset):
    dataset_histogram = [{'timestamp': entry.timestamp, 'protocol': entry.protocol} for entry in dataset
                         if entry.ip == dataset[0].ip]
    dataset_histogram.sort(key=lambda entry: entry['timestamp'], reverse=True)
    db_histogram = get_device_histogram(dataset[0].ip, 15)
    assert dataset_histogram[:15] == db_histogram


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
    container = client.containers.run('redis', ports={config.REDIS_PORT: config.REDIS_PORT}, detach=True, remove=True)
    index(dataset)
    yield
    container.stop()
