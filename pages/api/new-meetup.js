import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    res.status(200).json(data);
    const client = await MongoClient.connect(
      "mongodb+srv://roman1:A5777qwerty@cluster0.j4jrg.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(200).json(data);
  }
}
