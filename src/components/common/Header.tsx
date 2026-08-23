import React from 'react';
import { User, ExamSettings } from '../../types';
import { Logo } from './Logo';
import { LogOut, Maximize2, Minimize2, User as UserIcon, Clock, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  settings: ExamSettings;
  onLogout: () => void;
  timeRemainingSeconds?: number;
  showTimer?: boolean;
  fontSize?: 'sm' | 'md' | 'lg';
  onChangeFontSize?: (size: 'sm' | 'md' | 'lg') => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  titleOverride?: string;
  subtitleOverride?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  settings,
  onLogout,
  timeRemainingSeconds,
  showTimer = false,
  fontSize = 'md',
  onChangeFontSize,
  isFullscreen = false,
  onToggleFullscreen,
  titleOverride,
  subtitleOverride
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = timeRemainingSeconds !== undefined && timeRemainingSeconds <= 300 && timeRemainingSeconds > 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B56A4] text-white shadow-md select-none">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-3 md:px-6">
        {/* Left: Logo & School/Exam Info */}
        <div className="flex items-center gap-3">
          <Logo url={settings.logoUrl} schoolName={settings.schoolName} className="h-11 w-11 shrink-0" />
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight md:text-base leading-tight">
              {titleOverride || settings.schoolName}
            </h1>
            <p className="text-xs text-blue-100 font-medium leading-tight">
              {subtitleOverride || `${settings.examTitle} • ${settings.subjectName}`}
            </p>
          </div>
        </div>

        {/* Center/Right: Timer (if in exam) */}
        {showTimer && timeRemainingSeconds !== undefined && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-sm md:text-base font-bold shadow-inner ${
                isLowTime
                  ? 'bg-amber-500 text-gray-900 animate-pulse ring-2 ring-white'
                  : 'bg-blue-900/80 text-white border border-blue-400/30'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="tracking-wider">{formatTime(timeRemainingSeconds)}</span>
            </div>
          </div>
        )}

        {/* Right: Controls & User Info */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Font Resizer (ANBK standard) */}
          {onChangeFontSize && (
            <div className="hidden sm:flex items-center rounded-md bg-blue-950/60 p-0.5 border border-blue-400/20 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onChangeFontSize('sm')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'sm' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'
                }`}
                title="Ukuran Tulisan Kecil"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeFontSize('md')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'md' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'
                }`}
                title="Ukuran Tulisan Sedang"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeFontSize('lg')}
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'lg' ? 'bg-white text-blue-900 shadow-sm' : 'text-blue-200 hover:text-white'
                }`}
                title="Ukuran Tulisan Besar"
              >
                A+
              </button>
            </div>
          )}

          {/* Fullscreen Button */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="hidden md:flex items-center justify-center p-2 rounded-md bg-blue-950/40 hover:bg-blue-900 text-blue-100 hover:text-white transition-colors"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {/* User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-2 md:gap-3 pl-2 border-l border-blue-400/30">
              <div className="relative">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-300 shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-800 text-blue-100 flex items-center justify-center ring-2 ring-blue-300">
                    <UserIcon className="w-5 h-5" />
                  </div>
                )}
                {user.role === 'admin' && (
                  <span
                    title="Administrator"
                    className="absolute -bottom-1 -right-1 bg-amber-400 text-blue-950 rounded-full p-0.5"
                  >
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold truncate max-w-[140px] text-white">
                  {user.name}
                </span>
                <span className="text-[11px] text-blue-200 font-medium">
                  {user.role === 'admin' ? 'Admin CBT' : `${user.kelas} • NISN: ${user.nisn || '-'}`}
                </span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium transition-colors shadow-sm ml-1"
                title="Keluar dari Akun"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
