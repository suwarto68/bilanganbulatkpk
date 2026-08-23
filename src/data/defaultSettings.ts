import { ExamSettings } from '../types';

export const defaultSettings: ExamSettings = {
  examTitle: 'ASESMEN KOMPETENSI MATEMATIKA (CBT ANBK)',
  subjectName: 'Matematika Fase D (SMP)',
  schoolName: 'SMP NEGERI 1 WONOGIRI',
  logoUrl: 'https://ibb.co.com/S4095CCm',
  durationMinutes: 60,
  showScoreToStudent: true,
  randomizeQuestions: false,
  randomizeOptions: false,
  tokenExam: 'MAT-2026',
  enableToken: false,
  googleSheetWebAppUrl: '',
  googleSheetId: '',
  minPassingGrade: 75
};
