from dateutil import parser
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

import config

es = Elasticsearch(config.ELASTIC_URL)


def index(data):
    """
    Index the given entries.

    :note: May be called multiple times.

    :param data: A list of 'Entry' instances to index.
    """
    if not es.indices.exists(config.INDEX_NAME):
        es.indices.create(config.INDEX_NAME, config.INDEX_MAPPING)
    pending_documents = []
    for entry in data:
        js = dict(entry._asdict())
        js['_index'] = config.INDEX_NAME
        js['_type'] = js['_index']
        pending_documents.append(js)
        if len(pending_documents) >= config.INDEX_BUFFER_SIZE:
            bulk(es, pending_documents)
            pending_documents = []
    bulk(es, pending_documents)


def get_device_histogram(ip, n):
    """
    Return the latest 'n' entries for the given 'ip'.
    """
    result = es.search(config.INDEX_NAME, config.INDEX_NAME, {'from': 0, 'size': n,
                                                              'query': {'match': {'ip': ip}},
                                                              'sort': {'timestamp': {'order': 'desc'}}})
    return [{'timestamp': parser.parse(entry['_source']['timestamp']), 'protocol': entry['_source']['protocol']} for
            entry in result['hits']['hits']]


def get_devices_status():
    """
    Return a list of every ip and the latest time it was seen it.
    """
    query = {
        'size': 0,
        'aggs': {
            'group_by_ip': {
                'terms': {
                    'size': config.MAX_GET_DEVICES_STATUS_DOCUMENTS,
                    'field': 'ip'
                },
                'aggs': {
                    'max_time': {
                        'max': {
                            'field': 'timestamp'
                        }
                    }
                }
            }
        }
    }
    result = es.search('entries', 'entries', query)
    return [(bucket['key'], parser.parse(bucket['max_time']['value_as_string'], ignoretz=True)) for bucket in
            result['aggregations']['group_by_ip']['buckets']]
