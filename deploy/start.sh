#!/usr/bin/bash

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# This script is only for server deployment!
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

# load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm run 19 target/index.js