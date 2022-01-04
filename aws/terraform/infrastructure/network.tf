resource "aws_subnet" "public_a" {
  vpc_id = "${var.default_vpc.vpc_id}"
  cidr_block = "172.31.1.0/24"
  availability_zone = "${var.aws_region}_testa"
}

resource "aws_subnet" "public_b" {
  vpc_id = "${var.default_vpc.vpc_id}"
  cidr_block = "172.31.2.0/24"
  availability_zone = "${var.aws_region}_testb"
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = "${var.default_vpc.vpc_id}"
}

resource "aws_route" "internet_access" {
  route_table_id = "${var.default_vpc.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = "${aws_internet_gateway.internet_gateway.id}"
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
