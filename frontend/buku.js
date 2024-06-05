document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kode_buku = urlParams.get('kode_buku');
    if (kode_buku) {
        loadBukuDataForEdit(kode_buku);
    }

    if (document.getElementById('updateBukuForm')) {
        document.getElementById('updateBukuForm').addEventListener('submit', event => {
            event.preventDefault();
            updateBuku();
        });
    }

    if (document.getElementById('addBukuForm')) {
        document.getElementById('addBukuForm').addEventListener('submit', event => {
            event.preventDefault();
            addBuku();
        });
    }

    loadBukuData();
});

function loadBukuData() {
    fetch('http://localhost:4000/buku-service/buku')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#bukuTable tbody');
            tbody.innerHTML = '';
            data.forEach(buku => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${buku.kode_buku}</td>
                    <td>${buku.judul}</td>
                    <td>${buku.stok}</td>
                    <td>
                        <button onclick="editBuku('${buku.kode_buku}')">Edit</button>
                        <button onclick="deleteBuku('${buku.kode_buku}')">Delete</button>
                        <button onclick="preparePinjamBuku('${buku.kode_buku}')">Pinjam</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function loadBukuDataForEdit(kode_buku) {
    fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('kode_buku').value = data.kode_buku;
            document.getElementById('judul').value = data.judul;
            document.getElementById('stok').value = data.stok;
        });
}

function addBuku() {
    const kode_buku = document.getElementById('kode_buku').value;
    const judul = document.getElementById('judul').value;
    const stok = document.getElementById('stok').value;

    fetch('http://localhost:4000/buku-service/buku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kode_buku, judul, stok })
    }).then(response => {
        if (response.ok) {
            loadBukuData();
            document.getElementById('addBukuForm').reset();
        } else {
            alert('Gagal menambahkan buku');
        }
    });
}

function editBuku(kode_buku) {
    window.location.href = `updateBuku.html?kode_buku=${kode_buku}`;
}

function updateBuku() {
    const kode_buku = document.getElementById('kode_buku').value;
    const judul = document.getElementById('judul').value;
    const stok = document.getElementById('stok').value;

    fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, stok })
    }).then(response => {
        if (response.ok) {
            alert('Berhasil mengupdate buku');
            window.location.href = 'home.html'; // Arahkan ke halaman home setelah berhasil update
        } else {
            alert('Gagal mengupdate buku');
        }
    });
}

function deleteBuku(kode_buku) {
    fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`, {
        method: 'DELETE'
    }).then(() => {
        loadBukuData();
    });
}

function preparePinjamBuku(kode_buku) {
    window.location.href = `pinjam.html?kode_buku=${kode_buku}`;
}

function pinjamBuku() {
    const kode_buku = document.getElementById('kode_buku').value;
    const nim = document.getElementById('nim').value;
    const nama = document.getElementById('nama').value;

    fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`)
        .then(response => response.json())
        .then(buku => {
            if (buku.stok > 0) {
                // Update stok buku
                fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ judul: buku.judul, stok: buku.stok - 1 })
                }).then(() => {
                    // Tambah data mahasiswa
                    fetch('http://localhost:4000/mahasiswa-service/mahasiswa', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nim, nama, kode_buku })
                    }).then(response => {
                        if (response.ok) {
                            window.location.href = 'mahasiswa.html';
                        } else {
                            alert('Gagal menambahkan data mahasiswa');
                        }
                    });
                });
            } else {
                alert('Stok buku habis!');
            }
        });
}
