VERSION=`npx sentry-cli releases propose-version`
# Workflow to create releases
npx sentry-cli --org student-qlx releases new "$VERSION"
npx sentry-cli releases set-commits "$VERSION" --auto
npx sentry-cli releases finalize "$VERSION"
