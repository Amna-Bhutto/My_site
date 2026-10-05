import { getDatabase } from "@netlify/database";

const db = getDatabase();

export default async (req) => {
  if (req.method === "GET") {
    const notes = await db.sql`SELECT * FROM notes ORDER BY created_at DESC`;
    return Response.json(notes);
  }

  if (req.method === "POST") {
    const { text } = await req.json();
    await db.sql`INSERT INTO notes (text) VALUES (${text})`;
    return Response.json({ ok: true }, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};
