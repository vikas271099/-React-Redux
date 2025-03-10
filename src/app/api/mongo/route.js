import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://vikas271099:IIvOhDX3ILpKMr6Y@cluster0.nhm2a.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("react-redux-app");
    const Inventory = database.collection("products");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const allProducts = await Inventory.find(query).toArray();
    console.log(allProducts);
    return NextResponse.json({ allProducts });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
