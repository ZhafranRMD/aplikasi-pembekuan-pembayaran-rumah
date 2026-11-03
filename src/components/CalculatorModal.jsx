import React, { useState } from "react";
import {
  X,
  Calculator,
  Building,
  DollarSign,
  TrendingDown,
  Scale,
  Calendar,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import {
  calculateMoratoriumDetails,
  calculateDeveloperPenalty,
  formatRupiah
} from "../services/freezeService";

export default function CalculatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("MORATORIUM");

  // State Simulasi Moratorium KPR
  const [plafon, setPlafon] = useState(500000000);
  const [bungaPersen, setBungaPersen] = useState(8.5);
  const [tenorTahun, setTenorTahun] = useState(15);
  const [angsuranBiasa, setAngsuranBiasa] = useState(4925000);
  const [durasiBeku, setDurasiBeku] = useState(6);
  const [skema, setSkema] = useState("TOTAL");

  // State Kalkulator Denda Developer
  const [hargaRumah, setHargaRumah] = useState(750000000);
  const [hariKeterlambatan, setHariKeterlambatan] = useState(90);

  // Hasil Perhitungan
  const moratoriumResult = calculateMoratoriumDetails({
    plafon,
    bungaPersen,
    tenorBulan: tenorTahun * 12,
    angsuranBiasa,
    durasiBekuBulan: durasiBeku,
    skema
  });

  const penaltyResult = calculateDeveloperPenalty({
    hargaRumah,
    hariKeterlambatan
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Kalkulator Moratorium KPR & Denda Developer
              </h2>
              <p className="text-xs text-slate-400">
                Simulasi penangguhan cicilan & penalti wanprestasi keterlambatan unit
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

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 border-b border-slate-800 text-xs font-bold bg-slate-950/60">
          <button
            onClick={() => setActiveTab("MORATORIUM")}
            className={`py-3 px-4 text-center transition flex items-center justify-center gap-2 ${
              activeTab === "MORATORIUM"
                ? "text-blue-400 border-b-2 border-blue-500 bg-blue-500/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>1. Simulasi Moratorium Cicilan KPR</span>
          </button>

          <button
            onClick={() => setActiveTab("DENDA")}
            className={`py-3 px-4 text-center transition flex items-center justify-center gap-2 ${
              activeTab === "DENDA"
                ? "text-red-400 border-b-2 border-red-500 bg-red-500/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>2. Denda Keterlambatan Developer</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6">
          
          {/* TAB 1: MORATORIUM KPR */}
          {activeTab === "MORATORIUM" && (
            <div className="space-y-5 animate-in fade-in">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Sisa Pokok Utang KPR (Rp)
                  </label>
                  <input
                    type="number"
                    value={plafon}
                    onChange={(e) => setPlafon(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatRupiah(plafon)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Angsuran Normal Bulanan (Rp)
                  </label>
                  <input
                    type="number"
                    value={angsuranBiasa}
                    onChange={(e) => setAngsuranBiasa(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatRupiah(angsuranBiasa)} / bulan
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Durasi Pembekuan (Bulan)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={durasiBeku}
                    onChange={(e) => setDurasiBeku(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Pilihan Skema Moratorium
                  </label>
                  <select
                    value={skema}
                    onChange={(e) => setSkema(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="TOTAL">Skema A: Pembekuan Penuh (0 Cicilan)</option>
                    <option value="POKOK_ONLY">Skema B: Pokok Beku (Hanya Bayar Bunga)</option>
                    <option value="RETENSI_DEVELOPER">Skema C: Retensi 5% Cacat Bangunan</option>
                  </select>
                </div>
              </div>

              {/* Hasil Simulasi Moratorium */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/30 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Hasil Estimasi Simulasi Moratorium:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Total Dana Dihemat/Tertahan</span>
                    <span className="text-lg font-black text-white mt-1 block">
                      {formatRupiah(moratoriumResult.danaTertahanTotal)}
                    </span>
                    <span className="text-[10px] text-blue-400 mt-0.5 block">Selama {durasiBeku} bulan</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Cicilan Selama Masa Beku</span>
                    <span className="text-lg font-black text-amber-400 mt-1 block">
                      {formatRupiah(moratoriumResult.cicilanSelamaBeku)}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {skema === "TOTAL" ? "Bebas cicilan 100%" : "Bunga berjalan saja"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block font-medium">Perpanjangan Tenor</span>
                    <span className="text-lg font-black text-emerald-400 mt-1 block">
                      +{moratoriumResult.perpanjanganTenor} Bulan
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Di ujung masa KPR</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DENDA DEVELOPER */}
          {activeTab === "DENDA" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-slate-300 leading-relaxed">
                ℹ️ Berdasarkan <b>Standar PPJB KemenPUPR & Pasal 1243 KUHPerdata</b>, developer yang terlambat melakukan serah terima kunci (STK) dikenakan denda keterlambatan sebesar <b>1‰ (satu permil / 0.1%) per hari</b> dari nilai total harga rumah.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Harga Rumah Sesuai PPJB (Rp)
                  </label>
                  <input
                    type="number"
                    value={hargaRumah}
                    onChange={(e) => setHargaRumah(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatRupiah(hargaRumah)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Jumlah Hari Keterlambatan (Hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={hariKeterlambatan}
                    onChange={(e) => setHariKeterlambatan(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    ± {Math.round(hariKeterlambatan / 30)} Bulan Keterlambatan
                  </span>
                </div>
              </div>

              {/* Hasil Denda Developer */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-500/40 space-y-3">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                  Klaim Kompensasi Denda Yang Berhak Ditagihkan ke Developer:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-medium">Denda Keterlambatan per Hari</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block font-mono">
                      {formatRupiah(penaltyResult.dendaPerHari)} / hari
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">1‰ × Harga Rumah</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-medium">Total Akumulasi Denda Wanprestasi</span>
                    <span className="text-2xl font-black text-red-400 mt-1 block font-mono">
                      {formatRupiah(penaltyResult.totalDenda)}
                    </span>
                    <span className="text-[10px] text-red-400 mt-0.5 block">
                      Untuk {hariKeterlambatan} hari keterlambatan
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                  *Dana penalti ini dapat langsung diperhitungkan sebagai <b>pemotong sisa kewajiban pembayaran termin</b> atau dituntut ganti rugi secara tunai.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
          >
            Tutup Kalkulator
          </button>
        </div>

      </div>
    </div>
  );
}
