import React, { useState } from 'react';
import { User, ExamSettings } from '../../types';
import { PlayCircle, ShieldCheck, Clock, BookOpen, CheckSquare, AlertCircle, User as UserIcon } from 'lucide-react';
import { Logo } from '../common/Logo';

interface ExamPreStartProps {
  user: User;
  settings: ExamSettings;
  onStartExam: () => void;
  totalQuestions: number;
}

export const ExamPreStart: React.FC<ExamPreStartProps> = ({
  user,
  settings,
  onStartExam,
  totalQuestions
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [tokenError, setTokenError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.enableToken) {
      if (tokenInput.trim().toUpperCase() !== settings.tokenExam.trim().toUpperCase()) {
        setTokenError('Token ujian yang dimasukkan salah. Silakan hubungi proktor/pengawas!');
        return;
      }
    }
    onStartExam();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#0B56A4] px-6 py-6 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
            Konfirmasi Data Peserta Ujian
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
            {settings.examTitle} • {settings.schoolName}
          </p>
        </div>

        <form onSubmit={handleStart} className="p-6 sm:p-8 space-y-6">
          {/* Student Profile Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-blue-700 text-white flex items-center justify-center ring-4 ring-white shadow-md">
                <UserIcon className="w-10 h-10" />
              </div>
            )}

            <div className="flex-1 text-center sm:text-left space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Peserta Terverifikasi
              </span>
              <h3 className="text-lg font-black text-gray-900 leading-snug">{user.name}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 font-medium pt-1">
                <div>NISN: <strong className="text-gray-900">{user.nisn || '-'}</strong></div>
                <div>Kelas: <strong className="text-gray-900">{user.kelas}</strong></div>
                <div>Username: <strong className="text-gray-900">{user.username}</strong></div>
                <div>Jenis Kelamin: <strong className="text-gray-900">{user.gender === 'P' ? 'Perempuan' : 'Laki-laki'}</strong></div>
              </div>
            </div>
          </div>

          {/* Exam Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <BookOpen className="w-5 h-5 text-[#0B56A4] mx-auto mb-1" />
              <span className="text-[11px] text-gray-500 block font-medium">Mata Ujian</span>
              <span className="text-xs font-bold text-gray-900">{settings.subjectName}</span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <CheckSquare className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] text-gray-500 block font-medium">Jumlah Butir Soal</span>
              <span className="text-xs font-bold text-gray-900">{totalQuestions} Soal (Fase D)</span>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="text-[11px] text-gray-500 block font-medium">Alokasi Waktu</span>
              <span className="text-xs font-bold text-gray-900">{settings.durationMinutes} Menit</span>
            </div>
          </div>

          {/* ANBK Instructions */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs space-y-2 text-amber-950">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Petunjuk Pengerjaan Soal CBT ANBK:
            </h4>
            <ul className="list-disc pl-4 space-y-1 leading-relaxed text-amber-900/90">
              <li>Soal terdiri dari 4 variasi tipe: Pilihan Ganda, PG Kompleks, Menjodohkan, dan Benar/Salah.</li>
              <li>Gunakan tombol <strong>Merah</strong> untuk kembali ke soal sebelumnya.</li>
              <li>Gunakan tombol <strong>Kuning (Ragu-ragu)</strong> jika belum yakin dengan jawaban Anda.</li>
              <li>Gunakan tombol <strong>Biru</strong> untuk melanjutkan ke soal berikutnya.</li>
              <li>Jawaban Anda otomatis tersimpan di sistem setiap kali Anda memilih jawaban.</li>
            </ul>
          </div>

          {/* Token field if enabled */}
          {settings.enableToken && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Masukkan Token Ujian dari Pengawas:
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value.toUpperCase());
                  setTokenError('');
                }}
                placeholder="Contoh: MAT-2026"
                className="w-full p-3 font-mono text-center font-bold text-base tracking-widest uppercase border-2 border-gray-300 rounded-xl focus:border-[#0B56A4] focus:ring-2 focus:ring-blue-200 outline-none"
              />
              {tokenError && (
                <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {tokenError}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#0B56A4] hover:bg-[#084282] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-150 active:scale-98"
          >
            <PlayCircle className="w-5 h-5" />
            Mulai Mengerjakan Ujian Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};
