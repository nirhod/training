from pymongo import MongoClient

import config


client = MongoClient('localhost', config.MONGO_PORT)
db = client.get_database(config.DB_NAME)
collection = db.get_collection(config.COLLECTION_NAME)


def index(data):
    """
    Index the given entries.

    :note: May be called multiple times.

    :param data: A list of 'Entry' instances to index.
    """
    pending_documents = []
    for entry in data:
        pending_documents.append(dict(entry._asdict()))
        if len(pending_documents) == config.INDEX_BUFFER_SIZE:
            collection.insert_many(pending_documents)
            pending_documents = []
    if pending_documents:
        collection.insert_many(pending_documents)


def get_device_histogram(ip, n):
    """
    Return the latest 'n' entries for the given 'ip'.
    """
    query_result = collection.find({'ip': ip}).sort('timestamp', -1).limit(n)
    return [{'timestamp': entry['timestamp'], 'protocol': entry['protocol']} for entry in query_result]


def get_devices_status():
    """
    Return a list of every ip and the latest time it was seen it.
    """
    query_result = collection.aggregate([{'$group': {'_id': '$ip', 'max_time': {'$max': '$timestamp'}}}])
    return [(entry['_id'], entry['max_time']) for entry in query_result]
