#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Imports
from api.methods.files_methods import read_settings

# Resources imports
from api.resources.auth_resource import Auth
from api.resources.user_resource import User

# Add all the endpoints to the API
def add_endpoints(api):
    root = read_settings("api")["base_url"]
    api.add_resource(Auth, f"{root}auth")
    api.add_resource(User, f"{root}user/<username>")
