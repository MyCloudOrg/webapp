
packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}


variable "aws_access_key" {
  default = "AKIAUEPM7GF2MKKFAEYJ"
}
variable "aws_secret_key" {
  default = "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"
}
variable "aws_region" {
  default = "us-east-1"
}

variable "source_ami" {
  default = "ami-0dfcb1ef8550277af"
}
variable "instance_type" }
  default = "t2.micro"
}
variable "ssh_username" {
  default = "ec2-user"
}
variable "ami_description" {
  default = "AMI for CSYE 6225"
}

variable "profile" {
  type    = string
  default = "dev"
}



source "amazon-ebs" "custom-ami" {
  profile    = var.profile
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
  // ami_name   = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_name         = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  instance_type    = var.instance_type
  source_ami       = var.source_ami
  ssh_username     = var.ssh_username
  ami_description  = var.ami_description
  ami_users        = ["284501684596","211557098291"]
  force_deregister = true
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }
  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
  // force_deregister_snapshot = true
  tags = {
    Name = "Custom AMI built with Packer"
  }
  run_tags = {
    Name = "Custom AMI built with Packer"
  }
}

// ssh_interface = "public_ip"
// ssh_pty       = true
// associate_public_ip_address = true

build {
  sources = [
    "source.amazon-ebs.custom-ami"
  ]

  provisioner "shell" {
    inline = [
      "sudo amazon-linux-extras install -y epel",
      "sudo yum -y update",
      "curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -",
      "sudo yum -y install nodejs",
      "node -v"
    ]
  }

  provisioner "shell" {
    inline = [
      "sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y",
      "sudo yum install mysql-community-server -y",
      "sudo systemctl enable mysqld",
      "sudo systemctl start mysqld",
      "test=$(sudo grep 'temporary password' /var/log/mysqld.log | awk {'print $13'})",
      "mysql --connect-expired-password -u root -p$test -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'Siva@007';\"",
      "mkdir /home/ec2-user/webapp",
      "chown ec2-user:ec2-user /home/ec2-user/webapp"
    ]
  }

  provisioner "file" {
    source      = "./"
    destination = "/home/ec2-user/webapp"
  }

  provisioner "shell" {
    inline = [
      "cd /home/ec2-user/webapp",
      "sudo npm install",
      "sudo cp /home/ec2-user/webapp/nodeapp.service /lib/systemd/system/nodeapp.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable nodeapp",
      "sudo systemctl start nodeapp"
    ]
  }

}


