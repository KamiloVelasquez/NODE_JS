const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });

const inspectDeep = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Connecting...');
    await mongoose.connect(uri);
    console.log('Connected.');

    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`Collection: ${col.name}, Count: ${count}`);
      if (count > 0) {
        const sample = await mongoose.connection.db.collection(col.name).find().limit(1).toArray();
        console.log(`Sample from ${col.name}:`, JSON.stringify(sample[0], null, 2));
      }
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Execution Error:', err);
    process.exit(1);
  }
};

inspectDeep();
