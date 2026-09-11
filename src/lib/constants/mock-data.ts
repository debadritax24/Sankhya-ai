import type {
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

export const currentUser = {
  id: "usr_001",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@gov.in",
  department: "NSSO",
  role: "Senior Statistical Officer",
  level: 7,
  avatarUrl: "",
};

export const competencyDomainSummaries: CompetencyDomainSummary[] = [
  { domain: "statistical", name: "Statistical Methods", averageScore: 72, requiredScore: 85, gap: 13, skillCount: 8, criticalGaps: 2 },
  { domain: "technical", name: "Technical Skills", averageScore: 58, requiredScore: 80, gap: 22, skillCount: 10, criticalGaps: 3 },
  { domain: "digital_governance", name: "Digital Governance", averageScore: 45, requiredScore: 75, gap: 30, skillCount: 7, criticalGaps: 4 },
  { domain: "managerial", name: "Managerial Competency", averageScore: 68, requiredScore: 80, gap: 12, skillCount: 6, criticalGaps: 1 },
];

export const competencies: Competency[] = [
  { id: "comp_001", name: "Survey Design", domain: "statistical", description: "Designing effective sampling frames and questionnaire instruments", currentScore: 78, requiredScore: 90, futureScore: 85, confidence: 0.85, gap: 12, priority: "HIGH", evidenceSources: ["assessment", "project"], lastAssessedAt: "2026-08-15", trend: "improving" },
  { id: "comp_002", name: "Sampling Techniques", domain: "statistical", description: "Multi-stage stratified sampling and complex survey design", currentScore: 72, requiredScore: 85, futureScore: 82, confidence: 0.78, gap: 13, priority: "MEDIUM", evidenceSources: ["assessment"], lastAssessedAt: "2026-08-10", trend: "stable" },
  { id: "comp_003", name: "Data Analysis", domain: "statistical", description: "Statistical analysis methods including regression and hypothesis testing", currentScore: 65, requiredScore: 85, futureScore: 80, confidence: 0.72, gap: 20, priority: "CRITICAL", evidenceSources: ["assessment", "course"], lastAssessedAt: "2026-07-20", trend: "stable" },
  { id: "comp_004", name: "Python Programming", domain: "technical", description: "Python for data processing, analysis, and automation", currentScore: 40, requiredScore: 75, futureScore: 85, confidence: 0.55, gap: 35, priority: "CRITICAL", evidenceSources: ["assessment"], lastAssessedAt: "2026-07-01", trend: "declining" },
  { id: "comp_005", name: "SQL & Database Management", domain: "technical", description: "Relational database querying and management", currentScore: 55, requiredScore: 80, futureScore: 82, confidence: 0.65, gap: 25, priority: "HIGH", evidenceSources: ["assessment", "project"], lastAssessedAt: "2026-08-05", trend: "stable" },
  { id: "comp_006", name: "Data Visualization", domain: "technical", description: "Creating effective visual representations of data", currentScore: 62, requiredScore: 75, futureScore: 78, confidence: 0.70, gap: 13, priority: "MEDIUM", evidenceSources: ["course"], lastAssessedAt: "2026-08-12", trend: "improving" },
  { id: "comp_007", name: "GIS & Spatial Analysis", domain: "technical", description: "Geographic Information Systems for statistical mapping", currentScore: 30, requiredScore: 70, futureScore: 75, confidence: 0.45, gap: 40, priority: "CRITICAL", evidenceSources: ["assessment"], lastAssessedAt: "2026-06-15", trend: "declining" },
  { id: "comp_008", name: "Cloud Computing", domain: "digital_governance", description: "Cloud platforms for data storage and processing", currentScore: 35, requiredScore: 70, futureScore: 80, confidence: 0.50, gap: 35, priority: "CRITICAL", evidenceSources: ["assessment"], lastAssessedAt: "2026-06-20", trend: "stable" },
  { id: "comp_009", name: "AI/ML Basics", domain: "digital_governance", description: "Foundations of artificial intelligence and machine learning", currentScore: 25, requiredScore: 65, futureScore: 80, confidence: 0.40, gap: 40, priority: "CRITICAL", evidenceSources: ["assessment"], lastAssessedAt: "2026-06-10", trend: "declining" },
  { id: "comp_010", name: "Data Privacy & Security", domain: "digital_governance", description: "Understanding data protection regulations and security practices", currentScore: 50, requiredScore: 75, futureScore: 78, confidence: 0.60, gap: 25, priority: "HIGH", evidenceSources: ["course"], lastAssessedAt: "2026-07-25", trend: "stable" },
  { id: "comp_011", name: "Project Management", domain: "managerial", description: "Planning and executing statistical projects effectively", currentScore: 70, requiredScore: 80, futureScore: 82, confidence: 0.80, gap: 10, priority: "MEDIUM", evidenceSources: ["assessment", "project"], lastAssessedAt: "2026-08-01", trend: "improving" },
  { id: "comp_012", name: "Team Leadership", domain: "managerial", description: "Leading and mentoring statistical teams", currentScore: 65, requiredScore: 80, futureScore: 80, confidence: 0.75, gap: 15, priority: "MEDIUM", evidenceSources: ["assessment"], lastAssessedAt: "2026-07-30", trend: "stable" },
];

export const skillGaps: SkillGap[] = [
  { id: "gap_001", skillId: "comp_004", skillName: "Python Programming", domain: "technical", currentLevel: 40, requiredLevel: 75, gap: 35, priority: "CRITICAL", reason: "Essential for modern data processing workflows. Current level insufficient for automated data pipelines.", recommendedCourses: ["crs_001", "crs_002"], futureDemandWeight: 0.92, roleImportanceWeight: 0.85 },
  { id: "gap_002", skillId: "comp_009", skillName: "AI/ML Basics", domain: "digital_governance", currentLevel: 25, requiredLevel: 65, gap: 40, priority: "CRITICAL", reason: "Growing importance of AI-assisted statistical methods. Minimum proficiency required by 2027.", recommendedCourses: ["crs_003"], futureDemandWeight: 0.95, roleImportanceWeight: 0.70 },
  { id: "gap_003", skillId: "comp_007", skillName: "GIS & Spatial Analysis", domain: "technical", currentLevel: 30, requiredLevel: 70, gap: 40, priority: "CRITICAL", reason: "Critical for spatial data visualization in census and survey reporting.", recommendedCourses: ["crs_004"], futureDemandWeight: 0.80, roleImportanceWeight: 0.75 },
  { id: "gap_004", skillId: "comp_008", skillName: "Cloud Computing", domain: "digital_governance", currentLevel: 35, requiredLevel: 70, gap: 35, priority: "HIGH", reason: "Government digital infrastructure migration requires cloud proficiency.", recommendedCourses: ["crs_005"], futureDemandWeight: 0.88, roleImportanceWeight: 0.65 },
  { id: "gap_005", skillId: "comp_005", skillName: "SQL & Database Management", domain: "technical", currentLevel: 55, requiredLevel: 80, gap: 25, priority: "HIGH", reason: "Core skill for large-scale data retrieval and management.", recommendedCourses: ["crs_006"], futureDemandWeight: 0.82, roleImportanceWeight: 0.90 },
  { id: "gap_006", skillId: "comp_003", skillName: "Data Analysis", domain: "statistical", currentLevel: 65, requiredLevel: 85, gap: 20, priority: "HIGH", reason: "Advanced analytical skills needed for complex statistical reporting.", recommendedCourses: ["crs_007"], futureDemandWeight: 0.85, roleImportanceWeight: 0.95 },
  { id: "gap_007", skillId: "comp_010", skillName: "Data Privacy & Security", domain: "digital_governance", currentLevel: 50, requiredLevel: 75, gap: 25, priority: "HIGH", reason: "Mandatory compliance requirement for handling government data.", recommendedCourses: ["crs_008"], futureDemandWeight: 0.78, roleImportanceWeight: 0.88 },
  { id: "gap_008", skillId: "comp_001", skillName: "Survey Design", domain: "statistical", currentLevel: 78, requiredLevel: 90, gap: 12, priority: "MEDIUM", reason: "Refinement needed for advanced survey methodologies.", recommendedCourses: ["crs_009"], futureDemandWeight: 0.70, roleImportanceWeight: 0.92 },
];

export const courses: Course[] = [
  { id: "crs_001", title: "Python for Government Data Analysis", description: "Comprehensive Python course tailored for government statistical workflows", provider: "iGOT", duration: "40 hours", durationHours: 40, level: "Intermediate", competencyIds: ["comp_004"], competencyNames: ["Python Programming"], language: "English", courseUrl: "#", isMock: true, rating: 4.6, enrolledCount: 1240, whyRecommended: "Directly addresses your Python Programming skill gap with government-relevant examples.", skillImpact: "+15 points on Python Programming competency" },
  { id: "crs_002", title: "Advanced Python for Data Pipelines", description: "Building automated data processing pipelines with Python", provider: "TPAC", duration: "30 hours", durationHours: 30, level: "Advanced", competencyIds: ["comp_004"], competencyNames: ["Python Programming"], language: "English", courseUrl: "#", isMock: true, rating: 4.4, enrolledCount: 560, whyRecommended: "Builds on foundational Python skills for production data workflows.", skillImpact: "+10 points on Python Programming competency" },
  { id: "crs_003", title: "AI Foundations for Statistical Officers", description: "Introduction to AI and ML concepts relevant to official statistics", provider: "iGOT", duration: "25 hours", durationHours: 25, level: "Beginner", competencyIds: ["comp_009"], competencyNames: ["AI/ML Basics"], language: "English", courseUrl: "#", isMock: true, rating: 4.7, enrolledCount: 890, whyRecommended: "Essential starting point for AI proficiency in government statistical work.", skillImpact: "+20 points on AI/ML Basics competency" },
  { id: "crs_004", title: "GIS for Census & Survey Mapping", description: "Geographic Information Systems for spatial data in official statistics", provider: "INTERNAL", duration: "35 hours", durationHours: 35, level: "Intermediate", competencyIds: ["comp_007"], competencyNames: ["GIS & Spatial Analysis"], language: "English", courseUrl: "#", isMock: true, rating: 4.3, enrolledCount: 320, whyRecommended: "Critical for spatial analysis in census reporting workflows.", skillImpact: "+18 points on GIS & Spatial Analysis competency" },
  { id: "crs_005", title: "Cloud Platform Essentials for Government", description: "Cloud computing fundamentals for government data infrastructure", provider: "TPAC", duration: "20 hours", durationHours: 20, level: "Beginner", competencyIds: ["comp_008"], competencyNames: ["Cloud Computing"], language: "English", courseUrl: "#", isMock: true, rating: 4.5, enrolledCount: 1100, whyRecommended: "Required for upcoming government cloud migration initiative.", skillImpact: "+15 points on Cloud Computing competency" },
  { id: "crs_006", title: "SQL Masterclass for Statistical Data", description: "Advanced SQL techniques for managing large statistical datasets", provider: "iGOT", duration: "28 hours", durationHours: 28, level: "Intermediate", competencyIds: ["comp_005"], competencyNames: ["SQL & Database Management"], language: "English", courseUrl: "#", isMock: true, rating: 4.4, enrolledCount: 980, whyRecommended: "Strengthens core database skills essential for daily operations.", skillImpact: "+12 points on SQL & Database Management competency" },
  { id: "crs_007", title: "Advanced Statistical Analysis with R", description: "R programming for advanced statistical modeling and analysis", provider: "TPAC", duration: "45 hours", durationHours: 45, level: "Advanced", competencyIds: ["comp_003"], competencyNames: ["Data Analysis"], language: "English", courseUrl: "#", isMock: true, rating: 4.6, enrolledCount: 650, whyRecommended: "Enhances analytical capabilities for complex statistical reporting.", skillImpact: "+10 points on Data Analysis competency" },
  { id: "crs_008", title: "Data Privacy & Security Compliance", description: "Government data protection regulations and security best practices", provider: "INTERNAL", duration: "15 hours", durationHours: 15, level: "Beginner", competencyIds: ["comp_010"], competencyNames: ["Data Privacy & Security"], language: "English", courseUrl: "#", isMock: true, rating: 4.8, enrolledCount: 2100, whyRecommended: "Mandatory compliance training for all government data handlers.", skillImpact: "+10 points on Data Privacy & Security competency" },
  { id: "crs_009", title: "Modern Survey Methodologies", description: "Advanced survey design techniques including CAPI and online panels", provider: "iGOT", duration: "32 hours", durationHours: 32, level: "Advanced", competencyIds: ["comp_001"], competencyNames: ["Survey Design"], language: "English", courseUrl: "#", isMock: true, rating: 4.5, enrolledCount: 420, whyRecommended: "Refines survey design skills with modern data collection approaches.", skillImpact: "+5 points on Survey Design competency" },
  { id: "crs_010", title: "Data Visualization for Policy Reports", description: "Creating compelling data visualizations for policy communication", provider: "TPAC", duration: "18 hours", durationHours: 18, level: "Intermediate", competencyIds: ["comp_006"], competencyNames: ["Data Visualization"], language: "English", courseUrl: "#", isMock: true, rating: 4.3, enrolledCount: 750, whyRecommended: "Improves ability to communicate data insights to policymakers.", skillImpact: "+8 points on Data Visualization competency" },
];

export const assessments: Assessment[] = [
  { id: "assess_001", title: "Python Programming Diagnostic", type: "diagnostic", status: "recommended", competencyId: "comp_004", competencyName: "Python Programming", questionCount: 25, durationMinutes: 45, difficulty: "Medium", questions: [], reason: "Recommended based on your current skill gap assessment" },
  { id: "assess_002", title: "SQL Proficiency Assessment", type: "adaptive", status: "upcoming", competencyId: "comp_005", competencyName: "SQL & Database Management", questionCount: 20, durationMinutes: 30, difficulty: "Medium", questions: [] },
  { id: "assess_003", title: "Statistical Methods Certification", type: "certification", status: "upcoming", competencyId: "comp_003", competencyName: "Data Analysis", questionCount: 30, durationMinutes: 60, difficulty: "Hard", questions: [] },
  { id: "assess_004", title: "Survey Design Fundamentals", type: "diagnostic", status: "completed", competencyId: "comp_001", competencyName: "Survey Design", questionCount: 20, durationMinutes: 30, difficulty: "Easy", score: 78, passed: true, completedAt: "2026-08-15", questions: [] },
  { id: "assess_005", title: "AI/ML Readiness Assessment", type: "practice", status: "completed", competencyId: "comp_009", competencyName: "AI/ML Basics", questionCount: 15, durationMinutes: 25, difficulty: "Easy", score: 45, passed: false, completedAt: "2026-07-20", questions: [] },
  { id: "assess_006", title: "Data Privacy Compliance Test", type: "diagnostic", status: "completed", competencyId: "comp_010", competencyName: "Data Privacy & Security", questionCount: 20, durationMinutes: 30, difficulty: "Medium", score: 82, passed: true, completedAt: "2026-08-01", questions: [] },
];

export const learningProgress: LearningProgress[] = [
  { courseId: "crs_001", courseName: "Python for Government Data Analysis", provider: "iGOT", startedAt: "2026-08-01", progressPercent: 45, lastAccessedAt: "2026-09-08", timeSpentMinutes: 1080 },
  { courseId: "crs_006", courseName: "SQL Masterclass for Statistical Data", provider: "iGOT", startedAt: "2026-07-15", completedAt: "2026-08-20", progressPercent: 100, lastAccessedAt: "2026-08-20", timeSpentMinutes: 1680 },
  { courseId: "crs_003", courseName: "AI Foundations for Statistical Officers", provider: "iGOT", startedAt: "2026-08-20", progressPercent: 20, lastAccessedAt: "2026-09-05", timeSpentMinutes: 300 },
  { courseId: "crs_008", courseName: "Data Privacy & Security Compliance", provider: "INTERNAL", startedAt: "2026-08-10", completedAt: "2026-08-15", progressPercent: 100, lastAccessedAt: "2026-08-15", timeSpentMinutes: 900 },
];

export const notifications: Notification[] = [
  { id: "notif_001", type: "course_recommendation", title: "New Course Recommended", message: "Based on your skill gap in Python Programming, we recommend starting 'Python for Government Data Analysis'.", timestamp: "2026-09-10T09:00:00Z", read: false, actionUrl: "/learning/crs_001" },
  { id: "notif_002", type: "assessment_result", title: "Assessment Completed", message: "You scored 78% on Survey Design Fundamentals. Your competency score has been updated.", timestamp: "2026-08-15T14:30:00Z", read: true, actionUrl: "/assessments" },
  { id: "notif_003", type: "competency_update", title: "Competency Update", message: "Your SQL & Database Management score improved from 45% to 55% after completing the course.", timestamp: "2026-08-20T11:00:00Z", read: true, actionUrl: "/competency" },
  { id: "notif_004", type: "new_training", title: "New Training Available", message: "Cloud Platform Essentials for Government is now available. Essential for upcoming digital transformation.", timestamp: "2026-09-05T08:00:00Z", read: false, actionUrl: "/learning/crs_005" },
  { id: "notif_005", type: "system", title: "Platform Update", message: "The AI Learning Copilot has been enhanced with better course recommendations.", timestamp: "2026-09-01T10:00:00Z", read: true },
];

export const departments: Department[] = [
  { id: "dept_001", name: "National Sample Survey Office", code: "NSSO", officialCount: 145, avgCompetency: 62, topGap: "Python Programming" },
  { id: "dept_002", name: "Central Statistics Office", code: "CSO", officialCount: 98, avgCompetency: 68, topGap: "Cloud Computing" },
  { id: "dept_003", name: "Department of Economic Statistics", code: "DES", officialCount: 76, avgCompetency: 55, topGap: "AI/ML Basics" },
  { id: "dept_004", name: "Computer Centre", code: "CC", officialCount: 52, avgCompetency: 74, topGap: "Survey Design" },
  { id: "dept_005", name: "Statistical Development", code: "SD", officialCount: 63, avgCompetency: 58, topGap: "GIS & Spatial Analysis" },
];

export const conversations: ConversationMessage[] = [
  { id: "msg_001", role: "user", content: "What courses should I take to improve my Python skills?", timestamp: "2026-09-08T10:00:00Z" },
  { id: "msg_002", role: "assistant", content: "Based on your skill gap assessment, I recommend starting with 'Python for Government Data Analysis' on iGOT. This course is specifically designed for government statistical workflows and will help you build a solid foundation. It covers data processing, analysis, and automation techniques relevant to your role.", timestamp: "2026-09-08T10:00:05Z", sources: [{ title: "Python for Government Data Analysis", page: 1, chunk: "Course overview and learning outcomes" }], context: "User has a CRITICAL skill gap in Python Programming (current: 40%, required: 75%)" },
];

export const competencyStats = {
  overallScore: 61,
  totalSkills: 12,
  criticalGaps: 4,
  highPriorityGaps: 3,
  coursesInProgress: 2,
  assessmentsCompleted: 3,
  learningHours: 48,
  certificationsEarned: 0,
};
