document.addEventListener("DOMContentLoaded", function () {
    let nama = localStorage.getItem("nama");
    let departemen = localStorage.getItem("departemen");
    let project = localStorage.getItem("project");

    if (!nama || !departemen || !project) {
        window.location.href = "login.html"; // Paksa balik ke login jika belum login
    } else {
        document.getElementById("nama").value = nama;
        document.getElementById("departemen").value = departemen;
        document.getElementById("project").value = project;
    }
});

async function submitData() {
    // Ambil nilai input
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;
    let alat = document.getElementById("alat").value;
    let jumlah = document.getElementById("jumlah").value;

    if (!nama || !departemen || !project || !alat || !jumlah) {
        alert("Harap isi semua data!");
        return;
    }
    let fotoBarangUrl = await uploadFoto(fotoInput.files[0]);

    let formData = {
        nama: nama,
        departemen: departemen,
        project: project,
        nama_alat: nama_alat,
        jumlah: jumlah,
    };
let data = { nama, departemen, project, alat, jumlah };

    fetch("https://script.google.com/macros/s/AKfycby9DOyEt6KfzvgjjnOMaSy4SYXCnPqM6FFyUwgvHAJU5etuJdzmgHWE9mdAPLw42VrEuw/exec", {
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
function logout() {
    localStorage.removeItem("nama");
    localStorage.removeItem("departemen");
    localStorage.removeItem("project");

    window.location.href = "login.html"; // Kembali ke halaman login
}
