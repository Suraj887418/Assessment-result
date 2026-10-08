export type AssessmentType = 'recorded' | 'text';

export type AssessmentStatus = 'completed' | 'pending';

export type PerformanceLevel = 'Good' | 'Needs Improvement';

export interface AssessmentItem {
  id: string;
  question: string;
  type: AssessmentType;
  score?: number; // 0 - 100, undefined if pending
  status: AssessmentStatus;
  feedback?: string; // AI-generated feedback
  date?: string;
  category?: string;
  durationOrWords?: string; // e.g. "1m 45s" for recorded or "240 words" for text
}

export type FilterCategory = 'all' | 'completed' | 'recorded' | 'text' | 'needs_improvement' | 'pending';

export interface AssessmentSummary {
  total: number;
  completed: number;
  pending: number;
  averageScore: number;
  goodCount: number;
  needsImprovementCount: number;
}
