import React, { useState } from 'react';
import { User, ExamResult, Question, ExamSettings } from '../../types';
import { UserManagement } from './UserManagement';
import { ExamResults } from './ExamResults';
import { QuestionBankView } from './QuestionBankView';
import { SettingsView } from './SettingsView';
import {
  Users,
  Award,
  FileSpreadsheet,
  BookOpen,
  Settings,
  LayoutDashboard,
  PlayCircle,
  LogOut,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { Header } from '../common/Header';

interface AdminDashboardProps {
  currentUser: User;
  users: User[];
  results: ExamResult[];
  questions: Question[];
  settings: ExamSettings;
  onUpdateUser: (u: User) => void;
  onAddUser: (u: User) => void;
  onDeleteUser: (id: string) => void;
  onBulkUpdateUsers: (users: User[]) => void;
  onDeleteResult: (id: string) => void;
  onClearAllResults: () => void;
  onSaveSettings: (s: ExamSettings) => void;
  onStartStudentSimulation: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  users,
  results,
  questions,
  settings,
  onUpdateUser,
  onAddUser,
  onDeleteUser,
  onBulkUpdateUsers,
  onDeleteResult,
  onClearAllResults,
  onSaveSettings,
  onStartStudentSimulation,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'results' | 'questions' | 'settings'>('overview');

  // Stats Calculations
  const studentUsers = users.filter((u) => u.role === 'siswa');
  const totalStudents = studentUsers.length;
  const completedExams = results.length;

  const averageScore =
    completedExams > 0
      ? Math.round(results.reduce((acc, r) => acc + r.totalScore, 0) / completedExams)
      : 0;

  const highestScore =
    completedExams > 0 ? Math.max(...results.map((r) => r.totalScore)) : 0;

  const competencyCount = {
    Mahir: results.filter((r) => r.competencyLevel === 'Mahir').length,
    Cakap: results.filter((r) => r.competencyLevel === 'Cakap').length,
    Dasar: results.filter((r) => r.competencyLevel === 'Dasar').length,
    PerluIntervensi: results.filter((r) => r.competencyLevel === 'Perlu Intervensi Khusus').length
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        settings={settings}
        user={currentUser}
        onLogout={onLogout}
        isAdmin={true}
      />

      {/* Main Admin Content */}
      <div className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0B56A4] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-[#0B56A4] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data Pengguna ({users.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'results'
                  ? 'bg-[#0B56A4] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Hasil Ujian ({results.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'questions'
                  ? 'bg-[#0B56A4] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bank Soal (35 Soal)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0B56A4] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan & Spreadsheet</span>
            </button>
          </div>

          {/* Direct Student Simulation button */}
          <button
            type="button"
            onClick={onStartStudentSimulation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm transition-colors active:scale-95"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Simulasi Ujian CBT Siswa</span>
          </button>
        </div>

        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-blue-50 text-[#0B56A4] border border-blue-100">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 block">Total Siswa Terdaftar</span>
                  <span className="text-2xl font-black text-gray-900">{totalStudents}</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 block">Siswa Selesai Ujian</span>
                  <span className="text-2xl font-black text-gray-900">{completedExams}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 block">Rata-rata Skor</span>
                  <span className="text-2xl font-black text-gray-900">{averageScore}</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 block">Skor Tertinggi</span>
                  <span className="text-2xl font-black text-gray-900">{highestScore}</span>
                </div>
              </div>
            </div>

            {/* Competency AKM Distribution Grid */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0B56A4]" />
                  <h3 className="font-black text-base text-gray-900">
                    Distribusi Capaian Kompetensi AKM Matematika SMP
                  </h3>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  Standar Asesmen Nasional Kemendikbudristek
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                    Mahir (Skor &ge; 85)
                  </span>
                  <div className="text-3xl font-black text-emerald-700">
                    {competencyCount.Mahir}
                  </div>
                  <span className="text-[11px] text-emerald-900/80 block font-medium">
                    Siswa Menguasai Konsep Tingkat Lanjut
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800">
                    Cakap (Skor 70 - 84)
                  </span>
                  <div className="text-3xl font-black text-blue-700">
                    {competencyCount.Cakap}
                  </div>
                  <span className="text-[11px] text-blue-900/80 block font-medium">
                    Mampu Menerapkan Konsep Matematika
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                    Dasar (Skor 50 - 69)
                  </span>
                  <div className="text-3xl font-black text-amber-700">
                    {competencyCount.Dasar}
                  </div>
                  <span className="text-[11px] text-amber-900/80 block font-medium">
                    Memiliki Keterampilan Prosedural Dasar
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 text-center space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-800">
                    Perlu Intervensi (&lt; 50)
                  </span>
                  <div className="text-3xl font-black text-red-700">
                    {competencyCount.PerluIntervensi}
                  </div>
                  <span className="text-[11px] text-red-900/80 block font-medium">
                    Membutuhkan Bimbingan Khusus
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Submissions preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Results */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="font-bold text-sm text-gray-900">Pengerjaan Siswa Terkini</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('results')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Lihat Semua ({results.length})
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {results.slice(-4).reverse().map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div>
                        <span className="font-bold text-gray-900 block">{r.studentName}</span>
                        <span className="text-[11px] text-gray-500">Kelas {r.kelas} • {r.finishTime}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-sm text-[#0B56A4] block">Skor: {r.totalScore}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {r.competencyLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                  {results.length === 0 && (
                    <p className="py-6 text-center text-gray-400 font-medium">
                      Belum ada siswa yang menyelesaikan ujian.
                    </p>
                  )}
                </div>
              </div>

              {/* System info & Google Sheets status */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-xs">
                <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                  Status Sistem & Integrasi Spreadsheet
                </h3>

                <div className="space-y-3 font-medium text-gray-700">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                    <span>Mata Pelajaran:</span>
                    <strong className="text-gray-900">{settings.subjectName}</strong>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                    <span>Alokasi Waktu Ujian:</span>
                    <strong className="text-gray-900">{settings.durationMinutes} Menit</strong>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                    <span>Token Ujian:</span>
                    <span className="font-mono font-black bg-blue-900 text-white px-2 py-0.5 rounded">
                      {settings.tokenExam}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                    <span className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      Google Apps Script Web App:
                    </span>
                    <span className={`font-bold ${settings.googleSheetWebAppUrl ? 'text-emerald-800' : 'text-amber-700'}`}>
                      {settings.googleSheetWebAppUrl ? 'Terkonfigurasi' : 'Belum Diatur'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: User Management */}
        {activeTab === 'users' && (
          <div className="animate-fadeIn">
            <UserManagement
              users={users}
              settings={settings}
              onAddUser={onAddUser}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
              onBulkUpdateUsers={onBulkUpdateUsers}
            />
          </div>
        )}

        {/* Tab 3: Exam Results */}
        {activeTab === 'results' && (
          <div className="animate-fadeIn">
            <ExamResults
              results={results}
              questions={questions}
              settings={settings}
              onDeleteResult={onDeleteResult}
              onClearAllResults={onClearAllResults}
            />
          </div>
        )}

        {/* Tab 4: Question Bank */}
        {activeTab === 'questions' && (
          <div className="animate-fadeIn">
            <QuestionBankView questions={questions} />
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="animate-fadeIn">
            <SettingsView settings={settings} onSaveSettings={onSaveSettings} />
          </div>
        )}
      </div>
    </div>
  );
};
