import React, { useState } from 'react';
import { AlertTriangle, CheckSquare, Square, CheckCircle2, X } from 'lucide-react';
import { Question, StudentAnswer } from '../../types';

interface ExamConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmFinish: () => void;
  questions: Question[];
  answers: { [questionNumber: number]: StudentAnswer };
  isSubmitting?: boolean;
}

export const ExamConfirmModal: React.FC<ExamConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmFinish,
  questions,
  answers,
  isSubmitting = false
}) => {
  const [agreedCheck1, setAgreedCheck1] = useState(false);
  const [agreedCheck2, setAgreedCheck2] = useState(false);
  const [agreedCheck3, setAgreedCheck3] = useState(false);

  if (!isOpen) return null;

  let answeredCount = 0;
  let doubtfulCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const ans = answers[q.number];
    if (ans?.isDoubtful) {
      doubtfulCount++;
    } else if (ans?.isAnswered) {
      answeredCount++;
    } else {
      unansweredCount++;
    }
  });

  const totalQuestions = questions.length;
  const isAllAnswered = unansweredCount === 0 && doubtfulCount === 0;
  const canSubmit = agreedCheck1 && agreedCheck2 && agreedCheck3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-amber-500 px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-white" />
            <h3 className="font-black text-lg">Konfirmasi Selesai Ujian</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-amber-600 text-amber-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            Apakah Anda yakin ingin menyelesaikan dan mengumpulkan ujian ini? Setelah dikumpulkan, Anda tidak dapat mengubah jawaban Anda lagi.
          </p>

          {/* Status summary pill */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-center text-xs">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="block text-lg font-black text-blue-900">{answeredCount}</span>
              <span className="text-blue-700 font-semibold">Terjawab Mantap</span>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
              <span className="block text-lg font-black text-amber-800">{doubtfulCount}</span>
              <span className="text-amber-700 font-semibold">Masih Ragu</span>
            </div>
            <div className="p-2 bg-red-50 rounded-lg border border-red-200">
              <span className="block text-lg font-black text-red-700">{unansweredCount}</span>
              <span className="text-red-600 font-semibold">Belum Dijawab</span>
            </div>
          </div>

          {(!isAllAnswered) && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Perhatian:</strong> Masih terdapat <strong>{unansweredCount} soal belum dijawab</strong> dan <strong>{doubtfulCount} soal ditandai ragu-ragu</strong>. Disarankan memeriksa kembali sebelum mengumpulkan.
              </span>
            </div>
          )}

          {/* ANBK 3-Checkbox Confirmation */}
          <div className="space-y-2.5 pt-2 border-t border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={agreedCheck1}
                onChange={(e) => setAgreedCheck1(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Saya telah memeriksa seluruh jawaban dan siap mengakhiri sesi ujian.</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={agreedCheck2}
                onChange={(e) => setAgreedCheck2(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Saya menyetujui bahwa hasil ujian akan langsung dinilai dan disimpan ke sistem.</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={agreedCheck3}
                onChange={(e) => setAgreedCheck3(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="font-bold text-gray-900">Kumpulkan jawaban dan selesaikan ujian sekarang.</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Batal, Kembali ke Ujian
          </button>

          <button
            type="button"
            onClick={onConfirmFinish}
            disabled={!canSubmit || isSubmitting}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white shadow-md transition-all ${
              canSubmit && !isSubmitting
                ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                : 'bg-gray-400 cursor-not-allowed opacity-70'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim Jawaban...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>SELESAI UJIAN</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
