import { User } from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr_admin',
    username: 'admin',
    password: 'admin123',
    name: 'Drs. Supriyanto, M.Pd.',
    role: 'admin',
    kelas: 'Administrator CBT',
    nisn: '197805122005011003',
    gender: 'L',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    id: 'usr_01',
    username: 'siswa01',
    password: 'pass123',
    name: 'Ahmad Fauzan Pratama',
    role: 'siswa',
    kelas: 'VII-A',
    nisn: '0098472190',
    gender: 'L',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    id: 'usr_02',
    username: 'siswa02',
    password: 'pass123',
    name: 'Nabila Azzahra Putri',
    role: 'siswa',
    kelas: 'VII-A',
    nisn: '0098472191',
    gender: 'P',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    id: 'usr_03',
    username: 'siswa03',
    password: 'pass123',
    name: 'Muhammad Rizky Ramadhan',
    role: 'siswa',
    kelas: 'VII-B',
    nisn: '0098472192',
    gender: 'L',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    id: 'usr_04',
    username: 'siswa04',
    password: 'pass123',
    name: 'Siti Rahmawati Dewi',
    role: 'siswa',
    kelas: 'VII-B',
    nisn: '0098472193',
    gender: 'P',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    id: 'usr_05',
    username: 'siswa05',
    password: 'pass123',
    name: 'Bintang Perkasa Aditama',
    role: 'siswa',
    kelas: 'VII-C',
    nisn: '0098472194',
    gender: 'L',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80'
  }
];
