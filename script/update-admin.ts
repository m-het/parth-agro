import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env file');
    process.exit(1);
}

async function updateAdmin() {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await mongoose.connection.db.collection('users').updateOne(
        { username: 'admin' },
        { $set: { username: 'parthagro' } }
    );

    console.log('Updated:', result.modifiedCount, 'document(s)');

    if (result.modifiedCount === 0) {
        console.log('No admin user found with username "admin"');
    } else {
        console.log('Username changed from "admin" to "parthagro"');
    }

    await mongoose.disconnect();
    process.exit(0);
}

updateAdmin().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
