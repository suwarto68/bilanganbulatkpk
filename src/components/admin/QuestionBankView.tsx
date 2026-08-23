import React, { useState } from 'react';
import { Question } from '../../types';
import { BookOpen, Filter, Search, Layers, CheckCircle2, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface QuestionBankViewProps {
  questions: Question[];
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ questions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = questions.filter((q) => {
    const matchSearch =
      q.stimulusTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.stimulusText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTopic = filterTopic === 'all' || q.topic === filterTopic;
    const matchLevel = filterLevel === 'all' || q.level === filterLevel;
    const matchType = filterType === 'all' || q.type === filterType;
    return matchSearch && matchTopic && matchLevel && matchType;
  });

  const levelLabels = {
    'L1_Pemahaman': { text: 'L1: Pemahaman', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'L2_Aplikasi': { text: 'L2: Aplikasi', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'L3_Penalaran': { text: 'L3: Penalaran', color: 'bg-purple-100 text-purple-800 border-purple-300' }
  };

  const typeLabels = {
    'pg': 'Pilihan Ganda',
    'pg_kompleks': 'PG Kompleks',
    'menjodohkan': 'Menjodohkan',
    'benar_salah': 'Benar / Salah'
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Bank Soal Matematika SMP Fase D (Total 35 Butir)
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Materi Bilangan Bulat, FPB dan KPK dengan stimulus 200-300 kata sesuai standar Asesmen Nasional (AKM/TKA).
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200">
          <BookOpen className="w-4 h-4 text-[#0B56A4]" />
          <span>{filtered.length} Soal Ditampilkan</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kata kunci stimulus..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
          />
        </div>

        <div>
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl outline-none bg-white font-medium"
          >
            <option value="all">Semua Topik Materi</option>
            <option value="Bilangan Bulat">Bilangan Bulat</option>
            <option value="FPB dan KPK">FPB dan KPK</option>
          </select>
        </div>

        <div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl outline-none bg-white font-medium"
          >
            <option value="all">Semua Level Kognitif</option>
            <option value="L1_Pemahaman">Level 1 (Pemahaman)</option>
            <option value="L2_Aplikasi">Level 2 (Aplikasi)</option>
            <option value="L3_Penalaran">Level 3 (Penalaran)</option>
          </select>
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl outline-none bg-white font-medium"
          >
            <option value="all">Semua Tipe Soal</option>
            <option value="pg">Pilihan Ganda</option>
            <option value="pg_kompleks">Pilihan Ganda Kompleks</option>
            <option value="menjodohkan">Menjodohkan</option>
            <option value="benar_salah">Benar / Salah</option>
          </select>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          const levelInfo = levelLabels[q.level] || levelLabels['L1_Pemahaman'];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all text-xs"
            >
              {/* Question Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 bg-gray-50/70 hover:bg-blue-50/50 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
              >
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B56A4] text-white font-black text-xs">
                    {q.number}
                  </span>
                  <span className="font-bold text-gray-900 text-sm">{q.stimulusTitle}</span>
                  <span className="px-2.5 py-0.5 rounded-md font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    {typeLabels[q.type]}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md font-semibold border ${levelInfo.color}`}>
                    {levelInfo.text}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-gray-500">
                  <span className="font-semibold text-blue-900">Topik: {q.topic}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Question Body */}
              {isExpanded && (
                <div className="p-5 space-y-4 border-t border-gray-100 animate-fadeIn">
                  {/* Stimulus Context */}
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-1.5 text-blue-950 font-bold mb-1.5">
                      <FileText className="w-4 h-4 text-blue-700" />
                      <span>Stimulus Soal (200-300 kata):</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-xs">
                      {q.stimulusText}
                    </p>
                  </div>

                  {/* Question Statement */}
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="font-bold text-blue-900 block mb-1">Pertanyaan:</span>
                    <p className="font-bold text-gray-900 text-sm leading-snug">{q.questionText}</p>
                  </div>

                  {/* Options / Matrix details */}
                  {q.type === 'pg' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                            opt.key === q.correctAnswer
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-white border-gray-200 text-gray-700'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-xs">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                          {opt.key === q.correctAnswer && (
                            <span className="ml-auto text-[10px] font-bold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">
                              KUNCI
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'pg_kompleks' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => {
                        const isCorrect = q.correctAnswers?.includes(opt.key);
                        return (
                          <div
                            key={opt.key}
                            className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                : 'bg-white border-gray-200 text-gray-700'
                            }`}
                          >
                            <span className="w-6 h-6 rounded bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-xs">
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                            {isCorrect && (
                              <span className="ml-auto text-[10px] font-bold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">
                                KUNCI
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'menjodohkan' && q.matchingPairs && (
                    <div className="space-y-2">
                      <span className="font-bold text-gray-700 block">Pasangan yang Benar:</span>
                      {q.matchingPairs.map((pair, pIdx) => (
                        <div key={pair.id} className="flex items-center justify-between p-2.5 bg-gray-50 border rounded-lg">
                          <span className="font-semibold text-gray-800">{pair.premise}</span>
                          <span className="font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                            ➔ {pair.target}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'benar_salah' && q.trueFalseStatements && (
                    <div className="space-y-1.5">
                      <span className="font-bold text-gray-700 block">Kunci Pernyataan Benar/Salah:</span>
                      {q.trueFalseStatements.map((st) => (
                        <div key={st.id} className="flex items-center justify-between p-2.5 bg-gray-50 border rounded-lg">
                          <span className="text-gray-800 font-medium">{st.statement}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded font-black text-xs ${
                              st.correctAnswer === 'Benar'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-red-100 text-red-900 border border-red-300'
                            }`}
                          >
                            {st.correctAnswer}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <span className="font-bold text-blue-900 block mb-1">
                      Kunci Jawaban & Pembahasan Lengkap:
                    </span>
                    <p className="text-gray-700">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
