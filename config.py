ELASTIC_PORT = 9200
ELASTIC_URL = f'http://localhost:{ELASTIC_PORT}'
INDEX_NAME = 'entries'
INDEX_BUFFER_SIZE = 1000
INDEX_MAPPING = """{
    "mappings": {
        "doc":
            {
              "properties": {
                "ip": { 
                  "type":     "text",
                  "fielddata": true
                }
              }
            }
    }
}"""
MAX_GET_DEVICES_STATUS_DOCUMENTS = 10000
