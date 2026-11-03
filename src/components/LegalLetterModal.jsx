import React, { useState } from "react";
import {
  X,
  Printer,
  FileText,
  Building,
  Scale,
  CheckCircle,
  Download,
  ShieldCheck
} from "lucide-react";
import { formatRupiah, formatTanggalIndo } from "../services/freezeService";

export default function LegalLetterModal({ isOpen, onClose, caseItem }) {
  if (!isOpen || !caseItem) return null;

  const [letterType, setLetterType] = useState(
    caseItem.jenisInstansi === "BANK" ? "BANK_MORATORIUM" : "DEVELOPER_SOMASI"
  );

  const handlePrint = () => {
    window.print();
  };

  const todayStr = formatTanggalIndo(new Date().toISOString().split("T")[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">
                Generator Surat Resmi & Berita Acara Legal (A4)
              </h2>
              <p className="text-[11px] text-slate-400">
                Dokumen formal berstandar hukum untuk diajukan ke Pengembang / Pihak Perbankan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={letterType}
              onChange={(e) => setLetterType(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="DEVELOPER_SOMASI">Surat Somasi & Penahanan Termin Developer</option>
              <option value="BANK_MORATORIUM">Surat Permohonan Moratorium Cicilan Bank KPR</option>
              <option value="RETENSI_CACAT">Berita Acara Penahanan Uang Retensi Konstruksi</option>
            </select>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/25"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF A4</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (Standard Indonesian Legal Letter A4) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-800/40 flex justify-center">
          
          <div
            id="printable-legal-letter"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-8 sm:p-12 shadow-2xl rounded-sm font-serif leading-relaxed text-[12px] sm:text-[13px] border border-gray-300"
          >
            
            {/* Header Surat Formal */}
            <div className="border-b-2 border-black pb-3 mb-6 text-center">
              <h1 className="text-base sm:text-lg font-bold uppercase tracking-wider text-black">
                PEMBERITAHUAN RESMI PENANGGUHAN & PEMBEKUAN PEMBAYARAN
              </h1>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide mt-0.5">
                PERLINDUNGAN KONSUMEN & KONTRAK PERUMAHAN
              </h2>
              <p className="text-[10px] text-gray-600 mt-1 font-sans">
                Rujukan Regulasi: Pasal 1243 KUHPerdata • UU Perlindungan Konsumen No. 8 Tahun 1999 • PP No. 12 Tahun 2021
              </p>
            </div>

            {/* Nomor & Tanggal Surat */}
            <div className="flex justify-between items-start mb-6 text-xs font-sans">
              <div>
                <table className="text-xs">
                  <tbody>
                    <tr>
                      <td className="w-20 font-semibold text-gray-700">Nomor</td>
                      <td>: <b>{caseItem.nomorSurat}</b></td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700">Lampiran</td>
                      <td>: 1 (Satu) Berkas Bukti Lapangan & Salinan Kontrak</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-700">Perihal</td>
                      <td>: <b>
                        {letterType === "DEVELOPER_SOMASI" && "Pemberitahuan Penahanan/Pembekuan Pembayaran Termin atas Keterlambatan Pembangunan"}
                        {letterType === "BANK_MORATORIUM" && "Permohonan Restrukturisasi & Moratorium Angsuran Pokok KPR"}
                        {letterType === "RETENSI_CACAT" && "Pemberitahuan Penahanan Dana Retensi Cacat Mutu Konstruksi"}
                      </b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-right">
                <p>Jakarta, {todayStr}</p>
              </div>
            </div>

            {/* Tujuan Surat */}
            <div className="mb-6 text-xs font-sans">
              <p>Kepada Yth.,</p>
              <p className="font-bold text-sm text-black uppercase">
                {letterType === "BANK_MORATORIUM" ? "Pimpinan Cabang / Bagian Consumer Loan" : "Direktur Utama / Pimpinan Manajemen Proyek"}
              </p>
              <p className="font-bold text-black">{caseItem.namaInstansi}</p>
              <p className="text-gray-700">Di Tempat</p>
            </div>

            {/* Isi Surat */}
            <div className="space-y-3.5 text-justify font-sans text-xs sm:text-[13px] leading-relaxed text-gray-900">
              <p>
                Dengan hormat,
              </p>
              <p>
                Sehubungan dengan Perjanjian Pengikatan Jual Beli (PPJB) / Akad Kredit Pemilikan Rumah (KPR) Nomor: <b>{caseItem.nomorKontrak}</b>, yang bertanda tangan di bawah ini saya:
              </p>

              {/* Tabel Identitas */}
              <div className="my-2 p-3 bg-gray-50 border border-gray-300 rounded text-xs space-y-1">
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-gray-600">Nama Konsumen / Debitur</span>
                  <span className="col-span-2 font-bold text-black">: {caseItem.namaPemohon}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-gray-600">NIK KTP</span>
                  <span className="col-span-2 font-mono text-black">: {caseItem.nikKtp || "-"}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-gray-600">Unit Properti</span>
                  <span className="col-span-2 font-bold text-black">: {caseItem.namaPerumahan}, {caseItem.blokUnit} ({caseItem.tipeRumah})</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-semibold text-gray-600">Nomor Telepon / WA</span>
                  <span className="col-span-2 text-black">: {caseItem.telepon}</span>
                </div>
              </div>

              <p>
                Melalui surat ini, saya menyampaikan pernyataan resmi untuk <b>MENAHAN / MEMBEKUKAN PEMBAYARAN</b> terhitung sejak tanggal <b>{formatTanggalIndo(caseItem.tanggalMulai)}</b> hingga durasi <b>{caseItem.durasiBulan} bulan</b> ke depan dengan total nominal dana yang dibekukan sebesar:
              </p>

              {/* Kotak Nominal Dibekukan */}
              <div className="my-3 p-3.5 bg-red-50 border-2 border-red-600 rounded text-center">
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block">
                  JUMLAH DANA PEMBAYARAN YANG RESMI DIBEKUKAN / DITAHAN:
                </span>
                <span className="text-xl sm:text-2xl font-black text-red-700 font-mono tracking-tight block mt-1">
                  {formatRupiah(caseItem.totalDanaDibekukan)}
                </span>
                <span className="text-[11px] text-gray-700 mt-0.5 block">
                  (Rincian: {formatRupiah(caseItem.nominalDibekukanPerBulan)} per termin/bulan selama {caseItem.durasiBulan} bulan)
                </span>
              </div>

              {/* Fakta Kronologi */}
              <p>
                Adapun pembekuan pembayaran ini didasarkan pada fakta-fakta hukum dan kronologis sebagai berikut:
              </p>
              <div className="p-3 bg-gray-50 border-l-4 border-blue-600 text-xs italic text-gray-800 leading-relaxed">
                "{caseItem.kronologi}"
              </div>

              {/* Rujukan Hukum & Tuntutan */}
              <p>
                Berdasarkan <b>{caseItem.dasarHukum}</b>, debitur/konsumen berhak menunda kewajiban pembayarannya apabila pihak lawan telah terlebih dahulu melakukan cidera janji (*wanprestasi*). Bersama surat ini, saya mengajukan tuntutan sebagai syarat pencairan kembali:
              </p>

              <ol className="list-decimal pl-5 space-y-1 text-xs">
                <li>Pemberhentian sementara pencairan dana termin hingga progres fisik lapangan memenuhi standar yang disepakati.</li>
                <li>Pembebasan seluruh denda keterlambatan pembayaran yang timbul selama masa sengketa berlangsung.</li>
                <li>Kompensasi penalti keterlambatan penyerahan kunci sebesar 1‰ (satu permil) per hari kalender sesuai ketentuan PPJB.</li>
              </ol>

              <p>
                Kami memberikan tenggat waktu selama <b>7 (tujuh) hari kerja</b> terhitung sejak diterimanya surat ini untuk memberikan tanggapan resmi secara tertulis atau mengadakan mediasi musyawarah. Apabila dalam batas waktu tersebut tidak ada iktikad baik, maka kami akan meneruskan laporan ini kepada Badan Penyelesaian Sengketa Konsumen (BPSK), Otoritas Jasa Keuangan (OJK), dan menempuh jalur hukum perdata.
              </p>

              <p>
                Demikian surat pemberitahuan ini dibuat dengan sebenarnya untuk menjadi perhatian dan segera ditindaklanjuti.
              </p>
            </div>

            {/* Tanda Tangan Formal dengan Mockup Meterai */}
            <div className="mt-8 pt-4 flex justify-between items-end text-xs font-sans">
              <div className="text-center w-48">
                <p className="text-gray-600 mb-1">Diterima oleh Pihak Terkait,</p>
                <div className="h-16 flex items-center justify-center text-gray-400 border-b border-gray-400">
                  (Tanda Tangan & Cap Instansi)
                </div>
                <p className="font-bold text-gray-800 mt-1">{caseItem.namaInstansi}</p>
                <p className="text-[10px] text-gray-500">Tanggal: ..............................</p>
              </div>

              <div className="text-center w-56">
                <p className="text-gray-600 mb-1">Hormat saya, Pemohon</p>
                
                {/* Meterai 10000 Badge Visual */}
                <div className="h-20 flex flex-col items-center justify-center relative">
                  <div className="w-24 h-12 border border-blue-500 bg-blue-50/70 rounded flex flex-col items-center justify-center text-[9px] font-bold text-blue-900 shadow-sm">
                    <span>METERAI TEMPEL</span>
                    <span className="text-[10px] font-extrabold text-blue-700">Rp 10.000</span>
                  </div>
                  <span className="text-[9px] text-gray-400 italic mt-0.5">(Tanda Tangan di atas meterai)</span>
                </div>

                <div className="border-b border-black font-bold text-black pb-1">
                  {caseItem.namaPemohon}
                </div>
                <p className="text-[10px] text-gray-600 mt-0.5">Konsumen / Debitur Pemilik Unit</p>
              </div>
            </div>

            {/* Footer Legal Tembusan */}
            <div className="mt-8 pt-3 border-t border-gray-300 text-[10px] text-gray-500 font-sans">
              <p className="font-semibold text-gray-600">Tembusan Kepada Yth.:</p>
              <p>1. Badan Penyelesaian Sengketa Konsumen (BPSK) Setempat</p>
              <p>2. Lembaga Perlindungan Konsumen Swadaya Masyarakat (LPKSM)</p>
              <p>3. Arsip Sistem Manajemen Pembekuan Pembayaran Rumah (FREEZEHOUSE / SIMPEKA)</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

