import React from 'react';
import { Question } from '../../../types';
import { Check, X } from 'lucide-react';

interface TrueFalseQuestionProps {
  question: Question;
  trueFalseAnswers?: { [statementId: string]: 'Benar' | 'Salah' };
  onAnswerChange: (statementId: string, answer: 'Benar' | 'Salah') => void;
  fontSizeClass?: string;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  trueFalseAnswers = {},
  onAnswerChange,
  fontSizeClass = 'text-base'
}) => {
  const statements = question.trueFalseStatements || [];

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
        <span className="text-xs font-semibold text-blue-900">
          Tipe Soal: Benar atau Salah
        </span>
        <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
          Pilih Benar atau Salah pada setiap baris pernyataan
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/80 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-700">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Pernyataan</th>
                <th className="py-3 px-3 w-28 text-center bg-emerald-50/70 text-emerald-900 border-l border-gray-200">
                  Benar
                </th>
                <th className="py-3 px-3 w-28 text-center bg-red-50/70 text-red-900 border-l border-gray-200">
                  Salah
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {statements.map((st, idx) => {
                const currentSelection = trueFalseAnswers[st.id];

                return (
                  <tr
                    key={st.id}
                    className={`transition-colors ${
                      currentSelection ? 'bg-blue-50/30' : 'hover:bg-gray-50/60'
                    }`}
                  >
                    {/* Number */}
                    <td className="py-3.5 px-4 text-center font-bold text-xs text-gray-500">
                      {idx + 1}
                    </td>

                    {/* Statement Text */}
                    <td className={`py-3.5 px-4 text-gray-800 leading-relaxed ${fontSizeClass}`}>
                      {st.statement}
                    </td>

                    {/* Benar Radio Option */}
                    <td className="py-3.5 px-3 text-center border-l border-gray-200 bg-emerald-50/20">
                      <button
                        type="button"
                        onClick={() => onAnswerChange(st.id, 'Benar')}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currentSelection === 'Benar'
                            ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                            : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Benar</span>
                      </button>
                    </td>

                    {/* Salah Radio Option */}
                    <td className="py-3.5 px-3 text-center border-l border-gray-200 bg-red-50/20">
                      <button
                        type="button"
                        onClick={() => onAnswerChange(st.id, 'Salah')}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          currentSelection === 'Salah'
                            ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-400'
                            : 'bg-white text-red-700 border border-red-300 hover:bg-red-100'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Salah</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
