const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '50mb' })); // Increased limit to handle large payloads
app.use(cors()); // Enable CORS

const DB_FILE = './db.json';

// Utility function to read the JSON file
const readJsonFile = () => {
    if (!fs.existsSync(DB_FILE)) {
        return { pages: [] };
    }
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// Utility function to write to the JSON file
const writeJsonFile = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Get all pages
app.get('/api/pages', (req, res) => {
    const db = readJsonFile();
    res.json(db.pages);
});

// Get a specific page by ID
app.get('/api/pages/:id', (req, res) => {
    const { id } = req.params;
    const db = readJsonFile();
    const page = db.pages.find(page => page.id === id);
    if (page) {
        res.json(page);
    } else {
        res.status(404).send({ message: 'Page not found' });
    }
});

// Create a new page
app.post('/api/pages', (req, res) => {
    const newPage = req.body;
    const db = readJsonFile();
    newPage.id = Date.now().toString(); // Generate a unique ID
    db.pages.push(newPage);
    writeJsonFile(db);
    res.status(201).json(newPage);
});

// Update an existing page by ID
app.put('/api/pages/:id', (req, res) => {
    const { id } = req.params;
    const updatedPage = req.body;
    const db = readJsonFile();
    const pageIndex = db.pages.findIndex(page => page.id === id);
    if (pageIndex !== -1) {
        db.pages[pageIndex] = { ...db.pages[pageIndex], ...updatedPage };
        writeJsonFile(db);
        res.json(db.pages[pageIndex]);
    } else {
        res.status(404).send({ message: 'Page not found' });
    }
});

// Delete a page by ID
app.delete('/api/pages/:id', (req, res) => {
    const { id } = req.params;
    const db = readJsonFile();
    const pageIndex = db.pages.findIndex(page => page.id === id);
    if (pageIndex !== -1) {
        const deletedPage = db.pages.splice(pageIndex, 1);
        writeJsonFile(db);
        res.json(deletedPage[0]);
    } else {
        res.status(404).send({ message: 'Page not found' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
