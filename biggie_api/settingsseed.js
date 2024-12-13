const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function seedSystemSettings() {
  const uri = process.env.MONGO_LOCAL_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("POS");

    // Delete existing documents in 'system-settings' collection
    await db.collection("system-settings").deleteMany({});

    // Insert new documents into 'system-settings' collection
    const settings = [
      {
        _id: new ObjectId("6637797763064f893911fd92"),
        email: "michael@bingwa.ke",
        till_no: 747474745,
        phone: 254746665877.0,
        name: "Big Smoke",
        location: "Ruaka p",
        social_link: "https://www.instagram.com/bigsmokekaren/",
        kra_pin: "Pgsbdf8dnf",
        createdAt: new Date(1714911607617),
        updatedAt: new Date(1715380496904),
        __v: 0,
        paymentDetailId: new ObjectId("66377f6d74ea5965ebd059ff"),
      },
    ];
    await db.collection("system-settings").insertMany(settings);
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedSystemSettings();