let daftarPendaftar = JSON.parse(localStorage.getItem("daftarPendaftar")) || [];

function simpanData() {
  localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));
}
let formTambah = document.getElementById("formPeserta");

if (formTambah) {
  let inputNama = document.getElementById("nama");
  let inputEmail = document.getElementById("email");
  let inputNoHp = document.getElementById("noHp");
  let inputJurusan = document.getElementById("jurusan");
  let inputKegiatan = document.getElementById("kegiatan");
  let pesanForm = document.getElementById("pesanForm");

  formTambah.addEventListener("submit", function (e) {
    e.preventDefault();

    let pesertaBaru = {
      id: Date.now(),
      nama: inputNama.value,
      email: inputEmail.value,
      noHp: inputNoHp.value,
      jurusan: inputJurusan.value,
      kegiatan: inputKegiatan.value
    };

    daftarPendaftar.push(pesertaBaru);
    simpanData();
    formTambah.reset();

    if (pesanForm) pesanForm.textContent = "Pendaftaran berhasil ditambahkan.";
  });
}
let formEdit = document.getElementById("formEdit");

if (formEdit) {
  let inputNama = document.getElementById("nama");
  let inputEmail = document.getElementById("email");
  let inputNoHp = document.getElementById("noHp");
  let inputJurusan = document.getElementById("jurusan");
  let inputKegiatan = document.getElementById("kegiatan");

  let editingId = localStorage.getItem("editingId");
  for (let i = 0; i < daftarPendaftar.length; i++) {
    if (String(daftarPendaftar[i].id) === String(editingId)) {
      let p = daftarPendaftar[i];
      inputNama.value = p.nama;
      inputEmail.value = p.email;
      inputNoHp.value = p.noHp;
      inputJurusan.value = p.jurusan;
      inputKegiatan.value = p.kegiatan;
    }
  }

  formEdit.addEventListener("submit", function (e) {
    e.preventDefault();

    for (let i = 0; i < daftarPendaftar.length; i++) {
      if (String(daftarPendaftar[i].id) === String(editingId)) {
        daftarPendaftar[i].nama = inputNama.value;
        daftarPendaftar[i].email = inputEmail.value;
        daftarPendaftar[i].noHp = inputNoHp.value;
        daftarPendaftar[i].jurusan = inputJurusan.value;
        daftarPendaftar[i].kegiatan = inputKegiatan.value;
      }
    }

    simpanData();
    localStorage.removeItem("editingId");
    window.location.href = "dashboard.html";
  });
}
let tbody = document.getElementById("dataPeserta");

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
    baris += "<td>" + p.kegiatan + "</td>";
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
  window.location.href = "edit.html";
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