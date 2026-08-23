import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle, Grid } from 'lucide-react';

interface QuestionNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  isDoubtful: boolean;
  onToggleDoubtful: () => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onOpenQuestionList: () => void;
  onFinishExamPrompt: () => void;
  isAnswered: boolean;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentIndex,
  totalQuestions,
  isDoubtful,
  onToggleDoubtful,
  onPrevQuestion,
  onNextQuestion,
  onOpenQuestionList,
  onFinishExamPrompt,
  isAnswered
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <footer className="sticky bottom-0 z-30 w-full bg-white border-t border-gray-200 shadow-lg px-3 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 md:gap-4">
        {/* Tombol Merah: Soal Sebelumnya */}
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={isFirst}
          className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all ${
            isFirst
              ? 'bg-gray-300 cursor-not-allowed opacity-60 text-gray-500'
              : 'bg-[#C62828] hover:bg-[#B71C1C] active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Soal</span> Sebelumnya
        </button>

        {/* Center: Tombol Kuning Ragu-ragu & Tombol Daftar Soal */}
        <div className="flex items-center gap-2">
          {/* Tombol Ragu-ragu */}
          <button
            type="button"
            onClick={onToggleDoubtful}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider transition-all border shadow-sm ${
              isDoubtful
                ? 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300 font-extrabold'
                : 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
          >
            <input
              type="checkbox"
              checked={isDoubtful}
              onChange={() => {}} // handled by parent onClick
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer pointer-events-none"
            />
            <span className="uppercase">Ragu-Ragu</span>
          </button>

          {/* Tombol Daftar Soal */}
          <button
            type="button"
            onClick={onOpenQuestionList}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <Grid className="w-4 h-4 text-blue-300" />
            <span className="hidden sm:inline">Daftar</span> Soal
          </button>
        </div>

        {/* Tombol Biru: Soal Berikutnya / Selesai */}
        {isLast ? (
          <button
            type="button"
            onClick={onFinishExamPrompt}
            className="flex items-center gap-1.5 px-3.5 sm:px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 ring-2 ring-emerald-300 animate-pulse"
          >
            <CheckCircle className="w-4 h-4" />
            Selesai Ujian
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-lg bg-[#0B56A4] hover:bg-[#084282] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <span className="hidden xs:inline">Soal</span> Berikutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </footer>
  );
};
