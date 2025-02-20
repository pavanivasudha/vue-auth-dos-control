const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI; // Store this in Netlify environment variables
const client = new MongoClient(MONGO_URI);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    await client.connect();
    const db = client.db("authDB");
    const users = db.collection("users");

    const user = await users.findOne({ email, password });

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid credentials" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  } finally {
    await client.close();
  }
};
