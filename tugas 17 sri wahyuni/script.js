
// Harga sampah per kilogram
const hargaSampah = {
    Plastik: 3000,
    Kertas: 2000,
    Kardus: 2500,
    Besi: 5000,
    Botol: 3500
};

// Mengambil data dari penyimpanan browser
let riwayat = JSON.parse(localStorage.getItem("riwayatSampah")) || [];

// Format angka menjadi Rupiah
function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Menampilkan total tabungan
function tampilkanSaldo() {
    let total = 0;

    riwayat.forEach(function(data) {
        total += data.nilai;
    });

    document.getElementById("totalSaldo").textContent =
        rupiah(total);
}

// Menampilkan riwayat setoran
function tampilkanRiwayat() {
    const daftar = document.getElementById("daftarRiwayat");

    daftar.innerHTML = "";

    riwayat.forEach(function(data) {
        const baris = document.createElement("tr");

        const nilai = [
            data.nama,
            data.jenis,
            data.berat + " kg",
            rupiah(data.nilai)
        ];

        nilai.forEach(function(teks) {
            const kolom = document.createElement("td");
            kolom.textContent = teks;
            baris.appendChild(kolom);
        });

        daftar.appendChild(baris);
    });

    tampilkanSaldo();
}

// Menyimpan setoran sampah
document.getElementById("formSampah")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const jenis = document.getElementById("jenis").value;
    const berat = Number(document.getElementById("berat").value);

    if (!nama || !jenis || !Number.isFinite(berat) || berat <= 0) {
        alert("Mohon isi data dengan benar!");
        return;
    }

    const harga = hargaSampah[jenis];
    const nilai = berat * harga;

    const dataBaru = {
        nama: nama,
        jenis: jenis,
        berat: berat,
        nilai: nilai
    };

    riwayat.push(dataBaru);

    // Menyimpan data ke browser
    localStorage.setItem("riwayatSampah",
        JSON.stringify(riwayat));

    alert("Setoran berhasil disimpan!");

    this.reset();

    tampilkanRiwayat();
});

// Menghapus semua riwayat
function hapusRiwayat() {
    if (confirm("Yakin ingin menghapus semua riwayat?")) {
        riwayat = [];

        localStorage.removeItem("riwayatSampah");

        tampilkanRiwayat();

        alert("Riwayat berhasil dihapus!");
    }
}

// Menampilkan data saat website dibuka
tampilkanRiwayat();
