import React, { useState } from 'react';
import { User, ExamSettings } from '../../types';
import { Logo } from '../common/Logo';
import { Lock, User as UserIcon, LogIn, AlertCircle, Eye, EyeOff, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  users: User[];
  settings: ExamSettings;
  onRefreshUsersFromSheet?: () => Promise<void>;
  isLoadingFromSheet?: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  users,
  settings,
  onRefreshUsersFromSheet,
  isLoadingFromSheet = false
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMessage('Silakan isi Username dan Password terlebih dahulu!');
      setIsSubmitting(false);
      return;
    }

    // Search user in database (case insensitive for username)
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === trimmedUser.toLowerCase() &&
        (u.password === trimmedPass || (!u.password && trimmedPass === 'pass123'))
    );

    if (found) {
      onLogin(found);
    } else {
      setErrorMessage('Username atau Password yang Anda masukkan salah. Pastikan data akun Anda terdaftar!');
    }
    setIsSubmitting(false);
  };

  const handleQuickLogin = (demoUser: User) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password || 'pass123');
    onLogin(demoUser);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top ANBK Style Blue Header */}
      <header className="w-full bg-[#0B56A4] text-white shadow-md">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3.5">
            <Logo url={settings.logoUrl} schoolName={settings.schoolName} className="h-11 w-11 shrink-0" />
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight leading-tight">
                {settings.schoolName}
              </h1>
              <p className="text-xs text-blue-100 font-medium leading-tight">
                Sistem Ujian Online CBT ANBK SMP Fase D
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-blue-900/60 px-3 py-1.5 rounded-lg border border-blue-400/20">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Pusat Ujian Asesmen Nasional</span>
          </div>
        </div>
      </header>

      {/* Main Center Login Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/90 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Card Title & Icon */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-[#0B56A4] border border-blue-100 shadow-sm mb-1">
              <KeyRound className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              MASUK KE UJIAN
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Gunakan Username dan Password yang telah diberikan proktor / terdaftar di Google Spreadsheet
            </p>
          </div>

          {/* Error Feedback */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Username / NISN
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username Anda..."
                  className="w-full pl-10 pr-4 py-3 text-sm font-medium border-2 border-gray-300 rounded-xl focus:border-[#0B56A4] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Password / Kata Sandi
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda..."
                  className="w-full pl-10 pr-11 py-3 text-sm font-medium border-2 border-gray-300 rounded-xl focus:border-[#0B56A4] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0B56A4] hover:bg-[#084282] text-white font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Ujian (Login)</span>
            </button>
          </form>

          {/* Quick Demo Login Switcher (For Evaluation & Demo Convenience) */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Akun Demo Cepat (1-Klik):
              </span>
              {onRefreshUsersFromSheet && settings.googleSheetWebAppUrl && (
                <button
                  type="button"
                  onClick={onRefreshUsersFromSheet}
                  disabled={isLoadingFromSheet}
                  className="text-blue-600 hover:underline"
                >
                  {isLoadingFromSheet ? 'Memuat Sheet...' : 'Sync Sheet'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {users.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickLogin(u)}
                  className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/60 text-left transition-colors text-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {u.role === 'admin' ? 'ADM' : 'SIS'}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-gray-900 block truncate">{u.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {u.role === 'admin' ? 'admin' : u.username}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-200/80 bg-white">
        <p className="font-medium">
          CBT ANBK Matematika SMP Fase D • Dilengkapi Integrasi Google Spreadsheet & Bank Soal TKA
        </p>
      </footer>
    </div>
  );
};
