import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import FreezeList from "./components/FreezeList";
import NewFreezeModal from "./components/NewFreezeModal";
import FreezeDetailModal from "./components/FreezeDetailModal";
import LegalLetterModal from "./components/LegalLetterModal";
import CalculatorModal from "./components/CalculatorModal";
import {
  loadLocalCases,
  subscribeToCases,
  saveCase,
  deleteCase,
  updateCaseStatus
} from "./services/freezeService";
import { ShieldAlert, Database, CheckCircle2, Lock, Sparkles } from "lucide-react";

export default function App() {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState(null);
  const [selectedCaseForLetter, setSelectedCaseForLetter] = useState(null);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Load cases & Firestore real-time subscription
  useEffect(() => {
    // Initial local load for instant responsiveness
    const initial = loadLocalCases();
    setCases(initial);
    setIsLoading(false);

    // Subscribe to Firestore (offline persistent cache + multi-tab)
    const unsub = subscribeToCases((updated) => {
      setCases(updated);
      setIsLoading(false);
    });

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  // Handle Save New Case
  const handleSaveNewCase = async (newCaseData) => {
    const saved = await saveCase(newCaseData);
    setCases((prev) => [saved, ...prev.filter((c) => c.id !== saved.id)]);
    showToast(`✓ Kasus pembekuan ${saved.id} berhasil dicatatkan & disinkronkan!`);
    
    // Celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Handle Update Case Status
  const handleUpdateStatus = async (id, status, note) => {
    const updated = await updateCaseStatus(id, status, note);
    setCases(loadLocalCases());
    if (selectedCaseForDetail && selectedCaseForDetail.id === id) {
      setSelectedCaseForDetail(updated);
    }
    showToast(`✓ Status kasus ${id} diperbarui menjadi ${status}`);
  };

  // Handle Delete Case
  const handleDeleteCase = async (id) => {
    const filtered = await deleteCase(id);
    setCases(filtered);
    showToast(`✓ Kasus ${id} telah dihapus.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onRefresh={() => {
          setCases(loadLocalCases());
          showToast("✓ Data lokal & Firestore berhasil disinkronkan.");
        }}
      />

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Banner Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Platform Manajemen Pembekuan Pembayaran & Moratorium KPR #1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Lindungi Hak Konsumen Properti Anda Secara Sah & Terstruktur.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Catat penahanan termin pembangunan mangkrak, retensi cacat fisik bangunan, serta kelola permohonan moratorium cicilan KPR dengan generator surat resmi A4 berstandar hukum KUHPerdata & regulasi perbankan Indonesia.
            </p>
          </div>

          <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-4 text-slate-800">
            <Lock className="w-40 h-40 opacity-15" />
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <DashboardStats cases={cases} />

        {/* Case List & Management */}
        <FreezeList
          cases={cases}
          searchTerm={searchTerm}
          onSelectCase={(item) => setSelectedCaseForDetail(item)}
          onOpenLetter={(item) => setSelectedCaseForLetter(item)}
          onDeleteCase={handleDeleteCase}
        />

      </main>

      {/* Modals */}
      <NewFreezeModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={handleSaveNewCase}
      />

      <FreezeDetailModal
        isOpen={!!selectedCaseForDetail}
        onClose={() => setSelectedCaseForDetail(null)}
        caseItem={selectedCaseForDetail}
        onUpdateStatus={handleUpdateStatus}
        onOpenLetter={(item) => {
          setSelectedCaseForDetail(null);
          setSelectedCaseForLetter(item);
        }}
      />

      <LegalLetterModal
        isOpen={!!selectedCaseForLetter}
        onClose={() => setSelectedCaseForLetter(null)}
        caseItem={selectedCaseForLetter}
      />

      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <ShieldAlert className="w-4 h-4 text-blue-500" />
            <span>FREEZEHOUSE / SIMPEKA RUMAH</span>
            <span>— Sistem Pembekuan Pembayaran Properti</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Basis Data: zhafran-firebase (apps/pembekuan-rumah)
            </span>
            <span>•</span>
            <span>100% Offline-First</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
