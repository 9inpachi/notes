resource "aws_ecs_task_definition" "backend_test_task" {
    family = "backend_test_family"

    // Fargate is a type of ECS that requires awsvpc network_mode
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"

    // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
    memory = "512"
    cpu = "10"

    // Fargate requires task definitions to have an execution role ARN to support ECR images
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = <<EOT
[
    {
        "name": "test_container",
        "image": "184319202034.dkr.ecr.me-south-1.amazonaws.com/ecr_test_repo:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 3000,
                "hostPort": 3000
            }
        ]
    }
]
EOT
}

resource "aws_ecs_cluster" "backend_test_cluster" {
  name = "backend_test_cluster"
}

resource "aws_ecs_service" "backend_test_service" {
    name = "backend_test_service"

    cluster = "${aws_ecs_cluster.backend_test_cluster.id}"
    task_definition = "${aws_ecs_task_definition.backend_test_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
        security_groups = ["${aws_security_group.security_group_test.id}"]
        assign_public_ip = true
    }
}
