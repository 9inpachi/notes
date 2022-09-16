# AWS notes

## All links

* [Serverless Node.js REST API with Lambda and DyanamoDB](https://www.serverless.com/blog/node-rest-api-with-serverless-lambda-and-dynamodb)
* [REST API with Lambda and AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)
* [Account and Access Keys](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html)
* [IAM Permissions](https://www.serverless.com/blog/abcs-of-iam-permissions)
* [Integrating API Gateway with Lambda (IMPORTANT)](https://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-lambda.html)

## Serverless framework

Framework for creating serverless applications in AWS lambda.

### How it works

1. Uploads code to S3 bucket
2. Links that with Lambda
3. Creates a API gateway

And it works through the API gateway.

### Commands

Invoke function locally.

```sh
sls invoke local --function functionName --path path/to/input/event.json
```

Run an offline server using `serverless-offline`.

```sh
sls offline --function functionName
```

### Examples

* [TypeScript Rest API Template](https://github.com/serverless/examples/tree/master/aws-node-rest-api-typescript-simple)

