import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Schema
  await db.schema
    .createTable("content")
    .addColumn("id", "text", (col) => col.primaryKey().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("data", "text")
    .execute();

  // Test data
  await db
    .insertInto("content")
    .values({
      id: crypto.randomUUID(),
      name: "Kiss girls",
      data: JSON.stringify({
        description: "Kiss girls",
        done: true,
      }),
    })
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("content").execute();
}
