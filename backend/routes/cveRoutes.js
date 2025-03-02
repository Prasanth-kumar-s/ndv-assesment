const express = require('express');
const router = express.Router();
const cveController = require('../controllers/cveController');

// Route to retrieve a list of CVEs
router.get('/list', cveController.getCVEList);

// Route to filter CVEs
router.get('/filter', cveController.filterCVEs);

module.exports = router;
