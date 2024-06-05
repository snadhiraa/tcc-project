document.addEventListener('DOMContentLoaded', () => {
    loadMahasiswaData();

    if (document.getElementById('updateMahasiswaForm')) {
        document.getElementById('updateMahasiswaForm').addEventListener('submit', event => {
            event.preventDefault();
            updateMahasiswa();
        });
    }

    if (document.getElementById('addMahasiswaForm')) {
        document.getElementById('addMahasiswaForm').addEventListener('submit', event => {
            event.preventDefault();
            addMahasiswa();
        });
    }
});

function loadMahasiswaData() {
    fetch('http://localhost:4000/mahasiswa-service/mahasiswa')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#mahasiswaTable tbody');
            tbody.innerHTML = '';
            data.forEach(mahasiswa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mahasiswa.nim}</td>
                    <td>${mahasiswa.nama}</td>
                    <td>${mahasiswa.kode_buku}</td>
                    <td>
                        <button onclick="editMahasiswa('${mahasiswa.nim}')">Edit</button>
                        <button onclick="deleteMahasiswa('${mahasiswa.nim}')">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function addMahasiswa() {
    const nim = document.getElementById('nim').value;
    const nama = document.getElementById('nama').value;
    const kode_buku = document.getElementById('kode_buku').value;

    fetch(`http://localhost:4000/buku-service/buku/${kode_buku}`)
        .then(response => response.json())
        .then(buku => {
            if (buku.stok > 0) {
                fetch('http://localhost:4000/mahasiswa-service/mahasiswa', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nim, nama, kode_buku })
                }).then(response => {
                    if (response.ok) {
                        loadMahasiswaData();
                        document.getElementById('addMahasiswaForm').reset();
                    } else {
                        alert('Gagal menambahkan mahasiswa');
                    }
                });
            } else {
                document.getElementById('kodeBukuValidation').innerText = 'Kode buku tidak tersedia atau stok habis';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal mendapatkan data buku');
        });
}


function editMahasiswa(nim) {
    window.location.href = `updateMahasiswa.html?nim=${nim}`;
}

function updateMahasiswa() {
    const nim = document.getElementById('nim').value;
    const nama = document.getElementById('nama').value;
    const kode_buku = document.getElementById('kode_buku').value;

    fetch(`http://localhost:4000/mahasiswa-service/mahasiswa/${nim}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, kode_buku })
    }).then(response => {
        if (response.ok) {
            window.location.href = 'mahasiswa.html';
        } else {
            alert('Gagal mengupdate mahasiswa');
        }
    });
}

function deleteMahasiswa(nim) {
    fetch(`http://localhost:4000/mahasiswa-service/mahasiswa/${nim}`, {
        method: 'DELETE'
    }).then(() => {
        loadMahasiswaData();
    });
}
