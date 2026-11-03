import React, { useState } from "react";
import {
  Building2,
  Calendar,
  AlertCircle,
  Eye,
  Trash2,
  Printer,
  ShieldAlert,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { formatRupiah, formatTanggalIndo } from "../services/freezeService";

export default function FreezeList({
  cases,
  searchTerm,
  onSelectCase,
  onOpenLetter,
  onDeleteCase
}) {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredCases = cases.filter((c) => {
    if (activeTab !== "ALL" && c.status !== activeTab) {
      return false;
    }
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      const matchName = c.namaPemohon?.toLowerCase().includes(s);
      const matchHousing = c.namaPerumahan?.toLowerCase().includes(s);
      const matchContract = c.nomorKontrak?.toLowerCase().includes(s);
      const matchLetter = c.nomorSurat?.toLowerCase().includes(s);
      const matchInstansi = c.namaInstansi?.toLowerCase().includes(s);
      return matchName || matchHousing || matchContract || matchLetter || matchInstansi;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "AKTIF":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-500/15 text-red-400 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Aktif Dibekukan
          </span>
        );
      case "MEDIASI":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            Dalam Mediasi
          </span>
        );
      case "DITINJAU":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <AlertCircle className="w-3 h-3" />
            Sedang Ditinjau
          </span>
        );
      case "SELESAI":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3 h-3" />
            Selesai / Dicairkan
          </span>
        );
      case "DITOLAK":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-500/15 text-slate-400 border border-slate-500/30">
            <XCircle className="w-3 h-3" />
            Ditolak
          </span>
        );
      default:
        return <span className="text-xs text-slate-400">{status}</span>;
    }
  };

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case "MANGKRAK":
        return (
          <span className="text-[11px] font-bold text-red-300 bg-red-950/60 px-2 py-0.5 rounded-md border border-red-800/40">
            Bangunan Mangkrak / STK
          </span>
        );
      case "CACAT_KONSTRUKSI":
        return (
          <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/40">
            Cacat Konstruksi / Retensi
          </span>
        );
      case "SENGKETA_LEGALITAS":
        return (
          <span className="text-[11px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/40">
            Sengketa Tanah / Sertifikat
          </span>
        );
      case "MORATORIUM_KPR":
        return (
          <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/40">
            Moratorium Cicilan KPR
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
            Lainnya
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      
      {/* Header & Filter Tabs */}
      <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <span>Daftar Pengajuan Pembekuan Pembayaran</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar kontrak rumah dengan penahanan termin atau moratorium cicilan aktif
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "ALL" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Semua ({cases.length})
          </button>
          <button
            onClick={() => setActiveTab("AKTIF")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "AKTIF" ? "bg-red-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setActiveTab("MEDIASI")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "MEDIASI" ? "bg-amber-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Mediasi
          </button>
          <button
            onClick={() => setActiveTab("DITINJAU")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "DITINJAU" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Ditinjau
          </button>
          <button
            onClick={() => setActiveTab("SELESAI")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "SELESAI" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Selesai
          </button>
        </div>
      </div>

      {/* Case List Grid / Cards */}
      {filteredCases.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <ShieldAlert className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-sm font-semibold">Tidak ada data kasus pembekuan ditemukan.</p>
          <p className="text-xs text-slate-600 mt-1">Coba sesuaikan kata kunci pencarian atau tab filter.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800/80">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="p-5 hover:bg-slate-800/40 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 group"
            >
              
              {/* Left Info: Unit & Pemohon */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400">
                    {item.id}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.nomorSurat}
                  </span>
                  {getStatusBadge(item.status)}
                  {getCategoryBadge(item.kategoriPembekuan)}
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition">
                    {item.namaPerumahan} — {item.blokUnit}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">({item.tipeRumah})</span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">
                    👤 Pemohon: {item.namaPemohon}
                  </span>
                  <span>
                    🏢 Pihak: <b className="text-slate-300">{item.namaInstansi}</b>
                  </span>
                  <span>
                    📋 Kontrak: <b className="font-mono text-slate-300">{item.nomorKontrak}</b>
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                  <b className="text-slate-300">Kronologi:</b> {item.kronologi}
                </p>
              </div>

              {/* Middle Info: Nominal Dana Dibekukan */}
              <div className="flex flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/60">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Total Dana Dibekukan
                </span>
                <span className="text-lg font-black text-red-400 tracking-tight block">
                  {formatRupiah(item.totalDanaDibekukan)}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {formatRupiah(item.nominalDibekukanPerBulan)} / bulan ({item.durasiBulan} bln)
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  Mulai: {formatTanggalIndo(item.tanggalMulai)}
                </span>
              </div>

              {/* Right Info: Action Buttons */}
              <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-2 lg:pt-0">
                <button
                  onClick={() => onSelectCase(item)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 transition shadow-sm"
                  title="Lihat Detail Kasus & Riwayat Mediasi"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Detail</span>
                </button>

                <button
                  onClick={() => onOpenLetter(item)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 border border-blue-500/40 text-xs font-bold transition shadow-sm"
                  title="Generate & Cetak Surat Somasi / Permohonan Resmi A4"
                >
                  <Printer className="w-4 h-4" />
                  <span>Surat A4</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Hapus kasus pembekuan untuk ${item.namaPemohon} (${item.nomorKontrak})?`)) {
                      onDeleteCase(item.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/30 transition"
                  title="Hapus Kasus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
