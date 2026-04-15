variable "aws_region" {
  description = "AWS region"
  default     = "eu-west-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "jobtrackr-key"
}

variable "my_ip" {
  description = "196.187.146.110/32"
}
