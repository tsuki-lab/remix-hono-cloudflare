import * as build from "@remix-run/dev/server-build";
import { handle } from "hono/cloudflare-pages";
import { Hono } from "hono";
import { logDevReady, createRequestHandler } from "@remix-run/cloudflare";

if (process.env.NODE_ENV === "development") logDevReady(build);

const app = new Hono();

app.get("/api/hono", (c) => {
  return c.text("Created Hono API Route!!!");
});

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);

app.mount("/", remixHandler, (c) => ({ env: c.env }));

export const onRequest = handle(app);
