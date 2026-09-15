let daftarPendaftar = JSON.parse(localStorage.getItem("daftarPendaftar")) || [];

let form = document.getElementById("formPeserta");
let inputNama = document.getElementById("nama");
let inputEmail = document.getElementById("email");
let inputNoHp = document.getElementById("noHp");
let inputJurusan = document.getElementById("jurusan");
let inputStatus = document.getElementById("Status");
let btnBatal = document.getElementById("tombolBatal");
let btnSimpan = document.getElementById("tombolSimpan");
let judulForm = document.getElementById("judulForm");
let pesanForm = document.getElementById("pesanForm");

let tbody = document.getElementById("dataPeserta");


function simpanData() {
  localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));
}


if (form) {

  let editingId = localStorage.getItem("editingId");

  if (editingId) {
    for (let i = 0; i < daftarPendaftar.length; i++) {
      if (String(daftarPendaftar[i].id) === String(editingId)) {
        let p = daftarPendaftar[i];
        inputNama.value = p.nama;
        inputEmail.value = p.email;
        inputNoHp.value = p.noHp;
        inputJurusan.value = p.jurusan;
        inputStatus.value = p.status;

        if (judulForm) judulForm.textContent = "Edit Data Peserta";
        btnSimpan.textContent = "Simpan Perubahan";
      }
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let editingId = localStorage.getItem("editingId");

    if (!editingId) {
      let pesertaBaru = {
        id: Date.now(),
        nama: inputNama.value,
        email: inputEmail.value,
        noHp: inputNoHp.value,
        jurusan: inputJurusan.value,
        status: "Pending"
      };
      daftarPendaftar.push(pesertaBaru);
      pesanForm.textContent = "Pendaftaran berhasil ditambahkan.";
    } else {
      for (let i = 0; i < daftarPendaftar.length; i++) {
        if (String(daftarPendaftar[i].id) === String(editingId)) {
          daftarPendaftar[i].nama = inputNama.value;
          daftarPendaftar[i].email = inputEmail.value;
          daftarPendaftar[i].noHp = inputNoHp.value;
          daftarPendaftar[i].jurusan = inputJurusan.value;
          daftarPendaftar[i].status = inputStatus.value;
        }
      }
      pesanForm.textContent = "Data peserta berhasil diperbarui.";
    }

    simpanData();
    localStorage.removeItem("editingId");
    form.reset();
    if (judulForm) judulForm.textContent = "Form Pendaftaran Event";
    btnSimpan.textContent = "Daftar";
  });

  btnBatal.addEventListener("click", function () {
    localStorage.removeItem("editingId");
    form.reset();
    if (judulForm) judulForm.textContent = "Form Pendaftaran Event";
    btnSimpan.textContent = "Daftar";
    pesanForm.textContent = "";
  });
}

if (tbody) {
  renderTabel();
}

function renderTabel() {
  tbody.innerHTML = "";

  for (let i = 0; i < daftarPendaftar.length; i++) {
    let p = daftarPendaftar[i];

    let baris = "<tr>";
    baris += "<td>" + (i + 1) + "</td>";
    baris += "<td>" + p.nama + "</td>";
    baris += "<td>" + p.email + "</td>";
    baris += "<td>" + p.noHp + "</td>";
    baris += "<td>" + p.jurusan + "</td>";
    baris += "<td>" + p.status + "</td>";
    baris += "<td>";
    baris += "<button onclick='editData(" + p.id + ")'>Edit</button> ";
    baris += "<button onclick='hapusData(" + p.id + ")'>Hapus</button>";
    baris += "</td>";
    baris += "</tr>";

    tbody.innerHTML += baris;
  }
}
function editData(id) {
  localStorage.setItem("editingId", id);
  window.location.href = "index.html";
}
function hapusData(id) {
  let peserta = null;
  let index = -1;

  for (let i = 0; i < daftarPendaftar.length; i++) {
    if (daftarPendaftar[i].id === id) {
      peserta = daftarPendaftar[i];
      index = i;
    }
  }

  if (!peserta) return;

  let konfirmasi = confirm("Yakin hapus data " + peserta.nama + "?");
  if (!konfirmasi) return;

  daftarPendaftar.splice(index, 1);
  simpanData();
  renderTabel();
}