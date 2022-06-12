import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    res.status(200).json(data);
    const client = await MongoClient.connect(
      "mongodb+srv://roman:qHmDDVZVrYwXjAjJ@sandbox.8afmp.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(200).json(data);
  }
}
