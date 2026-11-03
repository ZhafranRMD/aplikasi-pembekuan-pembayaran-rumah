import {
  db,
  FREEZE_COLLECTION,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "../firebase";

const LOCAL_STORAGE_KEY = "freezehouse_cases_cache_v1";

// Sample Data Realistis Kasus Pembekuan Pembayaran Rumah di Indonesia
export const INITIAL_SAMPLE_CASES = [
  {
    id: "FRZ-2026-001",
    nomorSurat: "018/SPP-KPR/X/2026",
    namaPemohon: "Budi Santoso",
    nikKtp: "3275081904850002",
    telepon: "081298765432",
    email: "budi.santoso@gmail.com",
    alamatDomisili: "Jl. Melati Raya No. 14, Jakarta Timur",
    namaPerumahan: "Grand Mutiara Residence Cluster Aeris",
    blokUnit: "Blok C4 No. 12",
    tipeRumah: "Tipe 45/90",
    nomorKontrak: "PPJB/GMR/2024/0912",
    namaInstansi: "PT. Mutiara Griya Sentosa (Developer)",
    jenisInstansi: "DEVELOPER",
    hargaRumah: 750000000,
    plafonPinjaman: 600000000,
    angsuranBulanan: 7500000,
    kategoriPembekuan: "MANGKRAK",
    kategoriLabel: "Pembangunan Mangkrak / Terlambat Serah Terima Kunci (STK)",
    dasarHukum: "Pasal 1243 KUHPerdata (Ganti Rugi Wanprestasi) & PP No. 12/2021 tentang Perumahan",
    tanggalMulai: "2026-06-01",
    durasiBulan: 6,
    tanggalBerakhir: "2026-12-01",
    nominalDibekukanPerBulan: 7500000,
    totalDanaDibekukan: 45000000,
    status: "AKTIF",
    kronologi: "Sesuai Akta PPJB Pasal 7 ayat 2, jadwal serah terima fisik bangunan dijanjikan paling lambat 31 Mei 2026. Namun hingga saat ini progres fisik baru mencapai 40% dan terhenti tanpa pekerja di lokasi. Pembeli resmi membekukan pencairan termin ke-4 dan ke-5 hingga ada jaminan tertulis penuntasan konstruksi.",
    tuntutan: "1. Pembebasan denda keterlambatan pembeli.\n2. Kompensasi penalti keterlambatan serah terima 1‰ (satu permil) per hari kalender.\n3. Penundaan pencairan dana termin hingga progres mencapai 90%.",
    lampiran: [
      {
        nama: "Foto_Progres_Mangkrak_Oktober.jpg",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80"
      }
    ],
    riwayatAktivitas: [
      {
        tanggal: "2026-06-02",
        status: "DITINJAU",
        catatan: "Pengajuan pembekuan termin pembayaran dicatatkan ke sistem dan somasi ke-1 dikirimkan ke developer."
      },
      {
        tanggal: "2026-06-10",
        status: "AKTIF",
        catatan: "Pembekuan termin ke-4 senilai Rp 22.500.000 aktif ditahan di rekening penampung (escrow)."
      },
      {
        tanggal: "2026-09-15",
        status: "MEDIASI",
        catatan: "Pertemuan mediasi pertama dengan tim legal developer; pihak developer berjanji menambah sub-kontraktor baru."
      }
    ],
    createdAt: "2026-06-01T10:00:00Z"
  },
  {
    id: "FRZ-2026-002",
    nomorSurat: "034/SPP-RETENSI/XI/2026",
    namaPemohon: "Siti Rahmawati, S.E.",
    nikKtp: "3171035508890001",
    telepon: "085612347890",
    email: "siti.rahmawati@gmail.com",
    alamatDomisili: "Komp. Duren Sawit Baru Blok F No. 8, Jakarta Timur",
    namaPerumahan: "Harmoni Sentosa Hills",
    blokUnit: "Blok B2 No. 05",
    tipeRumah: "Tipe 60/120",
    nomorKontrak: "KPR-BTN-998124019",
    namaInstansi: "PT. Griya Harmoni Indah (Developer)",
    jenisInstansi: "DEVELOPER",
    hargaRumah: 850000000,
    plafonPinjaman: 650000000,
    angsuranBulanan: 8200000,
    kategoriPembekuan: "CACAT_KONSTRUKSI",
    kategoriLabel: "Penahanan Uang Retensi — Cacat Mutu Konstruksi & Atap Bocor Masif",
    dasarHukum: "Pasal 4 UU No. 8/1999 tentang Perlindungan Konsumen & Klausul Masa Retensi Garansi 100 Hari",
    tanggalMulai: "2026-08-15",
    durasiBulan: 3,
    tanggalBerakhir: "2026-11-15",
    nominalDibekukanPerBulan: 8500000,
    totalDanaDibekukan: 25500000,
    status: "AKTIF",
    kronologi: "Pasca serah terima kunci 1 bulan, terjadi retak rambut struktural pada balok ruang tamu serta rembesan dak atap beton yang mengakibatkan plafon jebol. Developer belum melakukan perbaikan kendati masa garansi retensi 100 hari masih berjalan.",
    tuntutan: "Penahanan dana retensi 5% dari nilai kontrak (Rp 25.500.000) hingga seluruh perbaikan struktur dan kebocoran selesai diverifikasi oleh konsultan independen.",
    lampiran: [
      {
        nama: "Foto_Kerusakan_Plafon_Bocor.jpg",
        tipe: "image",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80"
      }
    ],
    riwayatAktivitas: [
      {
        tanggal: "2026-08-15",
        status: "AKTIF",
        catatan: "Surat penahanan retensi diterbitkan dan dikirim ke developer."
      }
    ],
    createdAt: "2026-08-15T09:00:00Z"
  },
  {
    id: "FRZ-2026-003",
    nomorSurat: "079/MORATORIUM-KPR/X/2026",
    namaPemohon: "Hendra Wijaya",
    nikKtp: "3276021102800003",
    telepon: "081388776655",
    email: "hendra.wijaya.bisnis@gmail.com",
    alamatDomisili: "Cluster Bukit Asri No. 22, Sentul, Bogor",
    namaPerumahan: "Bukit Asri Eco Living",
    blokUnit: "Blok D No. 18",
    tipeRumah: "Tipe 36/72",
    nomorKontrak: "KPR-BTN-KCB-2023-7761",
    namaInstansi: "Bank BTN Kantor Cabang Sentul",
    jenisInstansi: "BANK",
    hargaRumah: 480000000,
    plafonPinjaman: 380000000,
    angsuranBulanan: 4600000,
    kategoriPembekuan: "MORATORIUM_KPR",
    kategoriLabel: "Restrukturisasi KPR — Moratorium Angsuran Pokok (Grace Period Finansial)",
    dasarHukum: "POJK No. 11/POJK.03/2020 & Ketentuan Restrukturisasi Kredit Perbankan Nasional",
    tanggalMulai: "2026-07-01",
    durasiBulan: 6,
    tanggalBerakhir: "2027-01-01",
    nominalDibekukanPerBulan: 3400000,
    totalDanaDibekukan: 20400000,
    status: "SELESAI",
    kronologi: "Debitur mengajukan moratorium pembayaran angsuran pokok selama 6 bulan sehubungan penurunan omzet usaha pasca penataan wilayah. Pihak Bank BTN menyetujui program restrukturisasi cicilan (hanya bayar bunga berjalan Rp 1.200.000/bln).",
    tuntutan: "Penangguhan pokok KPR selama 6 bulan dengan perpanjangan tenor 6 bulan tanpa denda penalti.",
    lampiran: [],
    riwayatAktivitas: [
      {
        tanggal: "2026-07-01",
        status: "DITINJAU",
        catatan: "Pengajuan berkas restrukturisasi ke bagian Consumer Loan Bank BTN."
      },
      {
        tanggal: "2026-07-20",
        status: "SELESAI",
        catatan: "Adendum Perjanjian Kredit ditandatangani. Program moratorium pokok KPR resmi disetujui."
      }
    ],
    createdAt: "2026-07-01T08:30:00Z"
  }
];

export function loadLocalCases() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error reading local cases:", e);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_CASES));
  return INITIAL_SAMPLE_CASES;
}

export function saveLocalCases(cases) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cases));
  } catch (e) {
    console.error("Error saving local cases:", e);
  }
}

export async function fetchAllCases() {
  try {
    if (!db) return loadLocalCases();
    const colRef = collection(db, FREEZE_COLLECTION);
    const q = query(colRef, orderBy("createdAt", "desc"), limit(50));
    const snap = await getDocs(q);

    if (snap.empty) {
      const initial = loadLocalCases();
      for (const item of initial) {
        await setDoc(doc(db, FREEZE_COLLECTION, item.id), item);
      }
      return initial;
    }

    const items = [];
    snap.forEach((d) => {
      items.push({ id: d.id, ...d.data() });
    });
    saveLocalCases(items);
    return items;
  } catch (err) {
    console.warn("Firestore fetch error, fallback to local:", err);
    return loadLocalCases();
  }
}

export function subscribeToCases(onUpdate) {
  if (!db) {
    onUpdate(loadLocalCases());
    return () => {};
  }

  try {
    const colRef = collection(db, FREEZE_COLLECTION);
    const q = query(colRef, orderBy("createdAt", "desc"), limit(50));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = [];
        snap.forEach((d) => {
          items.push({ id: d.id, ...d.data() });
        });
        if (items.length > 0) {
          saveLocalCases(items);
          onUpdate(items);
        } else {
          onUpdate(loadLocalCases());
        }
      },
      (err) => {
        console.warn("Firestore listener error, using local:", err);
        onUpdate(loadLocalCases());
      }
    );
    return unsub;
  } catch (err) {
    console.warn("Listener init error:", err);
    onUpdate(loadLocalCases());
    return () => {};
  }
}

export async function saveCase(caseData) {
  const currentCases = loadLocalCases();
  const id = caseData.id || `FRZ-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const nowIso = new Date().toISOString();

  const completeCase = {
    ...caseData,
    id,
    createdAt: caseData.createdAt || nowIso,
    updatedAt: nowIso
  };

  const existingIdx = currentCases.findIndex((c) => c.id === id);
  let updatedCases = [];
  if (existingIdx >= 0) {
    updatedCases = [...currentCases];
    updatedCases[existingIdx] = completeCase;
  } else {
    updatedCases = [completeCase, ...currentCases];
  }
  saveLocalCases(updatedCases);

  if (db) {
    try {
      const docRef = doc(db, FREEZE_COLLECTION, id);
      await setDoc(docRef, completeCase, { merge: true });
    } catch (err) {
      console.warn("Firestore save sync warning:", err);
    }
  }

  return completeCase;
}

export async function deleteCase(id) {
  const currentCases = loadLocalCases();
  const filtered = currentCases.filter((c) => c.id !== id);
  saveLocalCases(filtered);

  if (db) {
    try {
      const docRef = doc(db, FREEZE_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("Firestore delete sync warning:", err);
    }
  }
  return filtered;
}

export async function updateCaseStatus(id, newStatus, note = "") {
  const currentCases = loadLocalCases();
  const target = currentCases.find((c) => c.id === id);
  if (!target) return currentCases;

  const nowIso = new Date().toISOString();
  const newActivity = {
    tanggal: nowIso.split("T")[0],
    status: newStatus,
    catatan: note || `Status diperbarui menjadi ${newStatus}`
  };

  const updatedTarget = {
    ...target,
    status: newStatus,
    updatedAt: nowIso,
    riwayatAktivitas: [newActivity, ...(target.riwayatAktivitas || [])]
  };

  return await saveCase(updatedTarget);
}

export function formatRupiah(num) {
  if (num === null || num === undefined || isNaN(num)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(num);
}

export function formatTanggalIndo(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(d);
  } catch (e) {
    return dateStr;
  }
}

export function calculateMoratoriumDetails({
  plafon,
  bungaPersen,
  tenorBulan,
  angsuranBiasa,
  durasiBekuBulan,
  skema
}) {
  const p = parseFloat(plafon) || 0;
  const r = (parseFloat(bungaPersen) || 0) / 100 / 12;
  const n = parseInt(tenorBulan) || 120;
  const m = parseInt(durasiBekuBulan) || 6;
  const angsuran = parseFloat(angsuranBiasa) || 0;

  let danaTertahanTotal = 0;
  let cicilanSelamaBeku = 0;
  let perpanjanganTenor = m;
  let estimasiCicilanBaru = angsuran;

  if (skema === "TOTAL") {
    cicilanSelamaBeku = 0;
    danaTertahanTotal = angsuran * m;
    perpanjanganTenor = m;
    estimasiCicilanBaru = angsuran * 1.02;
  } else if (skema === "POKOK_ONLY") {
    const bungaBulanan = p * r;
    cicilanSelamaBeku = bungaBulanan;
    danaTertahanTotal = (angsuran - bungaBulanan) * m;
    perpanjanganTenor = m;
    estimasiCicilanBaru = angsuran;
  } else if (skema === "RETENSI_DEVELOPER") {
    danaTertahanTotal = p * 0.05;
    cicilanSelamaBeku = 0;
    perpanjanganTenor = 0;
  }

  return {
    danaTertahanTotal: Math.round(danaTertahanTotal),
    cicilanSelamaBeku: Math.round(cicilanSelamaBeku),
    perpanjanganTenor,
    estimasiCicilanBaru: Math.round(estimasiCicilanBaru)
  };
}

export function calculateDeveloperPenalty({ hargaRumah, hariKeterlambatan }) {
  const h = parseFloat(hargaRumah) || 0;
  const d = parseInt(hariKeterlambatan) || 0;
  const dendaPerHari = h * 0.001;
  const totalDenda = dendaPerHari * d;
  return {
    dendaPerHari: Math.round(dendaPerHari),
    totalDenda: Math.round(totalDenda)
  };
}
