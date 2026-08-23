import React, { useState } from 'react';
import { User, ExamSettings } from '../../types';
import { UserPlus, Upload, Download, RefreshCw, Trash2, Edit, Search, Shield, UserCheck, FileSpreadsheet, Check, AlertCircle, X } from 'lucide-react';
import { GoogleSheetsService } from '../../services/googleSheetsService';

interface UserManagementProps {
  users: User[];
  settings: ExamSettings;
  onAddUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onBulkUpdateUsers: (users: User[]) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  settings,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onBulkUpdateUsers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'siswa' | 'admin'>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; message?: string; success?: boolean }>({
    loading: false
  });

  // Form State
  const [formName, setFormName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('pass123');
  const [formRole, setFormRole] = useState<'siswa' | 'admin'>('siswa');
  const [formKelas, setFormKelas] = useState('VII-A');
  const [formNisn, setFormNisn] = useState('');
  const [formGender, setFormGender] = useState<'L' | 'P'>('L');

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.nisn && u.nisn.includes(searchTerm));
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchClass = filterClass === 'all' || u.kelas === filterClass;
    return matchSearch && matchRole && matchClass;
  });

  const availableClasses = Array.from(new Set(users.map((u) => u.kelas))).filter(Boolean);

  const openAddModal = () => {
    setEditingUser(null);
    setFormName('');
    setFormUsername('');
    setFormPassword('pass123');
    setFormRole('siswa');
    setFormKelas('VII-A');
    setFormNisn('');
    setFormGender('L');
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormUsername(user.username);
    setFormPassword(user.password || 'pass123');
    setFormRole(user.role === 'admin' ? 'admin' : 'siswa');
    setFormKelas(user.kelas);
    setFormNisn(user.nisn || '');
    setFormGender(user.gender || 'L');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUsername.trim() || !formName.trim()) return;

    if (editingUser) {
      onUpdateUser({
        ...editingUser,
        name: formName.trim(),
        username: formUsername.trim(),
        password: formPassword.trim(),
        role: formRole,
        kelas: formKelas.trim(),
        nisn: formNisn.trim(),
        gender: formGender
      });
    } else {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: formName.trim(),
        username: formUsername.trim(),
        password: formPassword.trim(),
        role: formRole,
        kelas: formKelas.trim(),
        nisn: formNisn.trim(),
        gender: formGender,
        photoUrl:
          formGender === 'P'
            ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80'
            : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80'
      };
      onAddUser(newUser);
    }
    setIsModalOpen(false);
  };

  const handleSyncToSheets = async () => {
    if (!settings.googleSheetWebAppUrl) {
      setSyncStatus({
        loading: false,
        success: false,
        message: 'URL Google Apps Script belum diatur di menu Pengaturan.'
      });
      return;
    }
    setSyncStatus({ loading: true });
    const res = await GoogleSheetsService.syncUsersToSheet(users, settings.googleSheetWebAppUrl);
    setSyncStatus({
      loading: false,
      success: res.success,
      message: res.message
    });
  };

  const handleFetchFromSheets = async () => {
    if (!settings.googleSheetWebAppUrl) {
      setSyncStatus({
        loading: false,
        success: false,
        message: 'URL Google Apps Script belum diatur di menu Pengaturan.'
      });
      return;
    }
    setSyncStatus({ loading: true });
    const res = await GoogleSheetsService.fetchUsersFromSheet(settings.googleSheetWebAppUrl);
    if (res.success && res.users && res.users.length > 0) {
      onBulkUpdateUsers(res.users);
      setSyncStatus({
        loading: false,
        success: true,
        message: `Berhasil mengimpor ${res.users.length} pengguna dari sheet UserLogin!`
      });
    } else {
      setSyncStatus({
        loading: false,
        success: false,
        message: res.message
      });
    }
  };

  const exportCSV = () => {
    const headers = ['Username', 'Password', 'Nama Lengkap', 'Role', 'Kelas', 'NISN', 'Jenis Kelamin'];
    const rows = users.map((u) => [
      u.username,
      u.password || 'pass123',
      u.name,
      u.role,
      u.kelas,
      u.nisn || '',
      u.gender || 'L'
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UserLogin_CBT_ANBK_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Data Pengguna & Peserta Ujian (Sheet: UserLogin)
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Kelola akun login siswa dan administrator CBT yang tersinkronisasi dengan Google Spreadsheet.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B56A4] hover:bg-blue-800 text-white text-xs font-bold shadow transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Pengguna</span>
          </button>

          <button
            type="button"
            onClick={handleSyncToSheets}
            disabled={syncStatus.loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{syncStatus.loading ? 'Menyinkronkan...' : 'Kirim ke Sheet'}</span>
          </button>

          <button
            type="button"
            onClick={handleFetchFromSheets}
            disabled={syncStatus.loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tarik dari Sheet</span>
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold border border-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatus.message && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 ${
            syncStatus.success
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {syncStatus.success ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
            <span>{syncStatus.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setSyncStatus({ loading: false })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, username, NISN..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#0B56A4] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white font-medium text-gray-700 outline-none"
          >
            <option value="all">Semua Peran</option>
            <option value="siswa">Siswa</option>
            <option value="admin">Administrator</option>
          </select>

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white font-medium text-gray-700 outline-none"
          >
            <option value="all">Semua Kelas</option>
            {availableClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B56A4] text-white font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Lengkap</th>
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Password</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">NISN</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-semibold">
                    Tidak ada data pengguna yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 flex items-center gap-2.5">
                      {u.photoUrl ? (
                        <img
                          src={u.photoUrl}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover border border-gray-200 shrink-0"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {u.name.charAt(0)}
                        </div>
                      )}
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-900">{u.username}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{u.password || 'pass123'}</td>
                    <td className="py-3 px-4">
                      {u.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          <UserCheck className="w-3 h-3" /> Siswa
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold">{u.kelas}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{u.nisn || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(u)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-900 transition-colors"
                          title="Edit Pengguna"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus pengguna "${u.name}"?`)) {
                              onDeleteUser(u.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-700 transition-colors"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between bg-[#0B56A4] px-5 py-4 text-white">
              <h3 className="font-bold text-sm sm:text-base">
                {editingUser ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-blue-800 text-blue-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="block font-bold text-gray-700 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Username</label>
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="siswa06"
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Password</label>
                  <input
                    type="text"
                    required
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="pass123"
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Peran / Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none bg-white font-medium"
                  >
                    <option value="siswa">Siswa</option>
                    <option value="admin">Administrator / Proktor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Kelas</label>
                  <input
                    type="text"
                    value={formKelas}
                    onChange={(e) => setFormKelas(e.target.value)}
                    placeholder="VII-A"
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">NISN</label>
                  <input
                    type="text"
                    value={formNisn}
                    onChange={(e) => setFormNisn(e.target.value)}
                    placeholder="0098472195"
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none focus:border-[#0B56A4]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Jenis Kelamin</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl outline-none bg-white font-medium"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B56A4] hover:bg-blue-800 text-white font-bold shadow"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
