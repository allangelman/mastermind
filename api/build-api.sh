#!/bin/bash

set -eux

pushd .

npm install
npm run build

popd

