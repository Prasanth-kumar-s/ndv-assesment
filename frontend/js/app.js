const fetchCVEData = async (startIndex = 0, resultsPerPage = 10) => {
    try {
        const response = await fetch(`/cves/list?startIndex=${startIndex}&resultsPerPage=${resultsPerPage}`);
        const data = await response.json();
        populateCVETable(data);
    } catch (error) {
        console.error('Error fetching CVE data:', error);
    }
};

const populateCVETable = (data) => {
    const tableBody = document.querySelector('#cve-table tbody');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach(cve => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cve.cveId}</td>
            <td>${cve.description}</td>
            <td>${new Date(cve.publishedDate).toLocaleDateString()}</td>
            <td>${new Date(cve.lastModified).toLocaleDateString()}</td>
            <td>${cve.score}</td>
        `;
        tableBody.appendChild(row);
    });
};

// Initial fetch of CVE data
fetchCVEData();
