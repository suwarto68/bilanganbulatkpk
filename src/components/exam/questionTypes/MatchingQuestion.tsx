import React from 'react';
import { Question } from '../../../types';
import { ArrowRight, Link2, CheckCircle2 } from 'lucide-react';

interface MatchingQuestionProps {
  question: Question;
  matchingAnswers?: { [premiseId: string]: string };
  onPairChange: (premiseId: string, targetValue: string) => void;
  fontSizeClass?: string;
}

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  question,
  matchingAnswers = {},
  onPairChange,
  fontSizeClass = 'text-base'
}) => {
  const pairs = question.matchingPairs || [];
  
  // All possible target options (correct targets + distractors)
  const allTargets = Array.from(
    new Set([
      ...pairs.map(p => p.target),
      ...(question.distractorTargets || [])
    ])
  );

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
        <span className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
          <Link2 className="w-4 h-4 text-[#0B56A4]" />
          Tipe Soal: Menjodohkan
        </span>
        <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
          Pasangkan Kolom Kiri dengan Pilihan di Kolom Kanan
        </span>
      </div>

      <div className="space-y-3">
        {pairs.map((pair, idx) => {
          const selectedTarget = matchingAnswers[pair.id] || '';
          const isPaired = Boolean(selectedTarget);

          return (
            <div
              key={pair.id}
              className={`p-3.5 rounded-xl border-2 transition-all ${
                isPaired
                  ? 'border-blue-300 bg-blue-50/50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Column A: Premise */}
                <div className="flex items-start gap-2.5 flex-1">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0B56A4] text-white font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <p className={`font-medium text-gray-800 leading-snug ${fontSizeClass}`}>
                    {pair.premise}
                  </p>
                </div>

                {/* Arrow Connector */}
                <div className="hidden md:flex items-center justify-center text-blue-500 shrink-0 px-1">
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Column B: Selection Dropdown */}
                <div className="w-full md:w-64 shrink-0">
                  <select
                    value={selectedTarget}
                    onChange={(e) => onPairChange(pair.id, e.target.value)}
                    className={`w-full p-2.5 text-sm font-medium rounded-lg border-2 transition-colors cursor-pointer ${
                      isPaired
                        ? 'border-[#0B56A4] bg-white text-blue-950 ring-1 ring-[#0B56A4]'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <option value="">-- Pilih Pasangan --</option>
                    {allTargets.map((targetOption) => (
                      <option key={targetOption} value={targetOption}>
                        {targetOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isPaired && (
                <div className="mt-2 pt-2 border-t border-blue-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terpasang dengan: <strong>{selectedTarget}</strong></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
