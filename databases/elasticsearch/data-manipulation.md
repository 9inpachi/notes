# Data Manipulation

[Source](https://www.tutorialspoint.com/elasticsearch/elasticsearch_api_conventions.htm)

## Configuration

## Disable Automatic Creation of Indexes

This disables automatic creation of indexes and also the underlying mapping for the JSON object.

```yml
action.auto_create_index:false
index.mapper.dynamic:false
```

Disable automatic creation for specific indexes.

```yml
action.auto_create_index:+acc*,-bank*
```

`+` is allowed and `-` is not allowed.

## Putting Data

### Adding an Index

Console:

```sh
PUT /${index_name}
```

### Adding Bulk Data

cURL:

```sh
# `test_data` is the index we are adding the data to.
curl -XPOST "https://elastic:${password}@localhost:9200/test_data/_bulk" \
  -H "Content-Type: application/x-ndjson" \
  --data-binary @/path/to/data.json \
  --cacert ./http_ca.crt \
  --ssl-no-revoke # only needed for Windows
```

The data should be in the format (yeah, it's not JSON but that's how it is):

```json
{"index":{}}
{"firstName":"first0","lastName":"last0","city":"city0","postal":"0000"}
{"index":{}}
{"firstName":"first1","lastName":"last1","city":"city1","postal":"0001"}
```

## Querying Data

### Standard

```text
GET /index_name/_search
{
  "query": {
    "query_string": {
      "query": "*test_query*"
    }
  }
}
```

### Multiple Indices

Comma separated notation:

```text
GET /index1,index2,index3/_search
```

### All Indices

```text
GET /_all/_search
```

### Wildcards

`*`: Glob
`-`: Ignore index (`-index_name`)

```text
GET /index_name*/_search
GET /index_name*,-index_name_1/_search
```

### Filtering Response

```text
GET /index_name/_search?filter_path=hits.total
```

This will only have `hits.total` in the response and nothing else.

## Document API

### Adding a Document

Console:

```sh
PUT /${index_name}/_doc/${doc_id}
{
  "dataKey": "dataValue"
}
```

### Versioning

The `version` query parameter can be used to specify the version of the document.

```text
PUT /index_name/_doc/test_id?version=10&version_type=external
```

**Internal versioning:** Version starts with 1 and increments automatically with each update and delete.
**External versioning:** Version is not incremented automatically but specified with the `version` query parameter.
