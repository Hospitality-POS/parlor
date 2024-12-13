const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function seedTable() {
  const uri = process.env.MONGO_LOCAL_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("POS");

    // Delete existing documents in 'locations' collection
    await db.collection("locations").deleteMany({});

    // Insert new documents into 'locations' collection
    const locations = [
      {
        _id: new ObjectId("65510a2b6538b6995622d1dd"),
        name: "collidors",
        __v: 0,
      },
      {
        _id: new ObjectId("65510a526538b6995622d1e0"),
        name: "in-doors",
        __v: 0,
      },
    ];
    await db.collection("locations").insertMany(locations);

    // Delete existing documents in 'tables' collection
    await db.collection("tables").deleteMany({});

    // Insert new documents into 'tables' collection
    const tables = [
      {
        _id: new ObjectId("65512a1c0909d3ebf6db4527"),
        name: "A1",
        isOccupied: false,
        locatedAt: new ObjectId("65510a2b6538b6995622d1dd"),
        __v: 0,
      },
      {
        _id: new ObjectId("6551391e5327ce7797603bb3"),
        name: "A2",
        isOccupied: false,
        locatedAt: new ObjectId("65510a526538b6995622d1e0"),
        __v: 0,
      },
    ];
    await db.collection("tables").insertMany(tables);
    console.log("Database initial Tables seed completed succefully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedTable();