const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

exports.handler = async (event) => {
  await client.connect();
  const notes = client.db("myapp").collection("notes");

  if (event.httpMethod === "GET") {
    const all = await notes.find().sort({ createdAt: -1 }).toArray();
    return { statusCode: 200, body: JSON.stringify(all) };
  }

  if (event.httpMethod === "POST") {
    const { text } = JSON.parse(event.body);
    await notes.insertOne({ text, createdAt: new Date() });
    return { statusCode: 201, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
