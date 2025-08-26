import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Supabase pakai Environment Variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// API: Tambah anak
app.post("/api/anak", async (req, res) => {
  const { nama, tanggal_lahir, vaksin } = req.body;

  const { data, error } = await supabase
    .from("anak")
    .insert([{ nama, tanggal_lahir, vaksin }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// API: Ambil semua anak
app.get("/api/anak", async (req, res) => {
  const { data, error } = await supabase.from("anak").select("*");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
