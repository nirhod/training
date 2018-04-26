from dateutil import parser
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import warnings

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
        document = dict(entry._asdict())
        document['_index'] = config.INDEX_NAME
        document['_type'] = document['_index']
        pending_documents.append(document)
        if len(pending_documents) == config.INDEX_BUFFER_SIZE:
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


def get_devices_status(max_documents=config.MAX_GET_DEVICES_STATUS_DOCUMENTS):
    """
    Return a list of every ip and the latest time it was seen it.
    """
    count_query = {
        'size': 0,
        'aggs': {
            'distinct_ips': {
                'cardinality': {
                    'field': 'ip'
                }
            }
        }
    }
    ips_counter = es.search(config.INDEX_NAME, config.INDEX_NAME, count_query)['aggregations']['distinct_ips']['value']

    query = {
        'size': 0,
        'aggs': {
            'group_by_ip': {
                'terms': {
                    'size': max_documents,
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
    result = es.search(config.INDEX_NAME, config.INDEX_NAME, query)
    if len(result['aggregations']['group_by_ip']['buckets']) < ips_counter:
        warnings.warn(f'Only {max_documents} ips returned but there are {ips_counter} in db!', Warning)
    return [(bucket['key'], parser.parse(bucket['max_time']['value_as_string'], ignoretz=True)) for bucket in
            result['aggregations']['group_by_ip']['buckets']]
