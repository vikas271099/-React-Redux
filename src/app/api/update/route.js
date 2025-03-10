import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: "Missing _id" });
    }

    const uri = "mongodb+srv://vikas271099:IIvOhDX3ILpKMr6Y@cluster0.nhm2a.mongodb.net/";
    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db("react-redux-app");
    const productsCollection = database.collection("products");

    // Convert `_id` to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(_id);
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid ObjectId format" });
    }

    // Check if document exists
    const existingDoc = await productsCollection.findOne({ _id: objectId });
    if (!existingDoc) {
      return NextResponse.json({ success: false, message: "No document found with this _id" });
    }

    // Update document
    const updateDoc = { $set: updateData };
    const result = await productsCollection.updateOne({ _id: objectId }, updateDoc);

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Document found but no changes were made" });
    }

    return NextResponse.json({ success: true, message: "Document updated successfully" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
