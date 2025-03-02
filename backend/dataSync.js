const axios = require('axios');
const CVE = require('./models/cveModel');

// Function to synchronize data with the CVE API
const syncCVEData = async () => {
    try {
        const response = await axios.get('https://services.nvd.nist.gov/rest/json/cves/2.0');
        console.log('Response data:', response.data); // Log the response data
        const cveData = response.data.CVE_Items; // Update to access the correct data structure

        // Data cleansing: Remove duplicates and ensure consistency
        for (const cve of cveData) {
            const existingCVE = await CVE.findOne({ cveId: cve.cveId });
            if (!existingCVE) {
                const newCVE = new CVE(cve);
                await newCVE.save();
            }
        }
        console.log('CVE data synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing CVE data:', error);
    }
};

module.exports = syncCVEData;
