import { AssessmentItem } from '../types/assessment';

/**
 * Exact Example Scenario from the assessment requirements:
 * 1. Tell me about yourself — Recorded — Score: 82 — Completed
 * 2. Describe a challenging situation — Recorded — Score: 65 — Completed
 * 3. Write a professional email to your manager — Text — Score: 78 — Completed
 * 4. Explain your current project — Recorded — Pending
 */
export const DEFAULT_ASSESSMENTS: AssessmentItem[] = [
  {
    id: 'asm-1',
    question: 'Tell me about yourself',
    type: 'recorded',
    score: 82,
    status: 'completed',
    feedback:
      'Strong opening with a well-structured chronological overview of your background. Your voice modulation and pacing were confident. To reach an elite level, tighten your transition into recent accomplishments and quantify key achievements.',
    date: 'Today, 2:30 PM',
    category: 'Self Introduction',
    durationOrWords: '1 min 45 sec',
  },
  {
    id: 'asm-2',
    question: 'Describe a challenging situation',
    type: 'recorded',
    score: 65,
    status: 'completed',
    feedback:
      'Good context provided, but the response spent too much time describing the problem rather than the STAR method action items. Pace slowed down in the second half with multiple filler words ("um", "like"). Work on concise structuring.',
    date: 'Yesterday, 11:15 AM',
    category: 'Behavioral',
    durationOrWords: '2 min 10 sec',
  },
  {
    id: 'asm-3',
    question: 'Write a professional email to your manager',
    type: 'text',
    score: 78,
    status: 'completed',
    feedback:
      'Clear, polite tone with an actionable subject line. The core request was well-framed. Consider using bullet points for multiple deliverables to enhance readability for busy executives.',
    date: 'Oct 4, 2026',
    category: 'Business Communication',
    durationOrWords: '185 words',
  },
  {
    id: 'asm-4',
    question: 'Explain your current project',
    type: 'recorded',
    status: 'pending',
    date: 'Just now',
    category: 'Technical Pitch',
    durationOrWords: '1 min 20 sec',
    feedback: undefined,
    score: undefined,
  },
  {
    id: 'asm-5',
    question: 'Handling a disagreement with a cross-functional teammate',
    type: 'recorded',
    score: 88,
    status: 'completed',
    feedback:
      'Exceptional empathy and clarity in articulating how you listened first before proposing a collaborative solution. Excellent non-defensive language and steady articulation.',
    date: 'Oct 2, 2026',
    category: 'Conflict Resolution',
    durationOrWords: '2 min 05 sec',
  },
  {
    id: 'asm-6',
    question: 'Executive summary for Q3 product roadmap update',
    type: 'text',
    score: 62,
    status: 'completed',
    feedback:
      'The technical depth is solid, but the tone is too granular for executive leadership. Needs a high-level strategic takeaway upfront (TL;DR) and clearer risk mitigation bullet points.',
    date: 'Sep 29, 2026',
    category: 'Leadership Writing',
    durationOrWords: '310 words',
  },
];

/**
 * Helper to generate a large dataset (e.g. 100+ items)
 * to demonstrate and evaluate FlatList performance under heavy data.
 */
export const generateLargeDataset = (count: number = 100): AssessmentItem[] => {
  const questions = [
    { q: 'How do you prioritize competing deadlines?', cat: 'Time Management' },
    { q: 'Deliver critical feedback to an underperforming peer', cat: 'Leadership' },
    { q: 'Draft an apology email for a delayed client milestone', cat: 'Client Handling' },
    { q: 'Pitch our AI coaching tool to a prospective enterprise buyer', cat: 'Sales & Pitching' },
    { q: 'Explain a complex technical architecture to a non-technical stakeholder', cat: 'Simplification' },
    { q: 'Walk me through a project that failed and what you learned', cat: 'Resilience' },
  ];

  const feedbacks = [
    'Great structure and confident tone. You demonstrated clear ownership and resolution.',
    'Pacing was slightly hurried. Focus on pausing after key takeaways for emphasis.',
    'Clear, articulate, and well-phrased. The call-to-action was crisp.',
    'Lacks concrete examples. Structure the narrative with the STAR framework for better impact.',
  ];

  return Array.from({ length: count }, (_, index) => {
    const qObj = questions[index % questions.length];
    const isPending = index % 7 === 0;
    const isRecorded = index % 2 === 0;
    const score = isPending ? undefined : Math.floor(Math.random() * 41) + 55; // 55 to 95

    return {
      id: `perf-asm-${index + 1}`,
      question: `${qObj.q} (Batch #${Math.floor(index / questions.length) + 1})`,
      type: isRecorded ? 'recorded' : 'text',
      status: isPending ? 'pending' : 'completed',
      score,
      feedback: isPending ? undefined : feedbacks[index % feedbacks.length],
      date: `Sep ${Math.max(1, 30 - (index % 28))}, 2026`,
      category: qObj.cat,
      durationOrWords: isRecorded ? `${1 + (index % 3)}m ${(index * 12) % 60}s` : `${120 + (index * 15) % 200} words`,
    };
  });
};
