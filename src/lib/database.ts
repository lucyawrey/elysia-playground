import Database from "bun:sqlite";
import { CamelCasePlugin, Kysely } from "kysely";
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

export const database = new Kysely<Schema>({
  dialect: new BunSqliteDialect({ database: sqlite }),
  plugins: [new CamelCasePlugin()],
});