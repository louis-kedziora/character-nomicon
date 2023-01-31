#!/bin/bash
# Kills the process on localhost 3000
lsof -ti tcp:3000 | xargs kill -9
lsof -ti tcp:4000 | xargs kill -9
