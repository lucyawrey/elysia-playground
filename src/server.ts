import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .get('/', ({ set }) => {
    set.redirect = '/api'
  })
  .use(swagger({ path: "/api", exclude: ["/", "/api", "/api/json"] }))
  .get("/api/ping", () => "pong")
  .get("/api/:id", ({ params: { id } }) => id)
  .post("/mirror", ({ body }) => body, {
    body: t.Object({
      id: t.String(),
      name: t.String(),
    }),
  })
  .listen(3000);

export type App = typeof app;

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
