import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable("placeholder").addColumn("exampleColumn", "text").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("placeholder").execute();
}
