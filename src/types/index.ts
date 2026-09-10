export interface User {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  currentAssignment: string;
  education: string;
  experience: string;
  previousTraining: string;
  currentRole: string;
  careerGoal: string;
  avatarUrl?: string;
}

export interface Competency {
  id: string;
  name: string;
  domain: CompetencyDomain;
  description: string;
  currentScore: number;
  requiredScore: number;
  futureScore: number;
  confidence: number;
  gap: number;
  priority: Priority;
  evidenceSources: string[];
  lastAssessedAt: string;
  trend: "improving" | "stable" | "declining";
}

export type CompetencyDomain = "statistical" | "technical" | "digital_governance" | "managerial";

export type Priority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "OK";

export interface SkillGap {
  id: string;
  skillId: string;
  skillName: string;
  domain: CompetencyDomain;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: Priority;
  reason: string;
  recommendedCourses: string[];
  futureDemandWeight: number;
  roleImportanceWeight: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: "iGOT" | "TPAC" | "INTERNAL";
  duration: string;
  durationHours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  competencyIds: string[];
  competencyNames: string[];
  language: string;
  courseUrl: string;
  isMock: boolean;
  rating: number;
  enrolledCount: number;
  whyRecommended?: string;
  skillImpact?: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: "diagnostic" | "adaptive" | "practice" | "certification" | "recommended";
  status: "upcoming" | "in_progress" | "completed" | "recommended";
  competencyId: string;
  competencyName: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  score?: number;
  passed?: boolean;
  completedAt?: string;
  questions: Question[];
  reason?: string;
}

export interface Question {
  id: string;
  text: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  sourceChunkId?: string;
  sourcePage?: number;
  difficulty: "easy" | "medium" | "hard";
  competencyId: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  answers: Answer[];
  score: number;
  correctCount: number;
  incorrectCount: number;
  timeTakenSeconds: number;
  competencyImpacts: CompetencyImpact[];
}

export interface Answer {
  questionId: string;
  selectedAnswer: "A" | "B" | "C" | "D";
  isCorrect: boolean;
  timeTakenSeconds: number;
}

export interface CompetencyImpact {
  competencyName: string;
  beforeScore: number;
  afterScore: number;
  improvement: number;
}

export interface LearningProgress {
  courseId: string;
  courseName: string;
  provider: string;
  startedAt: string;
  completedAt?: string;
  progressPercent: number;
  lastAccessedAt: string;
  timeSpentMinutes: number;
}

export interface Notification {
  id: string;
  type: "course_recommendation" | "assessment_result" | "competency_update" | "new_training" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  officialCount: number;
  avgCompetency: number;
  topGap: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: { title: string; page: number; chunk: string }[];
  context?: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
}

export interface CompetencyDomainSummary {
  domain: CompetencyDomain;
  name: string;
  averageScore: number;
  requiredScore: number;
  gap: number;
  skillCount: number;
  criticalGaps: number;
}
