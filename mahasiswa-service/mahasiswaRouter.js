const express = require('express');
const router = express.Router();
const mahasiswaController = require('./mahasiswaController');

router.get('/mahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/mahasiswa/:nim', mahasiswaController.getMahasiswaByNim);
router.post('/mahasiswa', mahasiswaController.addMahasiswa);
router.put('/mahasiswa/:nim', mahasiswaController.updateMahasiswa);
router.delete('/mahasiswa/:nim', mahasiswaController.deleteMahasiswa);

module.exports = router;
