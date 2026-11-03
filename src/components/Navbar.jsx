import React from "react";
import {
  ShieldAlert,
  PlusCircle,
  Calculator,
  Search,
  RefreshCw
} from "lucide-react";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenNewModal,
  onOpenCalculator,
  onRefresh
}) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  FREEZEHOUSE
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  SIMPEKA v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Sistem Manajemen Pembekuan Pembayaran Rumah & Moratorium KPR
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pemohon, nomor kontrak, perumahan, bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition shadow-sm"
              title="Kalkulator Moratorium KPR & Denda Developer"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Kalkulator</span>
            </button>

            <button
              onClick={onRefresh}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-400 hover:text-white transition"
              title="Sinkronisasi Data Firestore"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ajukan Pembekuan</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
