import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
       const query = request.nextUrl.searchParams.query;
  // Replace the uri string with your connection string.
  const uri =
    "mongodb+srv://vikas271099:IIvOhDX3ILpKMr6Y@cluster0.nhm2a.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db("SukhInventoryStock");
    const Inventory = database.collection("products");

   

    const products =  await Inventory.aggregate([
        {
          $match: {
            $and: [
              { productName: { $regex: query, $options: "i" } }, // Partial match (case-insensitive)
            //   { category: { $regex: query, $options: "i" } },
            //   { model: { $regex: ".*.*", $options: "i" } }, // Matches all if empty
            //   { imei: { $regex: ".*.*", $options: "i" } },
            //   { withBox: { $regex: ".*Yes.*", $options: "i" } },
            //   { color: { $regex: ".*.*", $options: "i" } },
            //   { storage: { $regex: ".*NA.*", $options: "i" } },
            //   { paymentMode: { $regex: ".*NA.*", $options: "i" } },
            //   { remarks: { $regex: ".*.*", $options: "i" } },
            ],
          },
        },
        { $sort: { _id: -1 } } // Sorting by newest first
      ]);
    // console.log(products);
    return NextResponse.json({ success:true, products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

