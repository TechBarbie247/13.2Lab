const mongoose = require('mongoose');


async function connectDB() {
let uri = process.env.MONGO_URI;
if (!uri) {
throw new Error('Missing MONGO_URI in .env');
}


if (!uri.match(/\/[A-Za-z0-9_-]+(\?|$)/)) {
uri = uri.replace(/\/?(\?|$)/, '/digital_bookshelf$1');
}


try {
await mongoose.connect(uri);
console.log('✅ MongoDB connected');
} catch (err) {
console.error('❌ MongoDB connection error:', err.message);
process.exit(1);
}
}


module.exports = connectDB;