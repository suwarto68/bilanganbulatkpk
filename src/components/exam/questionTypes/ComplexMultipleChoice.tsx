import React from 'react';
import { Question } from '../../../types';
import { CheckSquare, Square } from 'lucide-react';

interface ComplexMultipleChoiceProps {
  question: Question;
  selectedAnswers?: string[];
  onToggleAnswer: (key: string) => void;
  fontSizeClass?: string;
}

export const ComplexMultipleChoice: React.FC<ComplexMultipleChoiceProps> = ({
  question,
  selectedAnswers = [],
  onToggleAnswer,
  fontSizeClass = 'text-base'
}) => {
  const options = question.options || [];

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
        <span className="text-xs font-semibold text-blue-900">
          Tipe Soal: Pilihan Ganda Kompleks
        </span>
        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
          Pilih lebih dari 1 jawaban
        </span>
      </div>

      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedAnswers.includes(opt.key);

          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onToggleAnswer(opt.key)}
              className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-[#0B56A4] bg-blue-50/90 text-blue-950 shadow-sm ring-1 ring-[#0B56A4]'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50/80 text-gray-800'
              }`}
            >
              {/* Checkbox square indicator */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-bold text-sm transition-colors mt-0.5 ${
                  isSelected
                    ? 'bg-[#0B56A4] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                {opt.key}
              </div>

              {/* Option Text */}
              <div className={`leading-relaxed ${fontSizeClass} flex-1`}>
                {opt.text}
              </div>

              {/* Checkbox Icon */}
              <div className="shrink-0 pt-0.5 text-[#0B56A4]">
                {isSelected ? (
                  <CheckSquare className="w-5 h-5 fill-blue-100" />
                ) : (
                  <Square className="w-5 h-5 text-gray-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
