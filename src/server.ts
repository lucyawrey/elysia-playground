import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { database } from "./lib/database";

const app = new Elysia()
  .get("/", ({ set }) => {
    set.redirect = "/api";
  })
  .use(swagger({ path: "/api", exclude: ["/", "/api", "/api/json"] }))
  .get("/api/ping", () => "pong")
  .get("/api/content", () => {
    return database.selectFrom("content").selectAll().execute();
  })
  .get("/api/content/:id", ({ params: { id } }) => {
    return database.selectFrom("content").where("id", "=", id).selectAll().executeTakeFirst();
  })
  .post(
    "/api/content",
    ({ body }) => {
      return database
        .insertInto("content")
        .values({ id: body.id ?? crypto.randomUUID(), name: body.name, data: JSON.stringify(body.data) })
        .returningAll()
        .executeTakeFirst();
    },
    {
      body: t.Object({
        id: t.Optional(t.String({ format: 'uuid' })),
        name: t.String(),
        data: t.Record(t.String(), t.String()),
      }),
    }
  )
  .listen(3000);

export type App = typeof app;

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
