import React from 'react';
import { Question } from '../../../types';

interface MultipleChoiceProps {
  question: Question;
  selectedAnswer?: string;
  onSelectAnswer: (key: string) => void;
  fontSizeClass?: string;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  fontSizeClass = 'text-base'
}) => {
  const options = question.options || [];

  return (
    <div className="space-y-3 pt-2">
      <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">
        Pilihan Jawaban (Pilih Satu):
      </p>

      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelectAnswer(opt.key)}
              className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-[#0B56A4] bg-blue-50/90 text-blue-950 shadow-sm ring-1 ring-[#0B56A4]'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50/80 text-gray-800'
              }`}
            >
              {/* Option Letter Circle (A, B, C, D) */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-sm transition-colors ${
                  isSelected
                    ? 'bg-[#0B56A4] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                {opt.key}
              </div>

              {/* Option Text */}
              <div className={`pt-0.5 leading-relaxed ${fontSizeClass} flex-1`}>
                {opt.text}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
