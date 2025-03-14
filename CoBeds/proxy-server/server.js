const express = require('express');
const axios = require('axios'); // Use axios for making HTTP requests
const app = express();
const port = 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Define your API routes
app.get('/api/data.json', async (req, res) => {
    try {
        const response = await axios.get('https://data.covid19india.org/data.json');

        if (response.status === 200) {
            const covidData = response.data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(covidData);
        } else {
            res.status(500).json({ error: 'Error fetching data from the external API' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from the external API' });
    }
});

app.get('/api/vaccine-centers', async (req, res) => {
    const { pincode, date } = req.query;

    try {
        const coWinURL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;
        const response = await axios.get(coWinURL);

        if (response.status === 200) {
            const vaccineData = response.data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(vaccineData);
        } else {
            res.status(500).json({ error: 'Error fetching data from the Co-WIN API' });
        }
    } catch (error) {
        console.error('Error fetching data from Co-WIN API:', error);
        res.status(500).json({ error: 'Error fetching data from the Co-WIN API' });
    }
});

app.get('/api/beds', async (req, res) => {
    try {
        const response = await axios.get('https://api.rootnet.in/covid19-in/hospitals/beds');

        if (response.status === 200) {
            const covidData = response.data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(covidData);
        } else {
            res.status(500).json({ error: 'Error fetching data from the external API' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from the external API' });
    }
});

app.get('/api/data_vaccine', async (req, res) => {
    try {
        const { date } = req.query; // Get the date query parameter

        // Fetch data from the external API
        const response = await axios.get('http://127.0.0.1:8081/api/data_vaccine');

        // Check if the response status is OK (200)
        if (response.status === 200) {
            let covidData = response.data;

            // If the data is an array, wrap it in an object with a "sessions" key
            if (Array.isArray(covidData)) {
                covidData = { sessions: covidData };
            }

            // Filter the data based on the provided date
            if (date) {
                covidData.sessions = covidData.sessions.filter(session => session.date === date);
            }

            // Set the Content-Type header to indicate JSON
            res.setHeader('Content-Type', 'application/json');

            // Respond with the filtered JSON data
            res.status(200).json(covidData);
        } else {
            res.status(500).json({ error: 'Error fetching data from the external API' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from the external API' });
    }
});

async function fetchDataForDistrict(district) {
    try {
        // Replace the URL with the actual URL where you fetch data based on the district name
        const response = await axios.get(`http://localhost:5000/api/available-dates-slots?district_name=${district}`);
        if (response.status === 200) {
            return response.data; // Return the fetched data
        } else {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

app.get('/api/available-dates-slots', async (req, res, next) => {
    try {
        const { district_name } = req.query;
        const dataForDistrict = await fetchDataForDistrict(district_name);

        if (dataForDistrict) {
            const availableDates = dataForDistrict.map((entry) => entry.date);
            const availableSlots = dataForDistrict.map((entry) => entry.available_capacity);
            res.status(200).json({ availableDates, availableSlots });
        } else {
            res.status(404).json({ error: 'Data not found for the district' });
        }
    } catch (error) {
        next(error);
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});