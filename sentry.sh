#!/usr/bin/env bash
if [ "$1" == "" ]; then
    echo "No remote alias provided"
    exit 1
fi

if [ "$2" == "" ]; then
    echo "No branch provided"
    exit 1
fi

git push $1 $2
VERSION=`npx sentry-cli releases propose-version`
# Workflow to create releases
npx sentry-cli releases  --org student-qlx --project node-express new "$VERSION"
npx sentry-cli releases  --org student-qlx --project node-express set-commits "$VERSION" --auto
npx sentry-cli releases  --org student-qlx --project node-express finalize "$VERSION"
