variable "aws_region" {
  default = "me-south-1"
  description = "Region the AWS resources will be deployed to."
}

variable "default_vpc" {
  description = "Default VPC of personal account"
  type = object({
    vpc_id = string
    main_route_table_id = string
  })
  default = {
    vpc_id = "vpc-02090d78efc50ef1c"
    main_route_table_id = "rtb-0f7808ab3d2e24f2c"
  }
}
