import { sql } from './db';
import { CompetencyDomainSummary, SkillGap, Course, Assessment, LearningProgress, Notification } from '@/types';

// In a real app, this would use the current user's ID from Clerk
// For now, we fetch data for the first user or return empty arrays
const DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000000";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCompetencyDomainSummaries(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT cd.code as domain, cd.name, 
           COUNT(c.id) as skill_count
    FROM competency_domains cd
    LEFT JOIN competencies c ON c.domain_id = cd.id
    GROUP BY cd.id
  `;
  
  return rows.map(r => ({
    domain: r.domain.toLowerCase(),
    name: r.name,
    averageScore: 0,
    requiredScore: 75,
    gap: 75,
    skillCount: parseInt(r.skill_count),
    criticalGaps: 0
  })) as CompetencyDomainSummary[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getSkillGaps(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT sg.id, c.id as skill_id, c.name as skill_name, cd.code as domain,
           sg.current_level, sg.required_level, sg.priority, sg.reason
    FROM skill_gaps sg
    JOIN skills s ON sg.skill_id = s.id
    JOIN competencies c ON s.competency_id = c.id
    JOIN competency_domains cd ON c.domain_id = cd.id
    WHERE sg.user_id = ${userId}
  `;
  
  return rows.map(r => ({
    id: r.id,
    skillId: r.skill_id,
    skillName: r.skill_name,
    domain: r.domain.toLowerCase(),
    currentLevel: r.current_level,
    requiredLevel: r.required_level,
    gap: r.required_level - r.current_level,
    priority: r.priority,
    reason: r.reason || "Determined by assessment",
    recommendedCourses: [],
    futureDemandWeight: 0.5,
    roleImportanceWeight: 0.5
  })) as SkillGap[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCompetencies(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT c.id, c.name, cd.code as domain, c.description
    FROM competencies c
    JOIN competency_domains cd ON c.domain_id = cd.id
  `;
  
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    domain: r.domain.toLowerCase(),
    description: r.description,
    currentScore: 0,
    requiredScore: 75,
    futureScore: 80,
    confidence: 0,
    gap: 75,
    priority: "MEDIUM",
    evidenceSources: [],
    lastAssessedAt: new Date().toISOString(),
    trend: "stable"
  }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCourses(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT id, title, description, duration_minutes, difficulty,
           provider, language, url
    FROM courses
  `;
  
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description,
    provider: r.provider || "iGOT",
    duration: `${r.duration_minutes} hours`,
    durationHours: Math.round(r.duration_minutes / 60),
    level: r.difficulty || "Beginner",
    competencyIds: [],
    competencyNames: [],
    language: r.language || "English",
    courseUrl: r.url || "#",
    isMock: false,
    rating: 4.5,
    enrolledCount: 0
  })) as Course[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getAssessments(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT a.id, a.title, a.type, a.status, a.duration_minutes, a.difficulty,
           c.id as competency_id, c.name as competency_name
    FROM assessments a
    JOIN competencies c ON a.competency_id = c.id
  `;
  
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    type: r.type,
    status: r.status,
    competencyId: r.competency_id,
    competencyName: r.competency_name,
    questionCount: 10,
    durationMinutes: r.duration_minutes,
    difficulty: r.difficulty || "Medium",
    questions: []
  })) as Assessment[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getLearningProgress(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT lp.id, c.id as course_id, c.title as course_name, c.provider,
           lp.started_at, lp.completed_at, lp.progress_percentage, lp.last_activity_at, lp.learning_minutes
    FROM learning_progress lp
    JOIN courses c ON lp.course_id = c.id
    WHERE lp.user_id = ${userId}
  `;
  
  return rows.map(r => ({
    courseId: r.course_id,
    courseName: r.course_name,
    provider: r.provider,
    startedAt: r.started_at,
    completedAt: r.completed_at,
    progressPercent: r.progress_percentage,
    lastAccessedAt: r.last_activity_at,
    timeSpentMinutes: r.learning_minutes
  })) as LearningProgress[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getNotifications(userId: string = DEFAULT_USER_ID) {
  const rows = await sql`
    SELECT id, type, title, message, created_at as timestamp, read
    FROM notifications
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
  
  return rows.map(r => ({
    id: r.id,
    type: r.type,
    title: r.title,
    message: r.message,
    timestamp: r.timestamp,
    read: r.read,
    actionUrl: ""
  })) as Notification[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCompetencyStats(userId: string = DEFAULT_USER_ID) {
  return {
    overallScore: 0,
    totalSkills: 0,
    criticalGaps: 0,
    highPriorityGaps: 0,
    coursesInProgress: 0,
    assessmentsCompleted: 0,
    learningHours: 0,
    certificationsEarned: 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getDepartments() {
  const rows = await sql`
    SELECT id, name, code, 'AI/ML' as top_gap
    FROM departments
  `;
  
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    code: r.code,
    officialCount: 0,
    avgCompetency: 0,
    topGap: r.top_gap
  }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getConversations() {
  return [];
}
