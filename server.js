//import routes

import express from "express";
import cors from "cors";
import products from "./routes/product.js";
import reviews from "./routes/review.js";
import { DSN, PORT } from "./utils/constants.js";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import generateUniqueId from "generate-unique-id";
//create the connection

const app = express();

Sentry.init({
  dsn: DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  environment: "test-rishabh",
  release:
    "node-express@" +
    generateUniqueId({
      length: 26,
    }),
  autoSessionTracking: false, // default: true
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
// TracingHandler creates a trace for every incoming request

//define routes
app.use("/api/v1/products", products);
app.use("/api/v1/reviews", reviews);
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
//API documentation route

app.get("/", (req, res) => {
  const id = generateUniqueId({
    length: 188,
  });

  res.json({ status: "welcome to sequelize backend", id });
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
