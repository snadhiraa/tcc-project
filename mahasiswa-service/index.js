const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bukuRouter = require('./mahasiswaRouter');

const app = express();

// Menggunakan middleware body-parser untuk mengurai body permintaan menjadi JSON
app.use(bodyParser.json());

// Menggunakan middleware cors untuk menangani CORS
app.use(cors());

// Menggunakan router mahasisw
app.use('/mahasiswa-service', bukuRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Mahasiswa service is running on port ${PORT}`);
});
