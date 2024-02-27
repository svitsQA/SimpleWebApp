const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({
    origin: 'http://localhost:63342' //адрес клиента
}));

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Обработчик для GET запроса на /data
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json(JSON.parse(data));
    });
});

// Обработчик для POST запроса на /save
app.post('/save', (req, res) => {
    const newData = req.body;
    fs.writeFile('data.json', JSON.stringify(newData, null, 4), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ error: 'Error writing file' });
        }
        console.log('Data saved successfully');
        res.json({ message: 'Data saved successfully' });
    });
});

