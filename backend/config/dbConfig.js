const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/cveDB'; // Update with your database URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
