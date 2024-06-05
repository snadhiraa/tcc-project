const db = require('./db');

class Mahasiswa {
    static getAll(callback) {
        db.query('SELECT * FROM mahasiswa', callback);
    }

    static getByNim(nim, callback) {
        db.query('SELECT * FROM mahasiswa WHERE nim = ?', [nim], callback);
    }

    static add(mahasiswa, callback) {
        db.query('INSERT INTO mahasiswa (nim, nama, kode_buku) VALUES (?, ?, ?)', [mahasiswa.nim, mahasiswa.nama, mahasiswa.kode_buku], callback);
    }

    static update(nim, mahasiswa, callback) {
        db.query('UPDATE mahasiswa SET nama = ?, kode_buku = ? WHERE nim = ?', [mahasiswa.nama, mahasiswa.kode_buku, nim], callback);
    }

    static delete(nim, callback) {
        db.query('DELETE FROM mahasiswa WHERE nim = ?', [nim], callback);
    }
}

module.exports = Mahasiswa;
