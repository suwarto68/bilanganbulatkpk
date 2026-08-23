import React, { useState, useEffect, useRef } from 'react';
import { User, Question, ExamResult, StudentAnswer, ExamSettings } from './types';
import { StorageService } from './services/storageService';
import { ScoringService } from './services/scoringService';
import { GoogleSheetsService } from './services/googleSheetsService';
import { Header } from './components/common/Header';
import { LoginView } from './components/auth/LoginView';
import { ExamPreStart } from './components/exam/ExamPreStart';
import { QuestionView } from './components/exam/QuestionView';
import { QuestionNavigation } from './components/exam/QuestionNavigation';
import { QuestionListModal } from './components/exam/QuestionListModal';
import { ExamConfirmModal } from './components/exam/ExamConfirmModal';
import { ExamResultView } from './components/exam/ExamResultView';
import { AdminDashboard } from './components/admin/AdminDashboard';

type AppState = 'login' | 'admin' | 'exam_prestart' | 'exam_active' | 'exam_result';

export default function App() {
  // App state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>('login');
  
  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [settings, setSettings] = useState<ExamSettings>(StorageService.getSettings());

  // Active exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<{ [questionNumber: number]: StudentAnswer }>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(60 * 60);
  const [examStartTime, setExamStartTime] = useState<string>('');
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);
  const [isConfirmFinishOpen, setIsConfirmFinishOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);
  
  // Display preferences
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isLoadingFromSheet, setIsLoadingFromSheet] = useState(false);

  // Timer Ref
  const timerRef = useRef<any>(null);

  // Initial Load
  useEffect(() => {
    const loadedUsers = StorageService.getUsers();
    const loadedQuestions = StorageService.getQuestions();
    const loadedResults = StorageService.getExamResults();
    const loadedSettings = StorageService.getSettings();

    setUsers(loadedUsers);
    setQuestions(loadedQuestions);
    setResults(loadedResults);
    setSettings(loadedSettings);
  }, []);

  // Timer Countdown Effect during exam_active
  useEffect(() => {
    if (appState === 'exam_active') {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [appState, examQuestions, studentAnswers, currentUser]);

  // Handle Login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setAppState('admin');
    } else {
      setAppState('exam_prestart');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentUser(null);
    setAppState('login');
    setActiveResult(null);
    setStudentAnswers({});
    setCurrentIndex(0);
  };

  // Start Exam by Student
  const handleStartExam = () => {
    // Determine questions order
    let preparedQuestions = [...questions];
    if (settings.shuffleQuestions) {
      // Fisher-Yates shuffle
      for (let i = preparedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preparedQuestions[i], preparedQuestions[j]] = [preparedQuestions[j], preparedQuestions[i]];
      }
      // Re-index displayed question numbers
      preparedQuestions = preparedQuestions.map((q, idx) => ({
        ...q,
        number: idx + 1
      }));
    }

    setExamQuestions(preparedQuestions);
    setCurrentIndex(0);
    setStudentAnswers({});
    setTimeRemainingSeconds(settings.durationMinutes * 60);
    setExamStartTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setAppState('exam_active');
  };

  // Update Answer for a Question
  const handleUpdateCurrentAnswer = (updatedData: Partial<StudentAnswer>) => {
    const activeQuestion = examQuestions[currentIndex];
    if (!activeQuestion) return;

    const currentAnswer = studentAnswers[activeQuestion.number] || {
      questionId: activeQuestion.id,
      questionNumber: activeQuestion.number,
      isAnswered: false,
      isDoubtful: false
    };

    const newAnswer: StudentAnswer = {
      ...currentAnswer,
      ...updatedData
    };

    setStudentAnswers((prev) => ({
      ...prev,
      [activeQuestion.number]: newAnswer
    }));
  };

  // Toggle Doubtful (Ragu-ragu)
  const handleToggleDoubtful = () => {
    const activeQuestion = examQuestions[currentIndex];
    if (!activeQuestion) return;

    const currentAnswer = studentAnswers[activeQuestion.number] || {
      questionId: activeQuestion.id,
      questionNumber: activeQuestion.number,
      isAnswered: false,
      isDoubtful: false
    };

    const newDoubtfulState = !currentAnswer.isDoubtful;
    handleUpdateCurrentAnswer({ isDoubtful: newDoubtfulState });
  };

  // Auto-finish on Timer Expiry
  const handleAutoFinishExam = () => {
    alert('Waktu ujian telah habis! Jawaban Anda akan otomatis dikumpulkan dan dinilai oleh sistem.');
    handleCompleteExam();
  };

  // Complete & Submit Exam
  const handleCompleteExam = async () => {
    if (!currentUser) return;
    setIsSubmitting(true);

    const durationSpentMinutes = Math.max(
      1,
      Math.round((settings.durationMinutes * 60 - timeRemainingSeconds) / 60)
    );

    const evaluatedResult = ScoringService.evaluateFullExam(
      examQuestions,
      studentAnswers,
      currentUser,
      settings,
      examStartTime,
      durationSpentMinutes
    );

    // Save locally
    StorageService.saveExamResult(evaluatedResult);
    setResults((prev) => [evaluatedResult, ...prev]);
    setActiveResult(evaluatedResult);
    setIsConfirmFinishOpen(false);
    setIsSubmitting(false);

    // Transition to result view
    setAppState('exam_result');
  };

  // Refresh Users from Google Spreadsheet
  const handleRefreshUsersFromSheet = async () => {
    if (!settings.googleSheetWebAppUrl) return;
    setIsLoadingFromSheet(true);
    const res = await GoogleSheetsService.fetchUsersFromSheet(settings.googleSheetWebAppUrl);
    if (res.success && res.users && res.users.length > 0) {
      setUsers(res.users);
      StorageService.saveUsers(res.users);
    }
    setIsLoadingFromSheet(false);
  };

  // Admin User Handlers
  const handleAddUser = (user: User) => {
    const updated = [...users, user];
    setUsers(updated);
    StorageService.saveUsers(updated);
  };

  const handleUpdateUser = (user: User) => {
    const updated = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updated);
    StorageService.saveUsers(updated);
  };

  const handleDeleteUser = (userId: string) => {
    const updated = users.filter((u) => u.id !== userId);
    setUsers(updated);
    StorageService.saveUsers(updated);
  };

  const handleBulkUpdateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    StorageService.saveUsers(newUsers);
  };

  // Admin Result Handlers
  const handleDeleteResult = (id: string) => {
    StorageService.deleteExamResult(id);
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAllResults = () => {
    StorageService.clearAllExamResults();
    setResults([]);
  };

  // Admin Settings Handler
  const handleSaveSettings = (newSettings: ExamSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  // Count answered questions
  const answeredCount = Object.values(studentAnswers).filter((a: StudentAnswer) => a?.isAnswered).length;
  const currentQuestion = examQuestions[currentIndex] || examQuestions[0];
  const currentStudentAnswer = currentQuestion ? studentAnswers[currentQuestion.number] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-gray-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. LOGIN VIEW */}
      {appState === 'login' && (
        <LoginView
          users={users}
          settings={settings}
          onLogin={handleLogin}
          onRefreshUsersFromSheet={handleRefreshUsersFromSheet}
          isLoadingFromSheet={isLoadingFromSheet}
        />
      )}

      {/* 2. ADMIN PORTAL VIEW */}
      {appState === 'admin' && currentUser && (
        <AdminDashboard
          currentUser={currentUser}
          users={users}
          results={results}
          questions={questions}
          settings={settings}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          onBulkUpdateUsers={handleBulkUpdateUsers}
          onDeleteResult={handleDeleteResult}
          onClearAllResults={handleClearAllResults}
          onSaveSettings={handleSaveSettings}
          onStartStudentSimulation={() => {
            handleStartExam();
          }}
          onLogout={handleLogout}
        />
      )}

      {/* 3. STUDENT CONFIRMATION / PRE-START VIEW */}
      {appState === 'exam_prestart' && currentUser && (
        <div className="min-h-screen flex flex-col">
          <Header
            settings={settings}
            user={currentUser}
            onLogout={handleLogout}
            isAdmin={false}
          />
          <ExamPreStart
            user={currentUser}
            settings={settings}
            totalQuestions={questions.length}
            onStartExam={handleStartExam}
          />
        </div>
      )}

      {/* 4. ACTIVE CBT ANBK EXAM VIEW */}
      {appState === 'exam_active' && currentUser && currentQuestion && (
        <div className="min-h-screen flex flex-col">
          {/* Header with ANBK Timer, Font Controls, and Fullscreen */}
          <Header
            settings={settings}
            user={currentUser}
            timeRemainingSeconds={timeRemainingSeconds}
            fontSize={fontSize}
            onChangeFontSize={setFontSize}
            isAdmin={false}
          />

          {/* Core Question & Stimulus View */}
          <QuestionView
            question={currentQuestion}
            totalQuestions={examQuestions.length}
            answer={currentStudentAnswer}
            onUpdateAnswer={handleUpdateCurrentAnswer}
            fontSize={fontSize}
            answeredCount={answeredCount}
          />

          {/* Bottom Toolbar: Prev (Red), Ragu-ragu (Yellow), Next/Finish (Blue) */}
          <QuestionNavigation
            currentIndex={currentIndex}
            totalQuestions={examQuestions.length}
            isDoubtful={Boolean(currentStudentAnswer?.isDoubtful)}
            isAnswered={Boolean(currentStudentAnswer?.isAnswered)}
            onToggleDoubtful={handleToggleDoubtful}
            onPrevQuestion={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            onNextQuestion={() => setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
            onOpenQuestionList={() => setIsQuestionListOpen(true)}
            onFinishExamPrompt={() => setIsConfirmFinishOpen(true)}
          />

          {/* Question Matrix Popover / Modal (1 to 35) */}
          <QuestionListModal
            isOpen={isQuestionListOpen}
            onClose={() => setIsQuestionListOpen(false)}
            questions={examQuestions}
            answers={studentAnswers}
            currentIndex={currentIndex}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
            onFinishPrompt={() => setIsConfirmFinishOpen(true)}
          />

          {/* Exam Finish Confirmation Modal with ANBK Checks */}
          <ExamConfirmModal
            isOpen={isConfirmFinishOpen}
            onClose={() => setIsConfirmFinishOpen(false)}
            onConfirmFinish={handleCompleteExam}
            questions={examQuestions}
            answers={studentAnswers}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* 5. EXAM RESULT / SCORE CERTIFICATE VIEW */}
      {appState === 'exam_result' && activeResult && (
        <div className="min-h-screen flex flex-col">
          <Header
            settings={settings}
            user={currentUser || undefined}
            onLogout={handleLogout}
            isAdmin={false}
          />
          <ExamResultView
            result={activeResult}
            questions={questions}
            settings={settings}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
}
