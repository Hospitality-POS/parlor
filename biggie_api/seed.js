const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function seedDB() {
  const uri = process.env.MONGO_LOCAL_URI;
  //   console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("POS");
    await db.dropDatabase();
    // Categories
    const subcategories = [
      {
        _id: new ObjectId("6525f8292d06da587b70d5db"),
        name: "Food",
        main_category: new ObjectId("6525f7b62d06da587b70d5d5"),
      },
      {
        _id: new ObjectId("6525fa60e8219cdf9b2ac313"),
        name: "Beverage",
        main_category: new ObjectId("6525f7b62d06da587b70d5d5"),
      },
      {
        _id: new ObjectId("6525faa7e8219cdf9b2ac31a"),
        name: "Non F/B",
        main_category: new ObjectId("6525f7b62d06da587b70d5d5"),
      },
    ];
    await db.collection("subcategories").insertMany(subcategories);

    // Main Categories
    const maincategories = [
      { _id: new ObjectId("6525f7b62d06da587b70d5d5"), name: "Restaurant" },
      { _id: new ObjectId("6525fadae8219cdf9b2ac31e"), name: "Bar" },
      { _id: new ObjectId("652a3ab4175ac63110129687"), name: "Kitchen" },
    ];
    await db.collection("maincategories").insertMany(maincategories);

    // Locations
    const locations = [
      {
        _id: new ObjectId("65510a2b6538b6995622d1dd"),
        name: "collidors",
        __v: 0,
      },
    ];

    await db.collection("locations").insertMany(locations);

    // tables
    const tables = [
      {
        _id: new ObjectId("65512382c419633fbcd11d1f"),
        name: "B1",
        isOccupied: false,
        locatedAt: new ObjectId("65510a2b6538b6995622d1dd"),
        __v: 0,
      },

    ];

    await db.collection("tables").insertMany(tables);

    // Users
    const users = [
      {
        _id: new ObjectId("652205efcd6b100c16ff0bf0"),
        fullname: "Michael Karanja",
        username: "admin",
        idNumber: 3893933,
        email: "mike@gmail.com",
        phone: 797029322,
        pin: "0000",
        hashedPin:
          "$2b$10$TeMLDOUEVx85HW4kYQNP2eAHs3FemkNULUg6JGPiiUmHm9QaYU/qa",
        status: "Active",
        isAdmin: true,
        createdAt: new Date("2023-10-08T01:29:19.233Z"),
        updatedAt: new Date("2023-10-23T22:28:22.480Z"),
        __v: 0,
      },
    ];

    await db.collection("users").insertMany(users);

    // Payment Methods
    const payment_methods = [
      {
        _id: new ObjectId("64a091079e02299670cf4adf"),
        name: "M-Pesa",
        __v: 0,
      },
      {
        _id: new ObjectId("64a091fa9e02299670cf4aef"),
        name: "Card",
        __v: 0,
      },
      {
        _id: new ObjectId("64ad2b4f6a8c23a1ed08854c"),
        name: "Unpaid",
        __v: 0,
      },
      {
        _id: new ObjectId("650df57c038000c2d767b11b"),
        name: "Debt",
        __v: 0,
      },
    ];

    await db.collection("payment_methods").insertMany(payment_methods);

    console.log("Database seeded!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedDB();
