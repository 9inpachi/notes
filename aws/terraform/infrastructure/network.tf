resource "aws_route" "internet_access" {
  route_table_id = "${var.default_vpc.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = "${var.vpc_gateway}"
}

resource "aws_security_group" "security_group_test" {
  name = "security_group_test"
  description = "Allow TLS inbound traffic on port 80 (http)"
  vpc_id = "${var.default_vpc.vpc_id}"

  ingress {
    from_port = 80
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
