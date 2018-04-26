import pytest
import docker
import time
import datetime

from datasets import s1narrow
from implement_me import index, es, get_device_histogram, get_devices_status
from config import ELASTIC_PORT, INDEX_NAME


def test_index(dataset):
    count_ = es.count(INDEX_NAME)['count']
    assert count_ == len(dataset)
    assert es.search(INDEX_NAME, INDEX_NAME, {
        'query': {
            'bool': {
                'must': [
                    {'match': {'ip': dataset[0].ip}},
                    {'match': {'protocol': dataset[0].protocol}},
                    {'match': {'timestamp': dataset[0].timestamp}}
                ]
            }
        }
    })['hits']['total'] >= 1


def test_get_device_histogram(dataset):
    real_result = [{'timestamp': entry.timestamp, 'protocol': entry.protocol} for entry in dataset
                   if entry.ip == dataset[0].ip]
    real_result.sort(key=lambda entry: entry['timestamp'], reverse=True)
    histogram = get_device_histogram(dataset[0].ip, 15)
    assert real_result[:15] == histogram


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
    container = client.containers.run('elasticsearch', ports={ELASTIC_PORT: ELASTIC_PORT}, detach=True, remove=True)
    # Stop the code execution until the elastic-docker is up.
    logs = container.logs(stream=True, tail=2)
    while not (next(logs).endswith(b'started\n') or next(logs).endswith(b'started\n')):
        time.sleep(1)
        logs = container.logs(stream=True, tail=2)
    index(dataset)
    es.indices.refresh(INDEX_NAME)
    yield
    container.stop()
