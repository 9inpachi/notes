# Data Manipulation

## Putting Data

### Adding an Index

Console:

```sh
PUT /${index_name}
```

### Adding a Document

Console:

```sh
PUT /${index_name}/_doc/${doc_id}
{
  "dataKey": "dataValue"
}
```

### Adding Bulk Data

cURL:

```sh
# `test_data` is the index we are adding the data to.
curl -XPOST "https://elastic:${password}@localhost:9200/test_data/_bulk" \
  -H "Content-Type: application/x-ndjson" \
  --data-binary "@D/path/to/data.json" \
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
