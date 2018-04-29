import redis
from dateutil import parser

import config


connection = redis.StrictRedis(host='localhost', port=config.REDIS_PORT)


def index(data):
    """
    Index the given entries.

    :note: May be called multiple times.

    :param data: A list of 'Entry' instances to index.
    """
    for entry in data:
        string_entry = f'{entry.timestamp}{config.INDEX_SEPARATOR}{entry.protocol}'
        connection.zadd(entry.ip, -entry.timestamp.timestamp(), string_entry)


def get_device_histogram(ip, n):
    """
    Return the latest 'n' entries for the given 'ip'.
    """
    histogram = []
    for entry in connection.zrange(ip, 0, n - 1):
        entry = entry.decode()
        timestamp, protocol = entry.split(config.INDEX_SEPARATOR)
        histogram.append({'timestamp': parser.parse(timestamp), 'protocol': protocol})
    return histogram


def get_devices_status():
    """
    Return a list of every ip and the latest time it was seen it.
    """
    return [(ip.decode(), parser.parse(connection.zrange(ip, 0, 0)[0].decode().split(config.INDEX_SEPARATOR)[0]))
            for ip in connection.keys()]
