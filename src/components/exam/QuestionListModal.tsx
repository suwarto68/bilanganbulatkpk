import React from 'react';
import { Question, StudentAnswer } from '../../types';
import { X, CheckCircle2, HelpCircle, Circle, AlertCircle } from 'lucide-react';

interface QuestionListModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: { [questionNumber: number]: StudentAnswer };
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onFinishPrompt: () => void;
}

export const QuestionListModal: React.FC<QuestionListModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  currentIndex,
  onSelectQuestion,
  onFinishPrompt
}) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-[#0B56A4] px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base md:text-lg">Daftar Butir Soal Ujian</h3>
            <span className="bg-blue-900/80 text-blue-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Total {questions.length} Soal
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-blue-800 text-blue-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend / Status Badges */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#0B56A4] text-white font-bold text-[11px]">
              {answeredCount}
            </span>
            <span className="text-gray-700 font-medium">Sudah Dijawab</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-400 text-gray-900 font-bold text-[11px]">
              {doubtfulCount}
            </span>
            <span className="text-gray-700 font-medium">Ragu-Ragu</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-white border border-gray-300 text-gray-700 font-bold text-[11px]">
              {unansweredCount}
            </span>
            <span className="text-gray-700 font-medium">Belum Dijawab</span>
          </div>
        </div>

        {/* Question Grid 1-35 */}
        <div className="p-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5 sm:gap-3">
            {questions.map((q, idx) => {
              const ans = answers[q.number];
              const isCurrent = idx === currentIndex;
              const isDoubtful = ans?.isDoubtful;
              const isAnswered = ans?.isAnswered;

              let tileStyle = 'bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-400';
              let badge = null;

              if (isDoubtful) {
                tileStyle = 'bg-amber-400 text-gray-950 font-bold border-2 border-amber-500 shadow-sm';
                badge = '?';
              } else if (isAnswered) {
                tileStyle = 'bg-[#0B56A4] text-white font-bold border-2 border-[#084282] shadow-sm';
                badge = ans.pgAnswer || '✓';
              }

              return (
                <button
                  key={q.number}
                  type="button"
                  onClick={() => {
                    onSelectQuestion(idx);
                    onClose();
                  }}
                  className={`relative flex flex-col items-center justify-center h-14 rounded-xl transition-all ${tileStyle} ${
                    isCurrent ? 'ring-4 ring-offset-1 ring-blue-500 scale-105 z-10' : ''
                  }`}
                >
                  <span className="text-sm font-black">{q.number}</span>
                  {badge && (
                    <span className="text-[10px] uppercase font-bold opacity-90 leading-none">
                      {badge}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onFinishPrompt();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Selesai dan Kumpulkan Ujian
          </button>
        </div>
      </div>
    </div>
  );
};
