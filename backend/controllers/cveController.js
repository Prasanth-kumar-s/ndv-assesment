const axios = require('axios');

// Function to retrieve a list of CVEs
exports.getCVEList = async (req, res) => {
    try {
        const { startIndex = 0, resultsPerPage = 10 } = req.query;
        const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching CVEs:', error);
        res.status(500).json({ message: 'Error fetching CVEs' });
    }
};

// Function to filter CVEs
exports.filterCVEs = async (req, res) => {
    const { cveId, year, score, lastModifiedDays } = req.query;

    const filterCriteria = {};
    if (cveId) filterCriteria.cveId = cveId;
    if (year) filterCriteria.publishedDate = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) };
    if (score) filterCriteria.score = { $gte: score };
    if (lastModifiedDays) {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - lastModifiedDays);
        filterCriteria.lastModified = { $gte: dateThreshold };
    }

    const filteredCVEs = await CVE.find(filterCriteria);
    res.json(filteredCVEs);
};

