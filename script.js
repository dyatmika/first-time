document.addEventListener("DOMContentLoaded", function () {
    let nama = localStorage.getItem("nama");
    let departemen = localStorage.getItem("departemen");

    if (!nama || !departemen) {
        window.location.href = "login.html"; // Paksa balik ke login jika belum login
    } else {
        document.getElementById("nama").value = nama;
        document.getElementById("departemen").value = departemen;
    }
});

async function submitData() {
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;
    let nama_alat = document.getElementById("nama_alat").value;
    let jumlah = document.getElementById("jumlah").value;
    let qr_code = document.getElementById("qr_code").value;
    let fotoInput = document.getElementById("foto");

    if (!nama || !departemen || !project || !nama_alat || !jumlah || !qr_code || !fotoInput.files[0]) {
        alert("Semua data harus diisi!");
        return;
    }

    let fotoBarangUrl = await uploadFoto(fotoInput.files[0]);

    let formData = {
        nama: nama,
        departemen: departemen,
        project: project,
        nama_alat: nama_alat,
        jumlah: jumlah,
        qr_code: qr_code,
        nama_barang: fotoInput.files[0].name,
        foto_barang: fotoBarangUrl
    };

    let response = await fetch("https://script.google.com/macros/s/AKfycby9DOyEt6KfzvgjjnOMaSy4SYXCnPqM6FFyUwgvHAJU5etuJdzmgHWE9mdAPLw42VrEuw/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    });

    let result = await response.text();
    alert(result);
}

function logout() {
    localStorage.removeItem("nama");
    localStorage.removeItem("departemen");
    window.location.href = "login.html"; // Arahkan ke login setelah logout
}
