import initialState from './initialState';
import connectDB from './connectDB';

export default async function initDB() {
  const db = await connectDB();
  for (const collectionName in initialState) {
    if (collectionName !== 'session') {
      const collection = db.collection(collectionName);
      collection.insertMany(initialState[collectionName]);
    }
  }
}

initDB();
