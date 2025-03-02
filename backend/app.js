const express = require('express');
const mongoose = require('mongoose');
const cveRoutes = require('./routes/cveRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const syncCVEData = require('./dataSync'); // Import data synchronization function

// Middleware
app.use(express.json());

// Synchronize CVE data on startup
syncCVEData();

// Routes
app.use('/cves', cveRoutes);

// Database connection
const dbURI = 'mongodb://localhost:27017/cveDB'; // Update with your database URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));
