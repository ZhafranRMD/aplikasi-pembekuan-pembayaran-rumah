import React, { useState } from "react";
import {
  X,
  Building,
  User,
  CreditCard,
  Scale,
  FileCheck,
  Calendar,
  AlertTriangle,
  Upload,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { formatRupiah } from "../services/freezeService";

export default function NewFreezeModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    namaPemohon: "",
    nikKtp: "",
    telepon: "",
    email: "",
    alamatDomisili: "",
    namaPerumahan: "",
    blokUnit: "",
    tipeRumah: "Tipe 36/72",
    nomorKontrak: "",
    namaInstansi: "",
    jenisInstansi: "DEVELOPER",
    hargaRumah: 500000000,
    plafonPinjaman: 400000000,
    angsuranBulanan: 4500000,
    kategoriPembekuan: "MANGKRAK",
    kategoriLabel: "Pembangunan Mangkrak / Terlambat Serah Terima Kunci (STK)",
    dasarHukum: "Pasal 1243 KUHPerdata (Ganti Rugi Wanprestasi) & PP No. 12/2021",
    tanggalMulai: new Date().toISOString().split("T")[0],
    durasiBulan: 6,
    nominalDibekukanPerBulan: 4500000,
    totalDanaDibekukan: 27000000,
    status: "AKTIF",
    kronologi: "",
    tuntutan: "",
    lampiran: []
  });

  const [fotoUrl, setFotoUrl] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate total dana dibekukan
      if (field === "durasiBulan" || field === "nominalDibekukanPerBulan") {
        const d = field === "durasiBulan" ? Number(value) : Number(prev.durasiBulan);
        const n = field === "nominalDibekukanPerBulan" ? Number(value) : Number(prev.nominalDibekukanPerBulan);
        updated.totalDanaDibekukan = d * n;
      }

      // Auto update kategori label
      if (field === "kategoriPembekuan") {
        if (value === "MANGKRAK") {
          updated.kategoriLabel = "Pembangunan Mangkrak / Terlambat Serah Terima Kunci (STK)";
          updated.dasarHukum = "Pasal 1243 KUHPerdata (Ganti Rugi Wanprestasi) & PP No. 12/2021";
          updated.jenisInstansi = "DEVELOPER";
        } else if (value === "CACAT_KONSTRUKSI") {
          updated.kategoriLabel = "Penahanan Uang Retensi — Cacat Mutu Konstruksi & Bangunan Rusak";
          updated.dasarHukum = "Pasal 4 UU No. 8/1999 tentang Perlindungan Konsumen & Klausul Masa Retensi 100 Hari";
          updated.jenisInstansi = "DEVELOPER";
        } else if (value === "SENGKETA_LEGALITAS") {
          updated.kategoriLabel = "Sengketa Legalitas — Sertifikat Induk Belum Pecah / PBG Bermasalah";
          updated.dasarHukum = "Pasal 1365 KUHPerdata & UU No. 1/2011 tentang Perumahan dan Kawasan Permukiman";
          updated.jenisInstansi = "DEVELOPER";
        } else if (value === "MORATORIUM_KPR") {
          updated.kategoriLabel = "Restrukturisasi KPR — Moratorium Angsuran Pokok (Grace Period Finansial)";
          updated.dasarHukum = "POJK No. 11/POJK.03/2020 tentang Stimulus Dampak Ekonomi & Restrukturisasi Kredit Bank";
          updated.jenisInstansi = "BANK";
        }
      }

      return updated;
    });
  };

  const handleAddLampiran = () => {
    if (!fotoUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      lampiran: [
        ...prev.lampiran,
        {
          nama: `Bukti_Foto_${prev.lampiran.length + 1}.jpg`,
          tipe: "image",
          url: fotoUrl.trim()
        }
      ]
    }));
    setFotoUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaPemohon || !formData.namaPerumahan || !formData.nomorKontrak) {
      alert("Harap lengkapi Nama Pemohon, Nama Perumahan, dan Nomor Kontrak!");
      return;
    }

    const nomorSurat = `${String(Math.floor(Math.random() * 900) + 100)}/SPP-RUMAH/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

    const newCase = {
      ...formData,
      nomorSurat,
      riwayatAktivitas: [
        {
          tanggal: new Date().toISOString().split("T")[0],
          status: formData.status,
          catatan: "Pengajuan pembekuan pembayaran resmi didaftarkan ke sistem."
        }
      ]
    };

    onSave(newCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Formulir Pengajuan Pembekuan Pembayaran Rumah
              </h2>
              <p className="text-xs text-slate-400">
                Pencatatan penahanan termin developer atau moratorium cicilan KPR
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 border-b border-slate-800 text-xs font-bold bg-slate-950/50">
          <button
            onClick={() => setActiveStep(1)}
            className={`py-3 px-4 text-center transition flex items-center justify-center gap-2 ${
              activeStep === 1
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">1</span>
            <span>Identitas & Properti</span>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`py-3 px-4 text-center transition flex items-center justify-center gap-2 ${
              activeStep === 2
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">2</span>
            <span>Finansial & Pembekuan</span>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`py-3 px-4 text-center transition flex items-center justify-center gap-2 ${
              activeStep === 3
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
            <span>Kronologi & Bukti</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* STEP 1: IDENTITAS & PROPERTI */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Data Pemohon & Unit Properti</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nama Lengkap Pemohon *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.namaPemohon}
                    onChange={(e) => handleChange("namaPemohon", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nomor NIK KTP
                  </label>
                  <input
                    type="text"
                    placeholder="16 Digit NIK"
                    value={formData.nikKtp}
                    onChange={(e) => handleChange("nikKtp", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    No. WhatsApp / HP Aktif
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 08123456789"
                    value={formData.telepon}
                    onChange={(e) => handleChange("telepon", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nama Perumahan / Apartemen *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Grand Mutiara Residence Cluster Aeris"
                    value={formData.namaPerumahan}
                    onChange={(e) => handleChange("namaPerumahan", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Blok & No. Unit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Blok C4 No. 12"
                    value={formData.blokUnit}
                    onChange={(e) => handleChange("blokUnit", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tipe Rumah
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Tipe 45/90"
                    value={formData.tipeRumah}
                    onChange={(e) => handleChange("tipeRumah", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nomor Kontrak / PPJB / KPR *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PPJB/GMR/2024/0912"
                    value={formData.nomorKontrak}
                    onChange={(e) => handleChange("nomorKontrak", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Pihak Yang Dituju (Bank/Developer) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="PT. Mutiara Griya Sentosa / Bank BTN"
                    value={formData.namaInstansi}
                    onChange={(e) => handleChange("namaInstansi", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FINANSIAL & PEMBEKUAN */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Kategori Masalah & Nominal Dana Yang Dibekukan</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kategori Pembekuan Pembayaran *
                </label>
                <select
                  value={formData.kategoriPembekuan}
                  onChange={(e) => handleChange("kategoriPembekuan", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="MANGKRAK">
                    1. Wanprestasi Developer — Pembangunan Mangkrak / Terlambat STK
                  </option>
                  <option value="CACAT_KONSTRUKSI">
                    2. Cacat Mutu Konstruksi — Penahanan Uang Retensi Masa Pemeliharaan
                  </option>
                  <option value="SENGKETA_LEGALITAS">
                    3. Sengketa Legalitas — Sertifikat Induk Belum Pecah / PBG Bermasalah
                  </option>
                  <option value="MORATORIUM_KPR">
                    4. Restrukturisasi KPR — Moratorium Cicilan Finansial (POJK)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Harga Properti (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.hargaRumah}
                    onChange={(e) => handleChange("hargaRumah", Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatRupiah(formData.hargaRumah)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nominal Dibekukan / Bln (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.nominalDibekukanPerBulan}
                    onChange={(e) => handleChange("nominalDibekukanPerBulan", Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-red-400 font-bold focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatRupiah(formData.nominalDibekukanPerBulan)} / termin
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Durasi Pembekuan (Bulan) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={formData.durasiBulan}
                    onChange={(e) => handleChange("durasiBulan", Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formData.durasiBulan} Bulan Pembekuan
                  </span>
                </div>
              </div>

              {/* Total Dana Dibekukan Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                    Total Dana Yang Ditahan / Dibekukan:
                  </span>
                  <span className="text-2xl font-black text-white tracking-tight mt-0.5 block">
                    {formatRupiah(formData.totalDanaDibekukan)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Status Awal:</span>
                  <span className="text-xs font-extrabold text-red-400 uppercase">AKTIF DIBEKUKAN</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tanggal Mulai Pembekuan
                  </label>
                  <input
                    type="date"
                    value={formData.tanggalMulai}
                    onChange={(e) => handleChange("tanggalMulai", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Dasar Rujukan Regulasi
                  </label>
                  <input
                    type="text"
                    value={formData.dasarHukum}
                    onChange={(e) => handleChange("dasarHukum", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: KRONOLOGI & BUKTI */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                <span>Kronologi Masalah, Tuntutan & Lampiran Bukti</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Kronologi Permasalahan / Alasan Pembekuan *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Jelaskan fakta keterlambatan, mangkrak, atau cacat bangunan secara runut..."
                  value={formData.kronologi}
                  onChange={(e) => handleChange("kronologi", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Tuntutan & Syarat Pencairan Kembali
                </label>
                <textarea
                  rows="2"
                  placeholder="Contoh: 1. Penuntasan atap dan dinding 2. Ganti rugi denda keterlambatan 3. Verifikasi ulang fisik"
                  value={formData.tuntutan}
                  onChange={(e) => handleChange("tuntutan", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                ></textarea>
              </div>

              {/* Lampiran Bukti Foto URL */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Lampirkan URL Foto Bukti (Bangunan Mangkrak / Cacat Konstruksi / Dokumen)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://... (URL foto/dokumen)"
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddLampiran}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                  >
                    Tambah
                  </button>
                </div>

                {formData.lampiran.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {formData.lampiran.map((lamp, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-700 h-20 group">
                        <img src={lamp.url} alt={lamp.nama} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[10px] text-white p-1 text-center font-bold">
                          {lamp.nama}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
              >
                ← Kembali
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition"
              >
                Batal
              </button>

              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/20"
                >
                  Lanjut →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-extrabold transition shadow-lg shadow-blue-600/30"
                >
                  ✓ Daftarkan Pembekuan Resmi
                </button>
              )}
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
