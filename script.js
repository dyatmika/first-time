document.addEventListener("DOMContentLoaded", function () {
    let nama = localStorage.getItem("nama");
    let departemen = localStorage.getItem("departemen");
    let project = localStorage.getItem("project");

    if (window.location.pathname.includes("index.html")) {
        if (!nama || !departemen || !project) {
            window.location.href = "login.html"; // Redirect jika belum login
        } else {
            document.getElementById("nama").value = nama;
            document.getElementById("departemen").value = departemen;
            document.getElementById("project").value = project;
        }

        document.getElementById("submitBtn").addEventListener("click", submitData);
    }
});

// Fungsi Login
function login() {
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;

    if (!nama || !departemen || !project) {
        alert("Harap isi semua data!");
        return;
    }

    localStorage.setItem("nama", nama);
    localStorage.setItem("departemen", departemen);
    localStorage.setItem("project", project);

    window.location.href = "index.html";
}

// Fungsi Submit Data ke Google Sheets
function submitData() {
    let nama = document.getElementById("nama").value;
    let departemen = document.getElementById("departemen").value;
    let project = document.getElementById("project").value;
    let alat = document.getElementById("alat").value;
    let jumlah = document.getElementById("jumlah").value;

    if (!alat || !jumlah) {
        alert("Harap isi semua data!");
        return;
    }

    let data = { nama, departemen, project, alat, jumlah };

    fetch("https://script.google.com/macros/s/AKfycbwxOOePdpmD1Sq1zewqdoPcGknqdsZUU-394NdWU0Ax9zU0dNty82911Oie2WdvF4YpXg/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(result => {
        alert("Data berhasil disimpan!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Gagal menyimpan data!");
    });
}

// Fungsi Logout
function logout() {
    localStorage.removeItem("nama");
    localStorage.removeItem("departemen");
    localStorage.removeItem("project");

    window.location.href = "login.html";
}
