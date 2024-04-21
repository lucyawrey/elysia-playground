import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { Database } from "bun:sqlite";
import { Kysely, SqliteDialect } from "kysely";
import { BunSqliteDialect } from "kysely-bun-sqlite";

const sqlite = new Database("db.sqlite");

interface ContentTable {
  id: string;
  name: string;
  data: object;
}

interface Schema {
  content: ContentTable;
}

const database = new Kysely<Schema>({
  dialect: new BunSqliteDialect({ database: sqlite }),
});

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
