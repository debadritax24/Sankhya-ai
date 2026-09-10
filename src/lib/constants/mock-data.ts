import type {
  User,
  Competency,
  SkillGap,
  Course,
  Assessment,
  LearningProgress,
  Notification,
  Department,
  ConversationMessage,
  CompetencyDomainSummary,
} from "@/types";

export const currentUser: User = {
  id: "user-001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@gov.in",
  designation: "Senior Statistical Officer",
  department: "Ministry of Statistics & Programme Implementation",
  currentAssignment: "National Sample Survey Office",
  education: "M.Sc. Statistics, MCA",
  experience: "12 years",
  previousTraining: "Sampling Methods (NSSTA), Python Basics (iGOT), Data Analysis with R",
  currentRole: "Statistical Officer",
  careerGoal: "Senior Analyst — Data Science Division",
};

export const competencies: Competency[] = [
  { id: "comp-001", name: "Python", domain: "technical", description: "Python programming for statistical analysis and data processing", currentScore: 45, requiredScore: 80, futureScore: 85, confidence: 0.87, gap: 35, priority: "HIGH", evidenceSources: ["diagnostic_assessment", "training_history"], lastAssessedAt: "2026-09-05", trend: "improving" },
  { id: "comp-002", name: "SQL", domain: "technical", description: "Database querying and data management", currentScore: 70, requiredScore: 75, futureScore: 80, confidence: 0.92, gap: 5, priority: "LOW", evidenceSources: ["assessment", "course_completion"], lastAssessedAt: "2026-09-08", trend: "improving" },
  { id: "comp-003", name: "Survey Design", domain: "statistical", description: "Questionnaire design and sampling methodology", currentScore: 65, requiredScore: 75, futureScore: 80, confidence: 0.85, gap: 10, priority: "MEDIUM", evidenceSources: ["diagnostic_assessment", "work_experience"], lastAssessedAt: "2026-09-01", trend: "stable" },
  { id: "comp-004", name: "Data Visualization", domain: "technical", description: "Creating effective data visualizations and dashboards", currentScore: 60, requiredScore: 70, futureScore: 75, confidence: 0.80, gap: 10, priority: "MEDIUM", evidenceSources: ["training_history"], lastAssessedAt: "2026-08-28", trend: "improving" },
  { id: "comp-005", name: "AI/ML", domain: "technical", description: "Machine learning and AI for statistical applications", currentScore: 24, requiredScore: 60, futureScore: 82, confidence: 0.65, gap: 36, priority: "CRITICAL", evidenceSources: ["profile_inference"], lastAssessedAt: "2026-08-15", trend: "stable" },
  { id: "comp-006", name: "Sampling", domain: "statistical", description: "Advanced sampling techniques and methodologies", currentScore: 72, requiredScore: 80, futureScore: 85, confidence: 0.90, gap: 8, priority: "LOW", evidenceSources: ["diagnostic_assessment", "work_experience"], lastAssessedAt: "2026-09-03", trend: "improving" },
  { id: "comp-007", name: "National Accounts", domain: "statistical", description: "National income accounting and GDP estimation", currentScore: 68, requiredScore: 75, futureScore: 78, confidence: 0.88, gap: 7, priority: "LOW", evidenceSources: ["assessment"], lastAssessedAt: "2026-09-02", trend: "stable" },
  { id: "comp-008", name: "R Programming", domain: "technical", description: "R language for statistical computing", currentScore: 55, requiredScore: 70, futureScore: 75, confidence: 0.82, gap: 15, priority: "MEDIUM", evidenceSources: ["training_history", "assessment"], lastAssessedAt: "2026-08-30", trend: "improving" },
  { id: "comp-009", name: "Leadership", domain: "managerial", description: "Team leadership and project management", currentScore: 75, requiredScore: 75, futureScore: 80, confidence: 0.90, gap: 0, priority: "OK", evidenceSources: ["profile_inference", "work_experience"], lastAssessedAt: "2026-08-20", trend: "stable" },
  { id: "comp-010", name: "Data Privacy", domain: "digital_governance", description: "Data protection and privacy regulations", currentScore: 40, requiredScore: 65, futureScore: 75, confidence: 0.70, gap: 25, priority: "HIGH", evidenceSources: ["profile_inference"], lastAssessedAt: "2026-08-10", trend: "stable" },
  { id: "comp-011", name: "Cloud Computing", domain: "technical", description: "Cloud platforms and infrastructure for data processing", currentScore: 15, requiredScore: 50, futureScore: 70, confidence: 0.55, gap: 35, priority: "CRITICAL", evidenceSources: ["profile_inference"], lastAssessedAt: "2026-08-05", trend: "stable" },
  { id: "comp-012", name: "Communication", domain: "managerial", description: "Written and verbal communication skills", currentScore: 80, requiredScore: 75, futureScore: 80, confidence: 0.95, gap: 0, priority: "OK", evidenceSources: ["profile_inference"], lastAssessedAt: "2026-08-18", trend: "stable" },
];

export const skillGaps: SkillGap[] = [
  { id: "gap-001", skillId: "comp-005", skillName: "AI/ML", domain: "technical", currentLevel: 24, requiredLevel: 60, gap: 36, priority: "CRITICAL", reason: "Required for next-generation statistical modeling and predictive analytics. High future demand across all departments.", recommendedCourses: ["course-005", "course-006"], futureDemandWeight: 0.83, roleImportanceWeight: 0.70 },
  { id: "gap-002", skillId: "comp-011", skillName: "Cloud Computing", domain: "technical", currentLevel: 15, requiredLevel: 50, gap: 35, priority: "CRITICAL", reason: "Essential for large-scale data processing and government cloud migration initiatives.", recommendedCourses: ["course-007"], futureDemandWeight: 0.75, roleImportanceWeight: 0.60 },
  { id: "gap-003", skillId: "comp-001", skillName: "Python", domain: "technical", currentLevel: 45, requiredLevel: 80, gap: 35, priority: "HIGH", reason: "Core programming language for statistical data processing and automation of repetitive tasks.", recommendedCourses: ["course-001", "course-002"], futureDemandWeight: 0.70, roleImportanceWeight: 0.80 },
  { id: "gap-004", skillId: "comp-010", skillName: "Data Privacy", domain: "digital_governance", currentLevel: 40, requiredLevel: 65, gap: 25, priority: "HIGH", reason: "Critical for handling sensitive government data and complying with data protection regulations.", recommendedCourses: ["course-008"], futureDemandWeight: 0.60, roleImportanceWeight: 0.65 },
  { id: "gap-005", skillId: "comp-008", skillName: "R Programming", domain: "technical", currentLevel: 55, requiredLevel: 70, gap: 15, priority: "MEDIUM", reason: "Widely used in official statistics for advanced statistical analysis and visualization.", recommendedCourses: ["course-003"], futureDemandWeight: 0.50, roleImportanceWeight: 0.55 },
  { id: "gap-006", skillId: "comp-004", skillName: "Data Visualization", domain: "technical", currentLevel: 60, requiredLevel: 70, gap: 10, priority: "MEDIUM", reason: "Essential for presenting statistical findings to policymakers effectively.", recommendedCourses: ["course-004"], futureDemandWeight: 0.55, roleImportanceWeight: 0.50 },
  { id: "gap-007", skillId: "comp-003", skillName: "Survey Design", domain: "statistical", currentLevel: 65, requiredLevel: 75, gap: 10, priority: "MEDIUM", reason: "Core competency for NSSO operations and national survey programmes.", recommendedCourses: ["course-009"], futureDemandWeight: 0.45, roleImportanceWeight: 0.75 },
];

export const courses: Course[] = [
  { id: "course-001", title: "Python for Statistical Analysis", description: "Comprehensive course on using Python for statistical data processing, analysis, and visualization.", provider: "iGOT", duration: "8 hours", durationHours: 8, level: "Intermediate", competencyIds: ["comp-001"], competencyNames: ["Python"], language: "English", courseUrl: "#", isMock: true, rating: 4.5, enrolledCount: 1250, whyRecommended: "Your Python competency is 45% while your role requires 80%. This course covers the exact statistical analysis skills needed for your current responsibilities.", skillImpact: "Python" },
  { id: "course-002", title: "Advanced Python for Data Science", description: "Deep dive into pandas, NumPy, and scikit-learn for government data analysis workflows.", provider: "iGOT", duration: "12 hours", durationHours: 12, level: "Advanced", competencyIds: ["comp-001"], competencyNames: ["Python"], language: "English", courseUrl: "#", isMock: true, rating: 4.7, enrolledCount: 890, whyRecommended: "After completing the intermediate course, this will advance your Python skills to meet the full role requirement.", skillImpact: "Python" },
  { id: "course-003", title: "R Programming for Official Statistics", description: "Learn R for statistical computing, data manipulation, and publication-ready visualizations.", provider: "iGOT", duration: "6 hours", durationHours: 6, level: "Intermediate", competencyIds: ["comp-008"], competencyNames: ["R Programming"], language: "English", courseUrl: "#", isMock: true, rating: 4.3, enrolledCount: 720, whyRecommended: "Your R programming score is 55% vs required 70%. This course focuses on practical statistical applications.", skillImpact: "R Programming" },
  { id: "course-004", title: "Data Visualization with Tableau & Power BI", description: "Master data visualization tools for creating compelling statistical dashboards.", provider: "TPAC", duration: "5 hours", durationHours: 5, level: "Intermediate", competencyIds: ["comp-004"], competencyNames: ["Data Visualization"], language: "English", courseUrl: "#", isMock: true, rating: 4.4, enrolledCount: 1100, whyRecommended: "Your data visualization skills need improvement to effectively communicate statistical findings to policymakers.", skillImpact: "Data Visualization" },
  { id: "course-005", title: "Introduction to Machine Learning for Government", description: "Foundations of ML applied to government data analysis, forecasting, and pattern recognition.", provider: "iGOT", duration: "10 hours", durationHours: 10, level: "Beginner", competencyIds: ["comp-005"], competencyNames: ["AI/ML"], language: "English", courseUrl: "#", isMock: true, rating: 4.6, enrolledCount: 2100, whyRecommended: "AI/ML is your most critical gap (24% vs 60% required). This beginner course builds the foundation for future advanced learning.", skillImpact: "AI/ML" },
  { id: "course-006", title: "Applied ML for Statistical Forecasting", description: "Practical machine learning techniques for time-series forecasting and predictive modeling.", provider: "iGOT", duration: "14 hours", durationHours: 14, level: "Advanced", competencyIds: ["comp-005"], competencyNames: ["AI/ML"], language: "English", courseUrl: "#", isMock: true, rating: 4.8, enrolledCount: 560, whyRecommended: "Advanced ML course for statistical applications. Take after completing the introductory ML course.", skillImpact: "AI/ML" },
  { id: "course-007", title: "Cloud Computing for Government Data Infrastructure", description: "Understanding government cloud initiatives, data infrastructure, and cloud-based analytics.", provider: "TPAC", duration: "6 hours", durationHours: 6, level: "Beginner", competencyIds: ["comp-011"], competencyNames: ["Cloud Computing"], language: "English", courseUrl: "#", isMock: true, rating: 4.2, enrolledCount: 980, whyRecommended: "Cloud computing is critical for future readiness. Your current score (15%) is significantly below the required level (50%).", skillImpact: "Cloud Computing" },
  { id: "course-008", title: "Data Privacy & Protection in Government", description: "Comprehensive training on data privacy regulations, GDPR compliance, and secure data handling.", provider: "INTERNAL", duration: "4 hours", durationHours: 4, level: "Beginner", competencyIds: ["comp-010"], competencyNames: ["Data Privacy"], language: "English", courseUrl: "#", isMock: true, rating: 4.1, enrolledCount: 1450, whyRecommended: "Data privacy is a high-priority skill for handling sensitive government statistics.", skillImpact: "Data Privacy" },
  { id: "course-009", title: "Advanced Survey Design & Methodology", description: "Master advanced sampling techniques, questionnaire design, and survey methodology.", provider: "TPAC", duration: "8 hours", durationHours: 8, level: "Advanced", competencyIds: ["comp-003", "comp-006"], competencyNames: ["Survey Design", "Sampling"], language: "English", courseUrl: "#", isMock: true, rating: 4.5, enrolledCount: 650, whyRecommended: "Strengthen your core statistical competency in survey design for NSSO operations.", skillImpact: "Survey Design" },
];

export const assessments: Assessment[] = [
  { id: "assess-001", title: "Python Fundamentals Assessment", type: "diagnostic", status: "completed", competencyId: "comp-001", competencyName: "Python", questionCount: 20, durationMinutes: 30, difficulty: "Medium", score: 72, passed: true, completedAt: "2026-09-08", questions: [], reason: "Diagnostic assessment to measure current Python competency" },
  { id: "assess-002", title: "SQL Proficiency Test", type: "diagnostic", status: "completed", competencyId: "comp-002", competencyName: "SQL", questionCount: 15, durationMinutes: 25, difficulty: "Medium", score: 78, passed: true, completedAt: "2026-09-06", questions: [], reason: "Assessment of SQL skills for data management" },
  { id: "assess-003", title: "AI/ML Foundation Quiz", type: "recommended", status: "upcoming", competencyId: "comp-005", competencyName: "AI/ML", questionCount: 10, durationMinutes: 20, difficulty: "Easy", questions: [], reason: "Recommended based on your critical gap in AI/ML competency" },
  { id: "assess-004", title: "Survey Design Comprehensive", type: "adaptive", status: "upcoming", competencyId: "comp-003", competencyName: "Survey Design", questionCount: 25, durationMinutes: 40, difficulty: "Hard", questions: [], reason: "Comprehensive assessment of survey design knowledge" },
  { id: "assess-005", title: "Data Visualization Practice", type: "practice", status: "recommended", competencyId: "comp-004", competencyName: "Data Visualization", questionCount: 12, durationMinutes: 20, difficulty: "Medium", questions: [], reason: "Practice quiz to reinforce data visualization concepts" },
];

export const learningProgress: LearningProgress[] = [
  { courseId: "course-001", courseName: "Python for Statistical Analysis", provider: "iGOT", startedAt: "2026-09-01", progressPercent: 65, lastAccessedAt: "2026-09-09", timeSpentMinutes: 312 },
  { courseId: "course-003", courseName: "R Programming for Official Statistics", provider: "iGOT", startedAt: "2026-09-05", progressPercent: 30, lastAccessedAt: "2026-09-08", timeSpentMinutes: 108 },
  { courseId: "course-008", courseName: "Data Privacy & Protection in Government", provider: "INTERNAL", startedAt: "2026-09-07", progressPercent: 80, lastAccessedAt: "2026-09-10", timeSpentMinutes: 192 },
];

export const notifications: Notification[] = [
  { id: "notif-001", type: "course_recommendation", title: "New Course Recommendation", message: "Based on your AI/ML skill gap, we recommend 'Introduction to Machine Learning for Government'.", timestamp: "2026-09-10T09:00:00Z", read: false, actionUrl: "/learning/recommended" },
  { id: "notif-002", type: "assessment_result", title: "Assessment Complete", message: "You scored 78% in SQL Proficiency Test. Your SQL competency has improved to 70%.", timestamp: "2026-09-06T14:30:00Z", read: true, actionUrl: "/assessments" },
  { id: "notif-003", type: "competency_update", title: "Competency Updated", message: "Your Python competency has been updated from 42% to 45% based on recent learning activity.", timestamp: "2026-09-05T11:00:00Z", read: true, actionUrl: "/competency" },
  { id: "notif-004", type: "new_training", title: "New Training Programme", message: "NSSTA/TPAC has announced 'Advanced Survey Methodology Workshop' starting October 2026.", timestamp: "2026-09-04T10:00:00Z", read: false, actionUrl: "/learning/tpac" },
  { id: "notif-005", type: "system", title: "Platform Update", message: "New AI Tutor feature is now available. Get personalized learning assistance.", timestamp: "2026-09-03T08:00:00Z", read: true, actionUrl: "/ai-tutor" },
];

export const departments: Department[] = [
  { id: "dept-001", name: "National Sample Survey Office", code: "NSSO", officialCount: 450, avgCompetency: 68, topGap: "AI/ML" },
  { id: "dept-002", name: "Central Statistical Office", code: "CSO", officialCount: 320, avgCompetency: 72, topGap: "Cloud Computing" },
  { id: "dept-003", name: "Directorate of Economics & Statistics", code: "DES", officialCount: 280, avgCompetency: 65, topGap: "Python" },
  { id: "dept-004", name: "Computer Centre", code: "CC", officialCount: 150, avgCompetency: 78, topGap: "Data Privacy" },
  { id: "dept-005", name: "Statistics Division", code: "SD", officialCount: 200, avgCompetency: 70, topGap: "AI/ML" },
];

export const conversations: ConversationMessage[] = [
  { id: "msg-001", role: "user", content: "Why is AI/ML such a high priority for my role?", timestamp: "2026-09-10T10:00:00Z" },
  { id: "msg-002", role: "assistant", content: "AI/ML is marked as CRITICAL priority for your role because:\n\n1. **Future Demand**: The demand for AI/ML skills in official statistics is projected to grow by 15% annually.\n2. **Role Requirement**: Your current role as Senior Statistical Officer requires AI/ML competency at 60% (currently at 24%).\n3. **Prerequisite**: AI/ML builds upon your Python and SQL skills, which are already improving.\n4. **Government Initiative**: India's digital governance push requires ML capabilities for predictive analytics.\n\nI recommend starting with 'Introduction to Machine Learning for Government' on iGOT.", timestamp: "2026-09-10T10:00:05Z", sources: [{ title: "Competency Framework v2.1", page: 15, chunk: "AI/ML competency requirements for statistical officers..." }], context: "Based on your competency profile and role requirements" },
];

export const competencyDomainSummaries: CompetencyDomainSummary[] = [
  { domain: "statistical", name: "Statistical Methods", averageScore: 68, requiredScore: 77, gap: 9, skillCount: 5, criticalGaps: 0 },
  { domain: "technical", name: "Technical & Digital", averageScore: 45, requiredScore: 69, gap: 24, skillCount: 6, criticalGaps: 2 },
  { domain: "digital_governance", name: "Digital Governance", averageScore: 40, requiredScore: 65, gap: 25, skillCount: 3, criticalGaps: 1 },
  { domain: "managerial", name: "Behavioural & Managerial", averageScore: 78, requiredScore: 75, gap: -3, skillCount: 3, criticalGaps: 0 },
];

export const competencyStats = {
  overallScore: 68,
  totalSkills: 12,
  criticalGaps: 2,
  highPriorityGaps: 2,
  coursesInProgress: 3,
  assessmentsCompleted: 2,
  learningHours: 612,
  certificationsEarned: 1,
};
