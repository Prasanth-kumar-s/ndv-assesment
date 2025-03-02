const mongoose = require('mongoose');

const cveSchema = new mongoose.Schema({
    cveId: { type: String, required: true, unique: true },
    description: { type: String },
    publishedDate: { type: Date },
    lastModified: { type: Date },
    score: { type: Number },
    // Add other relevant fields as necessary
});

const CVE = mongoose.model('CVE', cveSchema);

module.exports = CVE;
