#!/usr/bin/env python

class DirectoryError(Exception):
    "This exception is raised when there is a directory error"
    pass

class DockerComposeError(Exception):
    "this excepetion is raised when there is an issue with the docker-compose.yml"
    pass

class KubectlError(Exception):
    "This exception is raised when there is an error with kubectl"
    pass