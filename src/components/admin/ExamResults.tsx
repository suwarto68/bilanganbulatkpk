import React, { useState } from 'react';
import { ExamResult, Question, ExamSettings } from '../../types';
import { FileSpreadsheet, Download, Search, Eye, Trash2, CheckCircle2, XCircle, Clock, Award, Layers, X, Printer, RefreshCw } from 'lucide-react';
import { GoogleSheetsService } from '../../services/googleSheetsService';

interface ExamResultsProps {
  results: ExamResult[];
  questions: Question[];
  settings: ExamSettings;
  onDeleteResult: (id: string) => void;
  onClearAllResults: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  results,
  questions,
  settings,
  onDeleteResult,
  onClearAllResults
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; message?: string; success?: boolean }>({
    loading: false
  });

  const availableClasses = Array.from(new Set(results.map((r) => r.kelas))).filter(Boolean);

  const filteredResults = results.filter((r) => {
    const matchSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.nisn.includes(searchTerm);
    const matchClass = filterClass === 'all' || r.kelas === filterClass;
    return matchSearch && matchClass;
  });

  const exportCSV = () => {
    if (results.length === 0) return;

    // Build header with No_1 to No_35
    const headers = [
      'Timestamp',
      'Username',
      'Nama Siswa',
      'Kelas',
      'NISN',
      'Skor Akhir (0-100)',
      'Kategori Capaian',
      'Benar',
      'Sebagian',
      'Salah',
      'Durasi (Menit)',
      'Waktu Mulai',
      'Waktu Selesai'
    ];
    for (let i = 1; i <= 35; i++) {
      headers.push(`No_${i}`);
    }

    const rows = results.map((r) => {
      const answersSummary: string[] = [];
      for (let i = 1; i <= 35; i++) {
        const a = r.answers[i];
        if (!a || !a.isAnswered) {
          answersSummary.push('-');
        } else if (a.pgAnswer) {
          answersSummary.push(a.pgAnswer);
        } else if (a.pgKompleksAnswers && a.pgKompleksAnswers.length > 0) {
          answersSummary.push(a.pgKompleksAnswers.join(';'));
        } else if (a.matchingAnswers) {
          answersSummary.push(Object.values(a.matchingAnswers).join('|'));
        } else if (a.trueFalseAnswers) {
          answersSummary.push(Object.values(a.trueFalseAnswers).join('|'));
        } else {
          answersSummary.push('V');
        }
      }

      return [
        r.finishTime,
        r.username,
        r.studentName,
        r.kelas,
        r.nisn,
        r.totalScore,
        r.competencyLevel,
        r.correctCount,
        r.partialCount,
        r.wrongCount,
        r.durationSpentMinutes,
        r.startTime,
        r.finishTime,
        ...answersSummary
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hasil_Ujian_CBT_ANBK_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSyncAllToSheets = async () => {
    if (!settings.googleSheetWebAppUrl) {
      setSyncStatus({
        loading: false,
        success: false,
        message: 'URL Google Apps Script belum diatur di menu Pengaturan.'
      });
      return;
    }

    setSyncStatus({ loading: true });
    let successCount = 0;
    for (const res of results) {
      const resp = await GoogleSheetsService.sendExamResultToSheet(res, settings);
      if (resp.success) successCount++;
    }

    setSyncStatus({
      loading: false,
      success: successCount > 0,
      message: `Berhasil menyinkronkan ${successCount} data hasil ujian ke sheet JawabanUjian!`
    });
  };

  const getCompetencyBadge = (level: string) => {
    switch (level) {
      case 'Mahir':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cakap':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Dasar':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-red-100 text-red-900 border-red-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Hasil Ujian & Rekap Nilai Siswa (Sheet: JawabanUjian)
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Rekapitulasi otomatis nilai asesmen matematika SMP Fase D, detail jawaban 35 butir, dan sinkronisasi spreadsheet.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSyncAllToSheets}
            disabled={syncStatus.loading || results.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{syncStatus.loading ? 'Menyinkronkan...' : 'Kirim Semua ke Sheet'}</span>
          </button>

          <button
            type="button"
            onClick={exportCSV}
            disabled={results.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold border border-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Spreadsheet (CSV)</span>
          </button>

          {results.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Kosongkan semua riwayat hasil ujian? Tindakan ini tidak dapat dibatalkan.')) {
                  onClearAllResults();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatus.message && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 ${
            syncStatus.success
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          <span>{syncStatus.message}</span>
          <button
            type="button"
            onClick={() => setSyncStatus({ loading: false })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama siswa, NISN, kelas..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#0B56A4] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white font-medium text-gray-700 outline-none"
          >
            <option value="all">Semua Kelas</option>
            {availableClasses.map((cls) => (
              <option key={cls} value={cls}>
                Kelas {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B56A4] text-white font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">NISN</th>
                <th className="py-3.5 px-4 text-center">Skor Akhir</th>
                <th className="py-3.5 px-4 text-center">Capaian AKM</th>
                <th className="py-3.5 px-4 text-center">B / S</th>
                <th className="py-3.5 px-4">Waktu Selesai</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400 font-semibold">
                    Belum ada data pengerjaan ujian siswa.
                  </td>
                </tr>
              ) : (
                filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{r.studentName}</td>
                    <td className="py-3 px-4 font-semibold">{r.kelas}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{r.nisn}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-sm font-black text-[#0B56A4] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {r.totalScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${getCompetencyBadge(
                          r.competencyLevel
                        )}`}
                      >
                        {r.competencyLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[11px]">
                      <span className="text-emerald-700 font-bold">{r.correctCount}</span> /{' '}
                      <span className="text-red-600 font-bold">{r.wrongCount}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-[11px]">{r.finishTime}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedResult(r)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-[11px] border border-blue-200 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Rincian</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus data hasil ujian ${r.studentName}?`)) {
                              onDeleteResult(r.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between bg-[#0B56A4] px-6 py-4 text-white">
              <div>
                <h3 className="font-black text-base md:text-lg">
                  Rincian Jawaban: {selectedResult.studentName}
                </h3>
                <p className="text-xs text-blue-100 font-medium">
                  Kelas: {selectedResult.kelas} | NISN: {selectedResult.nisn} | Skor:{' '}
                  <strong>{selectedResult.totalScore}</strong> ({selectedResult.competencyLevel})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="p-1 rounded-lg hover:bg-blue-800 text-blue-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-center">
                <div>
                  <span className="text-gray-400 block">Total Skor</span>
                  <span className="text-base font-black text-blue-900">{selectedResult.totalScore}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Benar</span>
                  <span className="text-base font-black text-emerald-700">{selectedResult.correctCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Sebagian</span>
                  <span className="text-base font-black text-amber-700">{selectedResult.partialCount}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Salah</span>
                  <span className="text-base font-black text-red-600">{selectedResult.wrongCount}</span>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 text-sm pt-2">
                Analisis Jawaban 35 Butir Soal:
              </h4>

              <div className="space-y-3">
                {questions.map((q) => {
                  const ans = selectedResult.answers[q.number];
                  const isCorrect = ans?.isCorrect;

                  return (
                    <div
                      key={q.number}
                      className={`p-3.5 rounded-xl border ${
                        isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-red-200 bg-red-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black px-2 py-0.5 bg-gray-800 text-white rounded text-[11px]">
                            No. {q.number}
                          </span>
                          <span className="font-bold text-gray-700">[{q.topic} - {q.level}]</span>
                        </div>
                        {isCorrect ? (
                          <span className="text-emerald-800 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar ({ans?.scoreObtained}/{ans?.maxScore} Poin)
                          </span>
                        ) : (
                          <span className="text-red-700 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> {ans?.scoreObtained && ans.scoreObtained > 0 ? `Sebagian (${ans.scoreObtained} Poin)` : 'Salah (0 Poin)'}
                          </span>
                        )}
                      </div>

                      <p className="font-bold text-gray-900 mb-1">{q.questionText}</p>

                      <div className="text-gray-600 bg-white p-2.5 rounded-lg border border-gray-200">
                        <span className="font-semibold block text-blue-900">Pembahasan & Kunci:</span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
