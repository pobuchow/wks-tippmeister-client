import initialState from "./initialState";
import { connectDB } from "./connectDB";

export async function initDB() {
  let db = await connectDB();
  for (let collectionName in initialState) {
    if (collectionName !== "session") {
      let collection = db.collection(collectionName);
      await collection.insertMany(initialState[collectionName]);
    }
  }
}

initDB();
