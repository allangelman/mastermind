#!/bin/bash

set -eux

pushd api

npm install
npm run build

popd

