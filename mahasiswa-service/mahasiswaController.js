const Mahasiswa = require('./mahasiswaModel');

exports.getAllMahasiswa = (req, res) => {
    Mahasiswa.getAll((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getMahasiswaByNim = (req, res) => {
    const nim = req.params.nim;
    Mahasiswa.getByNim(nim, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results.length) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

exports.addMahasiswa = (req, res) => {
    const newMahasiswa = req.body;
    Mahasiswa.add(newMahasiswa, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Mahasiswa added successfully' });
        }
    });
};

exports.updateMahasiswa = (req, res) => {
    const nim = req.params.nim;
    const updatedMahasiswa = req.body;
    Mahasiswa.update(nim, updatedMahasiswa, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.status(200).json({ message: 'Mahasiswa updated successfully' });
        }
    });
};

exports.deleteMahasiswa = (req, res) => {
    const nim = req.params.nim;
    Mahasiswa.delete(nim, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.status(200).json({ message: 'Mahasiswa deleted successfully' });
        }
    });
};
