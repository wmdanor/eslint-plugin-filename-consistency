#!/bin/bash

set -e

./scripts/check.sh

version=$(jq -r '.version' package.json)

if [[ -z $version ]] || [[ $version == "null" ]]; then
    echo "version not found"
    exit 1
fi

tag="v${version}"

echo "Releasing ${tag}"

git tag $tag

git tag push

gh release create $tag

npm publish
