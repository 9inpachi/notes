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
4. Create `iam.tf` for creating an IAM role and attaching a policy.
5. Create `network.tf` for setting up a VPC, its subnets, gateway, routing and security groups. It's also possible to use an existing VPC.
6. Create `fargate.tf` for creating an ECS task definition, container definition in the task definition, an ECS cluster and then an ECS service inside that cluster which uses the created task definition.
7. Create `vars.tf` to define any variables (with default fallback values) and then a `vars.tfvars` can be supplied to the terraform commands to use secret variables.
    ```sh
      terraform apply -var-file="vars.tfvars"
    ```
8. Use the following terraform commands to plan and apply the infrastructure.
    ```sh
      terraform plan
      terraform apply
      terraform destroy
    ```
9. Access the app by going to the "Public IPv4 address" of the network interface (`eni-<id>`) associated to the task definition in ECS.
