VERSION=`npx sentry-cli releases propose-version`
# Workflow to create releases
npx sentry-cli releases  --org student-qlx --project node-express new "$VERSION"
npx sentry-cli releases  --org student-qlx --project node-express set-commits "$VERSION" --auto
npx sentry-cli releases  --org student-qlx --project node-express finalize "$VERSION"
