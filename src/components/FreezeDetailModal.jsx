import React, { useState } from "react";
import {
  X,
  Building,
  User,
  CreditCard,
  Scale,
  Calendar,
  AlertTriangle,
  Clock,
  Printer,
  CheckCircle2,
  FileText,
  Send,
  MessageSquare,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { formatRupiah, formatTanggalIndo } from "../services/freezeService";

export default function FreezeDetailModal({
  isOpen,
  onClose,
  caseItem,
  onUpdateStatus,
  onOpenLetter
}) {
  if (!isOpen || !caseItem) return null;

  const [newStatus, setNewStatus] = useState(caseItem.status);
  const [newNote, setNewNote] = useState("");

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) {
      alert("Harap berikan catatan riwayat perkembangan status!");
      return;
    }
    onUpdateStatus(caseItem.id, newStatus, newNote.trim());
    setNewNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400">{caseItem.id}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-mono">{caseItem.nomorSurat}</span>
              </div>
              <h2 className="text-lg font-black text-white mt-0.5">
                {caseItem.namaPerumahan} — {caseItem.blokUnit}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLetter(caseItem)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Surat A4</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body Grid */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Dana Dibekukan
              </span>
              <span className="text-xl font-black text-red-400 tracking-tight mt-1 block">
                {formatRupiah(caseItem.totalDanaDibekukan)}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {formatRupiah(caseItem.nominalDibekukanPerBulan)} / bulan ({caseItem.durasiBulan} bln)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Pihak Terkait
              </span>
              <span className="text-sm font-extrabold text-white mt-1 block truncate">
                {caseItem.namaInstansi}
              </span>
              <span className="text-xs text-blue-400 font-mono mt-1 block">
                Kontrak: {caseItem.nomorKontrak}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Identitas Pemohon
              </span>
              <span className="text-sm font-extrabold text-white mt-1 block">
                {caseItem.namaPemohon}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                📱 {caseItem.telepon || "-"}
              </span>
            </div>

          </div>

          {/* Kronologi & Dasar Hukum */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>Kronologi Permasalahan & Dasar Hukum Wanprestasi</span>
            </h3>
            
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {caseItem.kronologi}
            </p>

            {caseItem.tuntutan && (
              <div className="pt-2">
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  Tuntutan Pemohon:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                  {caseItem.tuntutan}
                </p>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-bold text-slate-300">Rujukan Hukum:</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/40 font-mono text-[11px]">
                {caseItem.dasarHukum}
              </span>
            </div>
          </div>

          {/* Lampiran Bukti Foto */}
          {caseItem.lampiran && caseItem.lampiran.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Dokumentasi & Bukti Fisik Lapangan
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {caseItem.lampiran.map((l, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group relative">
                    <img src={l.url} alt={l.nama} className="w-full h-32 object-cover" />
                    <div className="p-2 bg-slate-900/90 text-[11px] text-slate-300 truncate">
                      {l.nama}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Update Status & Tambah Catatan Mediasi */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Pembaruan Status & Catatan Mediasi</span>
            </h3>

            <form onSubmit={handleStatusSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Ubah Status Kasus
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="AKTIF">🔴 AKTIF DIBEKUKAN</option>
                    <option value="MEDIASI">🟡 DALAM MEDIASI</option>
                    <option value="DITINJAU">🔵 SEDANG DITINJAU</option>
                    <option value="SELESAI">🟢 SELESAI / DICAIRKAN</option>
                    <option value="DITOLAK">⚪ DITOLAK</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Catatan Perkembangan Mediasi / Kesepakatan Baru *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pertemuan mediasi ke-2; Developer menyetujui kompensasi..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-md shadow-blue-600/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Simpan</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Riwayat Timeline Aktivitas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Log Riwayat Aktivitas & Perjalanan Sengketa</span>
            </h3>

            <div className="space-y-2.5">
              {caseItem.riwayatAktivitas && caseItem.riwayatAktivitas.map((act, index) => (
                <div key={index} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-blue-400 font-mono">
                        {act.tanggal}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {act.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {act.catatan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
