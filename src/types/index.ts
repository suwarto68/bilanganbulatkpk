export type QuestionType = 'pg' | 'pg_kompleks' | 'menjodohkan' | 'benar_salah';

export type CognitiveLevel = 'L1_Pemahaman' | 'L2_Aplikasi' | 'L3_Penalaran';

export type TopicArea = 'Bilangan Bulat' | 'FPB dan KPK';

export interface MatchingPair {
  id: string;
  premise: string; // Kolom A
  target: string;  // Kolom B yang benar
}

export interface TrueFalseStatement {
  id: string;
  statement: string;
  correctAnswer: 'Benar' | 'Salah';
}

export interface Question {
  id: number;
  number: number;
  type: QuestionType;
  topic: TopicArea;
  level: CognitiveLevel;
  stimulusTitle: string;
  stimulusText: string;
  stimulusImage?: string; // Optional image / diagram / table representation
  questionText: string;
  options?: { key: string; text: string }[]; // For PG & PG Kompleks
  correctAnswer?: string; // For PG ('A', 'B', etc.)
  correctAnswers?: string[]; // For PG Kompleks (['A', 'C'])
  matchingPairs?: MatchingPair[]; // For Menjodohkan
  distractorTargets?: string[]; // Extra choices for matching
  trueFalseStatements?: TrueFalseStatement[]; // For Benar / Salah
  explanation: string;
  weight: number;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: 'siswa' | 'admin' | 'guru';
  kelas: string;
  nisn?: string;
  photoUrl?: string;
  gender?: 'L' | 'P';
}

export interface StudentAnswer {
  questionId: number;
  questionNumber: number;
  isDoubtful: boolean; // Ragu-ragu
  pgAnswer?: string; // e.g. 'B'
  pgKompleksAnswers?: string[]; // e.g. ['A', 'C']
  matchingAnswers?: { [premiseId: string]: string }; // premiseId -> selected target
  trueFalseAnswers?: { [statementId: string]: 'Benar' | 'Salah' };
  isAnswered: boolean;
  scoreObtained?: number;
  maxScore?: number;
  isCorrect?: boolean;
}

export interface ExamResult {
  id: string;
  userId: string;
  username: string;
  studentName: string;
  kelas: string;
  nisn: string;
  startTime: string;
  finishTime: string;
  durationSpentMinutes: number;
  answers: { [questionNumber: number]: StudentAnswer };
  totalScore: number; // 0 - 100
  correctCount: number;
  partialCount: number;
  wrongCount: number;
  levelBreakdown: {
    L1: { score: number; total: number };
    L2: { score: number; total: number };
    L3: { score: number; total: number };
  };
  topicBreakdown: {
    bilanganBulat: { score: number; total: number };
    fpbKpk: { score: number; total: number };
  };
  competencyLevel: 'Perlu Intervensi Khusus' | 'Dasar' | 'Cakap' | 'Mahir';
  syncedToGoogleSheets: boolean;
  syncTimestamp?: string;
}

export interface ExamSettings {
  examTitle: string;
  subjectName: string;
  schoolName: string;
  logoUrl: string;
  durationMinutes: number;
  showScoreToStudent?: boolean;
  showScoreAfterExam?: boolean;
  randomizeQuestions?: boolean;
  shuffleQuestions?: boolean;
  randomizeOptions?: boolean;
  tokenExam: string;
  enableToken: boolean;
  googleSheetWebAppUrl: string;
  googleSheetId?: string;
  minPassingGrade?: number;
  passingGrade?: number;
}
