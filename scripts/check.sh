#!/bin/bash

set -e

npm run format

npm run lint

npm run test

npm run typecheck
