import { User, Question, ExamResult, ExamSettings, StudentAnswer } from '../types';
import { initialUsers } from '../data/initialUsers';
import { questionsData } from '../data/questionsData';
import { defaultSettings } from '../data/defaultSettings';

const STORAGE_KEYS = {
  USERS: 'cbt_anbk_users',
  QUESTIONS: 'cbt_anbk_questions',
  RESULTS: 'cbt_anbk_results',
  SETTINGS: 'cbt_anbk_settings',
  ACTIVE_SESSION: 'cbt_anbk_active_session',
  CURRENT_USER: 'cbt_anbk_current_user'
};

export interface ActiveExamSession {
  user: User;
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [questionNumber: number]: StudentAnswer };
  startTime: string;
  timeRemainingSeconds: number;
  isStarted: boolean;
}

export const StorageService = {
  // Users
  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
        return initialUsers;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load users from localStorage:', e);
      return initialUsers;
    }
  },

  saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  },

  updateUser(updated: User): void {
    const users = this.getUsers().map(u => (u.id === updated.id ? updated : u));
    this.saveUsers(users);
  },

  deleteUser(userId: string): void {
    const users = this.getUsers().filter(u => u.id !== userId);
    this.saveUsers(users);
  },

  // Questions
  getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questionsData));
        return questionsData;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load questions:', e);
      return questionsData;
    }
  },

  saveQuestions(questions: Question[]): void {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  },

  resetQuestionsToDefault(): Question[] {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questionsData));
    return questionsData;
  },

  // Results
  getResults(): ExamResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load results:', e);
      return [];
    }
  },

  getExamResults(): ExamResult[] {
    return this.getResults();
  },

  saveResult(result: ExamResult): void {
    const results = this.getResults();
    const idx = results.findIndex(r => r.id === result.id);
    if (idx >= 0) {
      results[idx] = result;
    } else {
      results.unshift(result);
    }
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  },

  saveExamResult(result: ExamResult): void {
    this.saveResult(result);
  },

  deleteResult(resultId: string): void {
    const results = this.getResults().filter(r => r.id !== resultId);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  },

  deleteExamResult(resultId: string): void {
    this.deleteResult(resultId);
  },

  clearAllResults(): void {
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
  },

  clearAllExamResults(): void {
    this.clearAllResults();
  },

  // Settings
  getSettings(): ExamSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
      return { ...defaultSettings, ...JSON.parse(data) };
    } catch (e) {
      console.error('Failed to load settings:', e);
      return defaultSettings;
    }
  },

  saveSettings(settings: ExamSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Current Session & Auth
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Active Exam State (Auto-save)
  getActiveExamSession(): ActiveExamSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveActiveExamSession(session: ActiveExamSession): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
  },

  clearActiveExamSession(): void {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }
};
