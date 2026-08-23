import React from 'react';
import { Question, StudentAnswer } from '../../types';
import { MultipleChoice } from './questionTypes/MultipleChoice';
import { ComplexMultipleChoice } from './questionTypes/ComplexMultipleChoice';
import { MatchingQuestion } from './questionTypes/MatchingQuestion';
import { TrueFalseQuestion } from './questionTypes/TrueFalseQuestion';
import { BookOpen, Layers, Target, FileText, CheckCircle2 } from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  totalQuestions: number;
  answer: StudentAnswer | undefined;
  onUpdateAnswer: (updated: Partial<StudentAnswer>) => void;
  fontSize: 'sm' | 'md' | 'lg';
  answeredCount: number;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  totalQuestions,
  answer,
  onUpdateAnswer,
  fontSize,
  answeredCount
}) => {
  // Font size classes
  const fontClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  const currentFontClass = fontClasses[fontSize];

  // Cognitive level labels & badge colors
  const levelLabels = {
    'L1_Pemahaman': { text: 'Level 1: Pemahaman (Knowing)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'L2_Aplikasi': { text: 'Level 2: Aplikasi (Applying)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'L3_Penalaran': { text: 'Level 3: Penalaran (Reasoning)', color: 'bg-purple-100 text-purple-800 border-purple-300' }
  };

  const typeLabels = {
    'pg': 'Pilihan Ganda',
    'pg_kompleks': 'Pilihan Ganda Kompleks',
    'menjodohkan': 'Menjodohkan',
    'benar_salah': 'Benar / Salah'
  };

  const currentLevelInfo = levelLabels[question.level] || levelLabels['L1_Pemahaman'];
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
      {/* Sub-header status bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="flex items-center justify-center bg-[#0B56A4] text-white font-black px-3 py-1 rounded-md text-sm shadow-xs">
            SOAL NO. {question.number}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 border border-gray-300">
            {typeLabels[question.type]}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${currentLevelInfo.color}`}>
            {currentLevelInfo.text}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-gray-600">
            Progres: <strong className="text-blue-900">{answeredCount}</strong> / {totalQuestions} Soal ({progressPercent}%)
          </div>
          <div className="w-28 sm:w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0B56A4] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-full">
          {/* LEFT COLUMN: Stimulus & Konteks Soal (5 or 6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 overflow-hidden">
            {/* Stimulus Header */}
            <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm sm:text-base">
                <FileText className="w-5 h-5 text-[#0B56A4]" />
                <span>Stimulus Bacaan / Konteks</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#0B56A4] px-2.5 py-0.5 rounded-full border border-blue-200">
                Topik: {question.topic}
              </span>
            </div>

            {/* Stimulus Title */}
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 leading-snug">
              {question.stimulusTitle}
            </h2>

            {/* Stimulus Text (200-300 words with clean paragraph breaks) */}
            <div className={`text-gray-700 leading-relaxed space-y-3 whitespace-pre-line ${currentFontClass}`}>
              {question.stimulusText}
            </div>

            {/* Subtle bottom note */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-gray-400" />
              <span>Matematika SMP Fase D • Asesmen Kompetensi Minimum (AKM)</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Pertanyaan & Interaktif Pilihan Jawaban (6 or 7 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
            {/* Question Text Box */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5">
                Pertanyaan Soal No. {question.number}:
              </p>
              <h3 className={`font-bold text-gray-900 leading-snug ${currentFontClass}`}>
                {question.questionText}
              </h3>
            </div>

            {/* Interactive Answer Input based on Question Type */}
            <div className="flex-1">
              {question.type === 'pg' && (
                <MultipleChoice
                  question={question}
                  selectedAnswer={answer?.pgAnswer}
                  onSelectAnswer={(key) =>
                    onUpdateAnswer({
                      pgAnswer: key,
                      isAnswered: true
                    })
                  }
                  fontSizeClass={currentFontClass}
                />
              )}

              {question.type === 'pg_kompleks' && (
                <ComplexMultipleChoice
                  question={question}
                  selectedAnswers={answer?.pgKompleksAnswers || []}
                  onToggleAnswer={(key) => {
                    const current = answer?.pgKompleksAnswers || [];
                    const next = current.includes(key)
                      ? current.filter((k) => k !== key)
                      : [...current, key];
                    onUpdateAnswer({
                      pgKompleksAnswers: next,
                      isAnswered: next.length > 0
                    });
                  }}
                  fontSizeClass={currentFontClass}
                />
              )}

              {question.type === 'menjodohkan' && (
                <MatchingQuestion
                  question={question}
                  matchingAnswers={answer?.matchingAnswers || {}}
                  onPairChange={(premiseId, targetValue) => {
                    const current = { ...(answer?.matchingAnswers || {}) };
                    if (targetValue) {
                      current[premiseId] = targetValue;
                    } else {
                      delete current[premiseId];
                    }
                    onUpdateAnswer({
                      matchingAnswers: current,
                      isAnswered: Object.keys(current).length > 0
                    });
                  }}
                  fontSizeClass={currentFontClass}
                />
              )}

              {question.type === 'benar_salah' && (
                <TrueFalseQuestion
                  question={question}
                  trueFalseAnswers={answer?.trueFalseAnswers || {}}
                  onAnswerChange={(statementId, val) => {
                    const current = { ...(answer?.trueFalseAnswers || {}) };
                    current[statementId] = val;
                    onUpdateAnswer({
                      trueFalseAnswers: current,
                      isAnswered: Object.keys(current).length > 0
                    });
                  }}
                  fontSizeClass={currentFontClass}
                />
              )}
            </div>

            {/* Answer Status Indicator in question card */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                {answer?.isAnswered ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Soal ini telah dijawab
                  </span>
                ) : (
                  <span className="text-gray-400 font-medium italic">
                    Belum dijawab
                  </span>
                )}
              </div>
              {answer?.isDoubtful && (
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  Status: Ragu-Ragu
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
