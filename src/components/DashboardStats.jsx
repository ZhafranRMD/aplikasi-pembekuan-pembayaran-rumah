import React from "react";
import {
  Lock,
  Building,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Scale,
  ShieldCheck
} from "lucide-react";
import { formatRupiah } from "../services/freezeService";

export default function DashboardStats({ cases }) {
  const totalDanaDibekukan = cases.reduce((acc, c) => acc + (Number(c.totalDanaDibekukan) || 0), 0);
  const totalNilaiProperti = cases.reduce((acc, c) => acc + (Number(c.hargaRumah) || 0), 0);
  
  const aktifCount = cases.filter((c) => c.status === "AKTIF").length;
  const ditinjauCount = cases.filter((c) => c.status === "DITINJAU").length;
  const mediasiCount = cases.filter((c) => c.status === "MEDIASI").length;
  const selesaiCount = cases.filter((c) => c.status === "SELESAI").length;

  const mangkrakCount = cases.filter((c) => c.kategoriPembekuan === "MANGKRAK").length;
  const cacatCount = cases.filter((c) => c.kategoriPembekuan === "CACAT_KONSTRUKSI").length;
  const sengketaCount = cases.filter((c) => c.kategoriPembekuan === "SENGKETA_LEGALITAS").length;
  const moratoriumCount = cases.filter((c) => c.kategoriPembekuan === "MORATORIUM_KPR").length;

  return (
    <div className="space-y-6">
      
      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Dana Dibekukan */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900/80 border border-blue-500/30 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-blue-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Total Dana Dibekukan
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white tracking-tight">
              {formatRupiah(totalDanaDibekukan)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-300">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Cicilan & termin berhasil diamankan</span>
          </div>
        </div>

        {/* Kasus Aktif Dibekukan */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 to-slate-900/80 border border-amber-500/30 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-amber-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Pembekuan Aktif
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              {aktifCount}
            </span>
            <span className="text-xs text-amber-300 font-semibold">Unit Rumah</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <span>{mediasiCount} dalam mediasi • {ditinjauCount} ditinjau</span>
          </div>
        </div>

        {/* Nilai Properti Dilindungi */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-900/80 border border-indigo-500/30 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-indigo-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Aset Properti Terlindungi
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white tracking-tight">
              {formatRupiah(totalNilaiProperti)}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-300">
            <span>Dari total {cases.length} unit terdata</span>
          </div>
        </div>

        {/* Kasus Berhasil Selesai */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-900/80 border border-emerald-500/30 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-emerald-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Selesai / Dicairkan
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              {selesaiCount}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">Kasus Sukses</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mediasi tuntas & hak dipenuhi</span>
          </div>
        </div>

      </div>

      {/* Kategori Permasalahan & Dasar Hukum Konsumen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Distribusi Kategori */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>Distribusi Kategori Pembekuan Pembayaran</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Berdasarkan Sengketa</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Bangunan Mangkrak</span>
              <span className="text-xl font-bold text-red-400 mt-1 block">{mangkrakCount}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Terlambat STK</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Cacat Konstruksi</span>
              <span className="text-xl font-bold text-amber-400 mt-1 block">{cacatCount}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Retensi Retak/Bocor</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Sengketa Tanah/SHM</span>
              <span className="text-xl font-bold text-purple-400 mt-1 block">{sengketaCount}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Legalitas/PBG</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Moratorium KPR</span>
              <span className="text-xl font-bold text-cyan-400 mt-1 block">{moratoriumCount}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Finansial / POJK</span>
            </div>
          </div>
        </div>

        {/* Perlindungan Hukum Konsumen Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Dasar Hukum Pembekuan</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Konsumen berhak secara sah menahan/membekukan pembayaran termin kepada pengembang berdasarkan <b>Pasal 1243 KUHPerdata</b> dan <b>UU No. 8/1999</b> apabila pihak pengembang melakukan cidera janji (*wanprestasi*).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Sesuai Regulasi OJK & BPSK</span>
            <span className="text-blue-400 font-semibold">Berita Acara Resmi ✓</span>
          </div>
        </div>

      </div>

    </div>
  );
}
