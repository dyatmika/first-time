document.addEventListener("DOMContentLoaded", function () {
    let nama = localStorage.getItem("nama");
    let departemen = localStorage.getItem("departemen");
    let project = localStorage.getItem("project");

    if (!nama || !departemen || !project) {
        window.location.href = "login.html"; // Paksa user login jika belum login
    } else {
        document.getElementById("nama").value = nama;
        document.getElementById("departemen").value = departemen;
        document.getElementById("project").value = project;
    }

    // Pastikan tombol submit berfungsi
    document.getElementById("submitBtn").addEventListener("click", submitData);
});


// Fungsi login & simpan ke localStorage
function login() {
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;

    if (!nama || !departemen || !project) {
        alert("Semua field harus diisi!");
        return;
    }

    localStorage.setItem("nama", nama);
    localStorage.setItem("departemen", departemen);
    localStorage.setItem("project", project);

    window.location.href = "index.html"; // Arahkan ke halaman input setelah login
}

// Fungsi submit data ke Google Sheets
function submitData() {
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;
    let alat = document.getElementById("alat").value;
    let jumlah = document.getElementById("jumlah").value;

    if (!nama || !departemen || !project || !alat || !jumlah) {
        alert("Harap isi semua data!");
        return;
    }

    let data = { nama, departemen, project, alat, jumlah };

    fetch("https://script.google.com/macros/s/AKfycbxaeW_URPImp5vbw28d3fq0SE1kc5owC_fEwCniftjV/dev", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(result => {
        alert(result); // Menampilkan pesan sukses dari Apps Script
        window.location.href = "index.html"; // Kembali ke halaman utama
    })
    .catch(error => console.error("Error:", error));
}

// Fungsi logout
function logout() {
    localStorage.removeItem("nama");
    localStorage.removeItem("departemen");
    localStorage.removeItem("project");

    window.location.href = "login.html"; // Kembali ke halaman login
}
