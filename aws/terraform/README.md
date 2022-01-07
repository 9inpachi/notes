# Terraform Infrastructure

Based on the tutorial "[Deploy Node.js App on AWS using Terraform and Docker](https://codelabs.transcend.io/codelabs/node-terraform/index.html)"

## Steps

The infrastructure is configured to use already existing VPC, subnets and gateway.

1. Create a basic Node.js app.
2. Make a docker image for the app.
3. Build the image and push it to docker.
   * Create a `Dockerfile`. In the `Dockerfile`, copy the app, install the dependencies, expose port 3000 and run the app with `node index.js`.
   * Build and tag the image with `docker build -t terraform-test-app`.
   * Push the tagged docker image to AWS ECR.
     * Configuring AWS profiles for CLI (used to login and stuff): https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
     * To use the configured profile in CLI: `export AWS_PROFILE=prsnlterraform`
     * Once profile is configured, get the account ID using AWS CLI: `aws sts get-caller-identity | jq ".Account"`
        ```sh
          # Make sure the profile is configured and exported as the $AWS_PROFILE environment variable
          ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
          aws ecr get-login-password --region me-south-1 | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.me-south-1.amazonaws.com"
        ```
      * Once logged in, get the docker repository URI from AWS console and push the docker image to it.
        ```sh
          docker tag terraform-test-app $ACCOUNT_ID.dkr.ecr.me-south-1.amazonaws.com/ecr_test_repo:latest
          docker push $ACCOUNT_ID.dkr.ecr.me-south-1.amazonaws.com/ecr_test_repo:latest
        ```

