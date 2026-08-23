import React, { useState } from 'react';
import { ExamSettings } from '../../types';
import { Save, Copy, Check, ExternalLink, HelpCircle, FileSpreadsheet, ShieldAlert, Sparkles, RefreshCw, Key } from 'lucide-react';
import { GoogleSheetsService, APPS_SCRIPT_TEMPLATE } from '../../services/googleSheetsService';

interface SettingsViewProps {
  settings: ExamSettings;
  onSaveSettings: (settings: ExamSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<ExamSettings>({ ...settings });
  const [copiedScript, setCopiedScript] = useState(false);
  const [testResult, setTestResult] = useState<{ loading: boolean; message?: string; success?: boolean }>({
    loading: false
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof ExamSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const copyScriptCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleTestConnection = async () => {
    if (!formData.googleSheetWebAppUrl) {
      setTestResult({
        loading: false,
        success: false,
        message: 'Masukkan URL Web App Google Apps Script terlebih dahulu!'
      });
      return;
    }

    setTestResult({ loading: true });
    const res = await GoogleSheetsService.testConnection(formData.googleSheetWebAppUrl);
    setTestResult({
      loading: false,
      success: res.success,
      message: res.message
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Pengaturan CBT & Integrasi Google Spreadsheet
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Konfigurasi waktu ujian, token pengawas, identitas sekolah, dan koneksi Google Sheets.
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B56A4] hover:bg-blue-800 text-white text-xs font-bold shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      {/* Google Spreadsheet Integration Card */}
      <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Integrasi Google Spreadsheet (Sheet UserLogin & JawabanUjian)
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Sistem akan otomatis membaca data login dari sheet <strong>UserLogin</strong> dan menuliskan rekap pengerjaan siswa ke sheet <strong>JawabanUjian</strong>.
            </p>
          </div>
        </div>

        {/* Web App URL Input & Test */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            URL Google Apps Script Web App (Deployment URL):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={formData.googleSheetWebAppUrl || ''}
              onChange={(e) => handleChange('googleSheetWebAppUrl', e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
              className="flex-1 p-3 text-xs border-2 border-gray-300 rounded-xl focus:border-[#0B56A4] outline-none font-mono"
            />
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testResult.loading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors shrink-0"
            >
              {testResult.loading ? 'Menguji...' : 'Uji Koneksi'}
            </button>
          </div>
          {testResult.message && (
            <p
              className={`text-xs font-semibold p-2.5 rounded-lg border ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-red-50 text-red-800 border-red-300'
              }`}
            >
              {testResult.message}
            </p>
          )}
        </div>

        {/* 4-Step Setup Guide with 1-Click Code Copy */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Panduan 4 Langkah Pasang Google Apps Script:
            </h4>
            <button
              type="button"
              onClick={copyScriptCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Tersalin!' : 'Salin Kode Apps Script'}</span>
            </button>
          </div>

          <ol className="list-decimal pl-4 space-y-2 text-gray-700 leading-relaxed">
            <li>
              Buka Google Spreadsheet baru Anda di{' '}
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold underline inline-flex items-center gap-0.5"
              >
                sheets.new <ExternalLink className="w-3 h-3" />
              </a>
              . (Sheet <code className="bg-white px-1.5 py-0.5 rounded border font-bold">UserLogin</code> &amp; <code className="bg-white px-1.5 py-0.5 rounded border font-bold">JawabanUjian</code> akan otomatis dibuat oleh sistem).
            </li>
            <li>
              Klik menu <strong>Extensions (Ekstensi)</strong> ➔ <strong>Apps Script</strong> di Google Sheets.
            </li>
            <li>
              Hapus semua kode di editor <code className="font-mono bg-white px-1 rounded">Kode.gs</code>, lalu <strong>Paste (Tempel)</strong> kode yang Anda salin dari tombol di atas.
            </li>
            <li>
              Klik <strong>Deploy (Terapkan)</strong> ➔ <strong>New deployment (Penerapan baru)</strong> ➔ Pilih jenis <strong>Web App (Aplikasi web)</strong> ➔ Ubah <em>Who has access (Siapa yang memiliki akses)</em> menjadi <strong>Anyone (Siapa saja)</strong> ➔ Klik Deploy dan salin Web App URL ke kotak di atas.
            </li>
          </ol>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] leading-relaxed">
            <strong>Catatan jika muncul pesan error:</strong> <em>TypeError: Cannot read properties of undefined (reading &apos;parameter&apos;)</em> terjadi jika Anda menekan tombol &apos;Jalankan&apos; (Run) pada fungsi <code className="font-mono bg-amber-100 px-1 rounded">doGet</code> langsung di editor Apps Script. Fungsi <code className="font-mono bg-amber-100 px-1 rounded">doGet</code> &amp; <code className="font-mono bg-amber-100 px-1 rounded">doPost</code> otomatis berjalan saat aplikasi web CBT mengakses URL Web App. Jika ingin menguji langsung di editor Apps Script, pilih fungsi <code className="font-mono bg-amber-100 px-1 rounded font-bold">testScript</code> di dropdown atas lalu klik Jalankan.
          </div>
        </div>
      </div>

      {/* General Exam Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Identification */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-xs font-medium">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            Identitas Ujian & Sekolah
          </h3>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase">Nama Sekolah / Lembaga</label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => handleChange('schoolName', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase">Judul Ujian</label>
            <input
              type="text"
              value={formData.examTitle}
              onChange={(e) => handleChange('examTitle', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase">Mata Pelajaran</label>
            <input
              type="text"
              value={formData.subjectName}
              onChange={(e) => handleChange('subjectName', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase">Logo URL</label>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => handleChange('logoUrl', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4] font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Exam Timing & Rules */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-xs font-medium">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            Waktu, Token & Aturan Ujian
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-gray-700 uppercase">Durasi Ujian (Menit)</label>
              <input
                type="number"
                min={5}
                max={240}
                value={formData.durationMinutes}
                onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value) || 60)}
                className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-gray-700 uppercase">Nilai KKM (Passing Grade)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.passingGrade}
                onChange={(e) => handleChange('passingGrade', parseInt(e.target.value) || 75)}
                className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase">Token Ujian Pengawas</label>
            <input
              type="text"
              value={formData.tokenExam}
              onChange={(e) => handleChange('tokenExam', e.target.value.toUpperCase())}
              className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4] font-mono font-bold uppercase tracking-wider"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl cursor-pointer">
              <span className="font-bold text-gray-800">Aktifkan Token Masuk Ujian</span>
              <input
                type="checkbox"
                checked={formData.enableToken}
                onChange={(e) => handleChange('enableToken', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl cursor-pointer">
              <span className="font-bold text-gray-800">Acak Urutan Soal untuk Siswa</span>
              <input
                type="checkbox"
                checked={formData.shuffleQuestions}
                onChange={(e) => handleChange('shuffleQuestions', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl cursor-pointer">
              <span className="font-bold text-gray-800">Tampilkan Hasil & Pembahasan ke Siswa</span>
              <input
                type="checkbox"
                checked={formData.showScoreAfterExam}
                onChange={(e) => handleChange('showScoreAfterExam', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
