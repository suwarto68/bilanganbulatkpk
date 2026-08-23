import { Question, StudentAnswer, ExamResult, User, ExamSettings } from '../types';

export interface ScoreCalculationResult {
  totalScore: number;
  totalMaxScore: number;
  scaledScore: number; // 0 - 100
  correctCount: number;
  partialCount: number;
  wrongCount: number;
  scoredAnswers: { [questionNumber: number]: StudentAnswer };
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
}

export function evaluateStudentAnswer(
  question: Question,
  rawAnswer: StudentAnswer | undefined
): { score: number; maxScore: number; isCorrect: boolean; isPartial: boolean } {
  const maxScore = question.weight || 3.0;

  if (!rawAnswer || !rawAnswer.isAnswered) {
    return { score: 0, maxScore, isCorrect: false, isPartial: false };
  }

  let score = 0;
  let isCorrect = false;
  let isPartial = false;

  switch (question.type) {
    case 'pg': {
      if (rawAnswer.pgAnswer && rawAnswer.pgAnswer === question.correctAnswer) {
        score = maxScore;
        isCorrect = true;
      }
      break;
    }

    case 'pg_kompleks': {
      const correctSet = new Set(question.correctAnswers || []);
      const studentSet = new Set(rawAnswer.pgKompleksAnswers || []);

      if (studentSet.size === 0) {
        score = 0;
        break;
      }

      let correctChosen = 0;
      let incorrectChosen = 0;

      studentSet.forEach(ans => {
        if (correctSet.has(ans)) {
          correctChosen++;
        } else {
          incorrectChosen++;
        }
      });

      if (correctChosen === correctSet.size && incorrectChosen === 0) {
        score = maxScore;
        isCorrect = true;
      } else if (correctChosen > 0 && incorrectChosen === 0) {
        score = (correctChosen / correctSet.size) * maxScore * 0.75;
        isPartial = true;
      } else if (correctChosen > 0 && incorrectChosen < correctChosen) {
        score = Math.max(0, ((correctChosen - incorrectChosen) / correctSet.size) * maxScore * 0.5);
        isPartial = score > 0;
      }
      break;
    }

    case 'menjodohkan': {
      const pairs = question.matchingPairs || [];
      if (pairs.length === 0) break;

      const studentPairs = rawAnswer.matchingAnswers || {};
      let correctMatches = 0;

      pairs.forEach(pair => {
        if (studentPairs[pair.id] && studentPairs[pair.id] === pair.target) {
          correctMatches++;
        }
      });

      score = (correctMatches / pairs.length) * maxScore;
      if (correctMatches === pairs.length) {
        isCorrect = true;
      } else if (correctMatches > 0) {
        isPartial = true;
      }
      break;
    }

    case 'benar_salah': {
      const statements = question.trueFalseStatements || [];
      if (statements.length === 0) break;

      const studentTF = rawAnswer.trueFalseAnswers || {};
      let correctStatements = 0;

      statements.forEach(st => {
        if (studentTF[st.id] && studentTF[st.id] === st.correctAnswer) {
          correctStatements++;
        }
      });

      score = (correctStatements / statements.length) * maxScore;
      if (correctStatements === statements.length) {
        isCorrect = true;
      } else if (correctStatements > 0) {
        isPartial = true;
      }
      break;
    }
  }

  return {
    score: Math.round(score * 100) / 100,
    maxScore: Math.round(maxScore * 100) / 100,
    isCorrect,
    isPartial
  };
}

export function calculateExamScore(
  questions: Question[],
  rawAnswers: { [questionNumber: number]: StudentAnswer }
): ScoreCalculationResult {
  let totalScoreObtained = 0;
  let totalMaxScore = 0;
  let correctCount = 0;
  let partialCount = 0;
  let wrongCount = 0;

  const scoredAnswers: { [questionNumber: number]: StudentAnswer } = {};

  const levelBreakdown = {
    L1: { score: 0, total: 0 },
    L2: { score: 0, total: 0 },
    L3: { score: 0, total: 0 }
  };

  const topicBreakdown = {
    bilanganBulat: { score: 0, total: 0 },
    fpbKpk: { score: 0, total: 0 }
  };

  questions.forEach(q => {
    const raw = rawAnswers[q.number];
    const evalRes = evaluateStudentAnswer(q, raw);

    totalScoreObtained += evalRes.score;
    totalMaxScore += evalRes.maxScore;

    if (evalRes.isCorrect) {
      correctCount++;
    } else if (evalRes.isPartial) {
      partialCount++;
    } else {
      wrongCount++;
    }

    // Breakdown by level
    if (q.level === 'L1_Pemahaman') {
      levelBreakdown.L1.score += evalRes.score;
      levelBreakdown.L1.total += evalRes.maxScore;
    } else if (q.level === 'L2_Aplikasi') {
      levelBreakdown.L2.score += evalRes.score;
      levelBreakdown.L2.total += evalRes.maxScore;
    } else if (q.level === 'L3_Penalaran') {
      levelBreakdown.L3.score += evalRes.score;
      levelBreakdown.L3.total += evalRes.maxScore;
    }

    // Breakdown by topic
    if (q.topic === 'Bilangan Bulat') {
      topicBreakdown.bilanganBulat.score += evalRes.score;
      topicBreakdown.bilanganBulat.total += evalRes.maxScore;
    } else {
      topicBreakdown.fpbKpk.score += evalRes.score;
      topicBreakdown.fpbKpk.total += evalRes.maxScore;
    }

    scoredAnswers[q.number] = {
      ...(raw || {
        questionId: q.id,
        questionNumber: q.number,
        isDoubtful: false,
        isAnswered: false
      }),
      scoreObtained: evalRes.score,
      maxScore: evalRes.maxScore,
      isCorrect: evalRes.isCorrect
    };
  });

  const scaledScore = totalMaxScore > 0
    ? Math.min(100, Math.max(0, Math.round((totalScoreObtained / totalMaxScore) * 100)))
    : 0;

  let competencyLevel: 'Perlu Intervensi Khusus' | 'Dasar' | 'Cakap' | 'Mahir' = 'Dasar';
  if (scaledScore >= 85) {
    competencyLevel = 'Mahir';
  } else if (scaledScore >= 70) {
    competencyLevel = 'Cakap';
  } else if (scaledScore >= 50) {
    competencyLevel = 'Dasar';
  } else {
    competencyLevel = 'Perlu Intervensi Khusus';
  }

  return {
    totalScore: Math.round(totalScoreObtained * 10) / 10,
    totalMaxScore: Math.round(totalMaxScore * 10) / 10,
    scaledScore,
    correctCount,
    partialCount,
    wrongCount,
    scoredAnswers,
    levelBreakdown,
    topicBreakdown,
    competencyLevel
  };
}

export function buildExamResult(
  user: User,
  questions: Question[],
  rawAnswers: { [questionNumber: number]: StudentAnswer },
  startTime: string,
  finishTime: string,
  durationSpentMinutes: number
): ExamResult {
  const scoreResult = calculateExamScore(questions, rawAnswers);

  return {
    id: `res_${Date.now()}_${user.id}`,
    userId: user.id,
    username: user.username,
    studentName: user.name,
    kelas: user.kelas,
    nisn: user.nisn || '-',
    startTime,
    finishTime,
    durationSpentMinutes,
    answers: scoreResult.scoredAnswers,
    totalScore: scoreResult.scaledScore,
    correctCount: scoreResult.correctCount,
    partialCount: scoreResult.partialCount,
    wrongCount: scoreResult.wrongCount,
    levelBreakdown: scoreResult.levelBreakdown,
    topicBreakdown: scoreResult.topicBreakdown,
    competencyLevel: scoreResult.competencyLevel,
    syncedToGoogleSheets: false
  };
}

export const ScoringService = {
  evaluateStudentAnswer,
  calculateExamScore,
  buildExamResult,
  evaluateFullExam(
    questions: Question[],
    rawAnswers: { [questionNumber: number]: StudentAnswer },
    user: User,
    settings: ExamSettings,
    startTime: string,
    durationSpentMinutes: number
  ): ExamResult {
    const finishTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return buildExamResult(user, questions, rawAnswers, startTime, finishTime, durationSpentMinutes);
  }
};
