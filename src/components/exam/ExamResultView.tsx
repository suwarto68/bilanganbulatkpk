import React, { useEffect, useState } from 'react';
import { ExamResult, Question, ExamSettings } from '../../types';
import { Award, CheckCircle2, XCircle, AlertCircle, Clock, FileSpreadsheet, RotateCcw, Printer, ChevronDown, ChevronUp, Layers, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleSheetsService } from '../../services/googleSheetsService';

interface ExamResultViewProps {
  result: ExamResult;
  questions: Question[];
  settings: ExamSettings;
  onRetakeExam?: () => void;
  onLogout: () => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  questions,
  settings,
  onRetakeExam,
  onLogout
}) => {
  const [showDetailReview, setShowDetailReview] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false
  });

  useEffect(() => {
    // Fire confetti for good achievement
    if (result.totalScore >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    // Auto sync to Google Sheets if configured
    if (settings.googleSheetWebAppUrl && !result.syncedToGoogleSheets) {
      syncToGoogleSheets();
    }
  }, []);

  const syncToGoogleSheets = async () => {
    setSyncStatus({ loading: true });
    const res = await GoogleSheetsService.sendExamResultToSheet(result, settings);
    setSyncStatus({
      loading: false,
      success: res.success,
      message: res.message
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Certificate / Result Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-[#0B56A4] to-[#1565C0] px-6 py-8 text-white text-center relative">
            <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-xs mb-3 border border-white/20">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              HASIL UJIAN CBT ANBK
            </h1>
            <p className="text-sm text-blue-100 mt-1 font-medium">
              {settings.schoolName} • {settings.examTitle}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Student Info & Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Student Bio */}
              <div className="md:col-span-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Data Peserta Ujian:
                  </span>
                  <h2 className="text-xl font-black text-gray-900">{result.studentName}</h2>
                  <p className="text-sm text-gray-600 font-medium">
                    Kelas: <strong>{result.kelas}</strong> | NISN: <strong>{result.nisn}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-600">
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block">Waktu Mulai:</span>
                    <span className="font-semibold">{result.startTime}</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block">Durasi Pengerjaan:</span>
                    <span className="font-semibold">{result.durationSpentMinutes} Menit</span>
                  </div>
                </div>

                {/* Competency Level Tag */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-500 block mb-1">
                    Predikat Capaian Kompetensi AKM:
                  </span>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black border ${getCompetencyBadge(result.competencyLevel)}`}>
                    {result.competencyLevel}
                  </span>
                </div>
              </div>

              {/* Big Score Box */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900">
                  SKOR AKHIR UJIAN
                </span>
                <div className="my-2 text-5xl sm:text-6xl font-black text-[#0B56A4]">
                  {result.totalScore}
                </div>
                <div className="text-xs font-bold text-blue-800">
                  Skala Nilai 0 - 100
                </div>

                <div className="w-full grid grid-cols-3 gap-1 mt-4 pt-3 border-t border-blue-200 text-center text-xs">
                  <div>
                    <span className="font-black text-emerald-700 block text-sm">{result.correctCount}</span>
                    <span className="text-gray-500 text-[10px]">Benar</span>
                  </div>
                  <div>
                    <span className="font-black text-amber-700 block text-sm">{result.partialCount}</span>
                    <span className="text-gray-500 text-[10px]">Sebagian</span>
                  </div>
                  <div>
                    <span className="font-black text-red-600 block text-sm">{result.wrongCount}</span>
                    <span className="text-gray-500 text-[10px]">Salah</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Level & Topic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              {/* Level Breakdown */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Capaian Level Kognitif
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-gray-700 mb-1">
                      <span>L1: Pemahaman (Knowing)</span>
                      <span>{Math.round((result.levelBreakdown.L1.score / (result.levelBreakdown.L1.total || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((result.levelBreakdown.L1.score / (result.levelBreakdown.L1.total || 1)) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-gray-700 mb-1">
                      <span>L2: Aplikasi (Applying)</span>
                      <span>{Math.round((result.levelBreakdown.L2.score / (result.levelBreakdown.L2.total || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((result.levelBreakdown.L2.score / (result.levelBreakdown.L2.total || 1)) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-gray-700 mb-1">
                      <span>L3: Penalaran (Reasoning)</span>
                      <span>{Math.round((result.levelBreakdown.L3.score / (result.levelBreakdown.L3.total || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.round((result.levelBreakdown.L3.score / (result.levelBreakdown.L3.total || 1)) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Breakdown */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Capaian Topik Materi
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-gray-700 mb-1">
                      <span>Bilangan Bulat</span>
                      <span>{Math.round((result.topicBreakdown.bilanganBulat.score / (result.topicBreakdown.bilanganBulat.total || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.round((result.topicBreakdown.bilanganBulat.score / (result.topicBreakdown.bilanganBulat.total || 1)) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-gray-700 mb-1">
                      <span>FPB dan KPK</span>
                      <span>{Math.round((result.topicBreakdown.fpbKpk.score / (result.topicBreakdown.fpbKpk.total || 1)) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${Math.round((result.topicBreakdown.fpbKpk.score / (result.topicBreakdown.fpbKpk.total || 1)) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Sheets Sync Notification Card */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold block">Status Google Spreadsheet (Sheet JawabanUjian):</span>
                  <span>{syncStatus.message || 'Jawaban otomatis terekam dan tersimpan di sistem.'}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={syncToGoogleSheets}
                disabled={syncStatus.loading}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors shrink-0"
              >
                {syncStatus.loading ? 'Menyinkronkan...' : 'Sinkronkan Ulang'}
              </button>
            </div>

            {/* Action Buttons: Print, Review, Logout */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Cetak / Simpan PDF
                </button>

                <button
                  type="button"
                  onClick={() => setShowDetailReview(!showDetailReview)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 transition-colors"
                >
                  {showDetailReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showDetailReview ? 'Sembunyikan Pembahasan' : 'Lihat Kunci & Pembahasan Soal'}
                </button>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="px-5 py-2 rounded-xl bg-[#0B56A4] hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                Kembali ke Halaman Utama / Logout
              </button>
            </div>

            {/* Detailed Question Review Accordion */}
            {showDetailReview && (
              <div className="space-y-4 pt-4 border-t border-gray-200 animate-fadeIn">
                <h3 className="font-bold text-base text-gray-900">
                  Pembahasan dan Rincian Jawaban (35 Butir Soal):
                </h3>

                <div className="space-y-4">
                  {questions.map((q) => {
                    const ans = result.answers[q.number];
                    const isCorrect = ans?.isCorrect;

                    return (
                      <div
                        key={q.number}
                        className={`p-4 rounded-xl border-2 text-xs space-y-2 ${
                          isCorrect
                            ? 'border-emerald-200 bg-emerald-50/40'
                            : 'border-red-200 bg-red-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-black px-2 py-0.5 bg-gray-800 text-white rounded">
                              No. {q.number}
                            </span>
                            <span className="font-semibold text-gray-700">[{q.topic} - {q.level}]</span>
                          </div>
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Benar ({ans?.scoreObtained}/{ans?.maxScore} Poin)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-800 font-bold bg-red-100 px-2 py-0.5 rounded">
                              <XCircle className="w-3.5 h-3.5" /> {ans?.scoreObtained && ans.scoreObtained > 0 ? `Sebagian (${ans.scoreObtained} Poin)` : 'Salah (0 Poin)'}
                            </span>
                          )}
                        </div>

                        <p className="font-bold text-gray-900 text-sm">{q.questionText}</p>

                        {/* Explanation Box */}
                        <div className="p-3 bg-white/80 rounded-lg border border-gray-200 text-gray-700">
                          <strong className="text-blue-900 block mb-1">Kunci & Pembahasan:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
