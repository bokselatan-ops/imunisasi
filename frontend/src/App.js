import React, { useState, useEffect } from "react";

function App() {
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [vaksin, setVaksin] = useState("");
  const [data, setData] = useState([]);

  // Ambil data dari backend
  const fetchData = async () => {
    const res = await fetch("https://YOUR-BACKEND.onrender.com/api/anak");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simpan data baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://YOUR-BACKEND.onrender.com/api/anak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        tanggal_lahir: tanggalLahir,
        vaksin,
      }),
    });
    setNama("");
    setTanggalLahir("");
    setVaksin("");
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Aplikasi Imunisasi</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama Anak"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="date"
          value={tanggalLahir}
          onChange={(e) => setTanggalLahir(e.target.value)}
        />
        <input
          placeholder="Jenis Vaksin"
          value={vaksin}
          onChange={(e) => setVaksin(e.target.value)}
        />
        <button type="submit">Simpan</button>
      </form>

      <h2>Data Anak</h2>
      <ul>
        {data.map((anak) => (
          <li key={anak.id}>
            {anak.nama} - {anak.tanggal_lahir} - {anak.vaksin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
