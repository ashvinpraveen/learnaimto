/**
 * AI Builder Scorecard — designed on Daniel Priestley's Scorecard Marketing principles:
 *
 * 1. Sell the assessment (not the event) — people take it to discover their score/type.
 * 2. Questionnaire = best-practice checklist across a signature method (BUILD).
 * 3. Capture situation + obstacle + name (qualifying / lead), then score behaviour.
 * 4. Results = overall score + category scores + dynamic insights + clear next step.
 * 5. Ideal clients leave with "strong foundations, room to improve" — tension to act.
 * 6. Next step routes people into the right Learn-a-thon day path (not a generic CTA).
 */

export type QuizOption = {
  id: string;
  label: string;
  points: number;
};

export type CategoryId =
  | "baseline"
  | "understanding"
  | "invention"
  | "leverage"
  | "drive";

export type QuizQuestion = {
  id: string;
  category: CategoryId;
  prompt: string;
  helper?: string;
  options: QuizOption[];
};

export type QualifierQuestion = {
  id: "blocker";
  prompt: string;
  helper?: string;
  options: Array<{ id: string; label: string }>;
};

export type Personality = {
  id: string;
  minPercent: number;
  maxPercent: number;
  code: string;
  title: string;
  tagline: string;
  accent: string;
  summary: string;
  insights: string[];
  strengths: string[];
  gaps: string[];
  dayTrack: string;
  dayPlan: string[];
  ctaLabel: string;
  ctaNote: string;
};

export type CategoryMeta = {
  id: CategoryId;
  letter: string;
  label: string;
  meaning: string;
  lowInsight: string;
  midInsight: string;
  highInsight: string;
};

export const METHOD_NAME = "BUILD";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "baseline",
    letter: "B",
    label: "Baseline",
    meaning: "How often AI is already in your weekly rhythm",
    lowInsight:
      "AI is not yet a habit. The Learn-a-thon gives you a full day to install that rhythm with help on the floor.",
    midInsight:
      "You use AI sometimes — good. Consistency turns dabbling into skill. Protect a focused build block on the day.",
    highInsight:
      "Usage is strong. Your edge on the day is depth: ship one sharper system instead of sampling more tools.",
  },
  {
    id: "understanding",
    letter: "U",
    label: "Understanding",
    meaning: "How well you steer prompts into useful output",
    lowInsight:
      "Prompting still feels fuzzy. Mentors will sit with you and turn vague asks into clear briefs you can reuse.",
    midInsight:
      "You can get useful answers. Next leap: iterate with constraints, examples, and critique — not one-shot prompts.",
    highInsight:
      "You already iterate. Use mentors for architecture and edge cases, not basic prompting help.",
  },
  {
    id: "invention",
    letter: "I",
    label: "Invention",
    meaning: "Whether you have turned AI into a finished thing",
    lowInsight:
      "You have not shipped yet — perfect. The Inspiration Board + mentor desk exist so you leave with proof, not notes.",
    midInsight:
      "You have tried builds. Finish one end-to-end on the day so you have a reusable artefact, not another experiment.",
    highInsight:
      "You have shipping proof. Bring a brief, raise the ambition, and pressure-test it with peers and Show + Tell.",
  },
  {
    id: "leverage",
    letter: "L",
    label: "Leverage",
    meaning: "How wide and intentional your AI toolkit is",
    lowInsight:
      "One chatbot is a start. On the day you will touch a small stack and learn which tool fits which job.",
    midInsight:
      "You have a couple of tools. Map each tool to a job on your project so the stack serves the outcome.",
    highInsight:
      "Your stack is broad. Focus leverage on orchestration — fewer tools, tighter workflow, clearer output.",
  },
  {
    id: "drive",
    letter: "D",
    label: "Drive",
    meaning: "How clear your outcome is for the next build",
    lowInsight:
      "Curiosity is enough to start. Arrive open, pick one Inspiration Board prompt, and commit before lunch.",
    midInsight:
      "You want speed at school or work. Bring one recurring friction and automate or accelerate that single step.",
    highInsight:
      "You want to ship for yourself or others. Scope an MVP that fits one day and defend that scope hard.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "baseline",
    category: "baseline",
    prompt: "Do you already use AI in a normal week?",
    helper: "Best practice: AI compounds when it is a habit, not a special occasion.",
    options: [
      { id: "rarely", label: "Almost never", points: 0 },
      { id: "monthly", label: "A few times a month", points: 1 },
      { id: "weekly", label: "Most weeks", points: 2 },
      { id: "daily", label: "Most days", points: 3 },
    ],
  },
  {
    id: "understanding",
    category: "understanding",
    prompt: "When the first answer is weak, what do you usually do?",
    helper: "Best practice: strong builders rewrite, constrain, and critique — they don’t stop at draft one.",
    options: [
      { id: "stop", label: "I usually stop or switch topics", points: 0 },
      { id: "retry", label: "I ask once more, roughly the same way", points: 1 },
      { id: "iterate", label: "I rewrite until it gets useful", points: 2 },
      { id: "system", label: "I use a repeatable prompting system", points: 3 },
    ],
  },
  {
    id: "invention",
    category: "invention",
    prompt: "Have you finished anything with AI that someone else could use?",
    helper: "An app, automation, bot, deck, workflow — unfinished counts less than finished.",
    options: [
      { id: "none", label: "Not yet", points: 0 },
      { id: "started", label: "Started, never finished", points: 1 },
      { id: "personal", label: "Yes — for myself", points: 2 },
      { id: "others", label: "Yes — other people use it", points: 3 },
    ],
  },
  {
    id: "leverage",
    category: "leverage",
    prompt: "How intentional is your AI toolkit?",
    helper: "Best practice: different jobs, different tools — not one chatbot for everything.",
    options: [
      { id: "one", label: "One chatbot for everything", points: 0 },
      { id: "few", label: "A couple of tools I know", points: 1 },
      { id: "mapped", label: "A small stack mapped to different jobs", points: 2 },
      { id: "ops", label: "Models, agents, and builders working together", points: 3 },
    ],
  },
  {
    id: "drive",
    category: "drive",
    prompt: "What outcome do you most want from AI next?",
    helper: "Clear drive creates tension — and tension is what makes a one-day build matter.",
    options: [
      { id: "curious", label: "Just understand what AI can do", points: 0 },
      { id: "work", label: "Speed up school or work tasks", points: 1 },
      { id: "build", label: "Build something of my own", points: 2 },
      { id: "ship", label: "Ship something other people can use", points: 3 },
    ],
  },
];

export const QUALIFIER: QualifierQuestion = {
  id: "blocker",
  prompt: "What usually stops you from getting further with AI?",
  helper: "This does not change your score — it shapes your personalised day plan.",
  options: [
    { id: "start", label: "I don’t know where to start" },
    { id: "stuck", label: "I get stuck and don’t know who to ask" },
    { id: "time", label: "I know enough — I just never protect the time" },
    { id: "level", label: "I want sharper peers and harder problems" },
  ],
};

export const MAX_CATEGORY_SCORE = 3;
export const MAX_SCORE = QUIZ_QUESTIONS.length * MAX_CATEGORY_SCORE;

export const PERSONALITIES: Personality[] = [
  {
    id: "spark",
    minPercent: 0,
    maxPercent: 33,
    code: "SPARK",
    title: "The Spark",
    tagline: "Ready to begin. High upside.",
    accent: "#d7ff36",
    summary:
      "Strong foundations start here. You do not need more theory — you need a guided first build, a clear brief, and people who unblock you in the room.",
    insights: [
      "Your dormant desire is proof: leaving with something you made, not just notes.",
      "The Learn-a-thon is designed for your tier — beginners are first-class, not an afterthought.",
      "Your gap is not talent. It is a starting line and live support.",
    ],
    strengths: [
      "Openness — no bad tooling habits yet",
      "Willingness to learn by doing",
      "Room to improve fast in one day",
    ],
    gaps: [
      "No finished artefact yet",
      "Unclear first brief",
      "No default place to ask for help",
    ],
    dayTrack: "First Build Track",
    dayPlan: [
      "Morning: Inspiration Board — pick one beginner prompt before you open tools",
      "Late morning: Mentor helpdesk — set up accounts and your first prompt brief",
      "Afternoon: Build one thin vertical slice you can demo to a friend",
      "Late day: Write “what I built + next version” so the habit continues after",
    ],
    ctaLabel: "Claim your First Build seat",
    ctaNote: "Free · beginners welcome · laptop recommended",
  },
  {
    id: "tinkerer",
    minPercent: 34,
    maxPercent: 55,
    code: "TINKER",
    title: "The Tinkerer",
    tagline: "Momentum started. Finish line missing.",
    accent: "#69e4ff",
    summary:
      "You already know AI is useful. The tension is unfinished experiments. The Learn-a-thon turns scattered tries into one shippable project with mentors on call.",
    insights: [
      "You score with solid foundations and clear room to improve — the ideal scorecard zone.",
      "Your dormant desire is completion: one artefact you can reopen and reuse.",
      "Help is available all day — use it before a stuck loop eats the afternoon.",
    ],
    strengths: [
      "Enough fluency to move without hand-holding",
      "Practical curiosity across tools",
      "Ready for a real brief, not a lecture",
    ],
    gaps: [
      "Projects started more than finished",
      "Prompting without a locked outcome",
      "Grinding alone when stuck",
    ],
    dayTrack: "Finish Line Track",
    dayPlan: [
      "Morning: Lock one project brief on a sticky — outcome, user, done-definition",
      "Midday: Build in focused sprints; ask mentors at the 15-minute stuck rule",
      "Afternoon: Cut scope ruthlessly so something works end-to-end",
      "Late day: Optional Show + Tell or Builder Gallery submission",
    ],
    ctaLabel: "Join to finish your build",
    ctaNote: "Free · bring a half-idea · leave with a finished slice",
  },
  {
    id: "maker",
    minPercent: 56,
    maxPercent: 77,
    code: "MAKER",
    title: "The Maker",
    tagline: "Builder energy. One-day shipping window.",
    accent: "#ff8bdc",
    summary:
      "You already build with AI. The day is a compressed studio: bring a brief, get sharp feedback, and leave with a stronger version than you arrived with.",
    insights: [
      "Your category mix says “ready to ship” — protect scope so ambition does not kill finish.",
      "Peers and mentors are your leverage now, not beginner tutorials.",
      "Show + Tell is optional but high-signal for makers at your level.",
    ],
    strengths: [
      "Bias to making over talking",
      "Comfortable iterating in public",
      "Fast absorption of advanced tips",
    ],
    gaps: [
      "Scope that overflows one day",
      "Going solo when a teammate multiplies output",
      "Skipping critique that would raise quality",
    ],
    dayTrack: "Ship Studio Track",
    dayPlan: [
      "Morning: Arrive with a one-page brief; pressure-test it with a mentor in 10 minutes",
      "Midday: Deep build block — tools unlocked, distractions cut",
      "Afternoon: Peer critique or pair for 30 minutes to raise quality",
      "Late day: Package a demo + next milestones; consider Show + Tell",
    ],
    ctaLabel: "Book your Ship Studio day",
    ctaNote: "Free · bring a brief · leave with a sharper MVP",
  },
  {
    id: "operator",
    minPercent: 78,
    maxPercent: 100,
    code: "OPS",
    title: "The Operator",
    tagline: "Fluent. Force-multiplier on the floor.",
    accent: "#7a5cff",
    summary:
      "You run AI like infrastructure. Stretch into harder problems, collaborate with peers, and lift others while still shipping your own advanced build.",
    insights: [
      "High scores still leave room: operators grow through harder briefs and public critique.",
      "Your dormant desire is leverage — systems and people, not more random tools.",
      "The floor needs you: mentoring others sharpens your own thinking.",
    ],
    strengths: [
      "Systems thinking across tools and workflows",
      "Can mentor while still shipping",
      "High signal for Show + Tell and peer critique",
    ],
    gaps: [
      "Tool-optimisation over outcomes",
      "Working alone when collaboration unlocks more",
      "Underusing the room’s advanced peers",
    ],
    dayTrack: "Operator / Peer Mentor Track",
    dayPlan: [
      "Morning: Set an advanced challenge brief; find 1–2 peer builders at your level",
      "Midday: Ship your stretch build; take one mentor consult on architecture",
      "Afternoon: Spend a block helping someone stuck — teach to sharpen",
      "Late day: Show + Tell or structured critique with other operators",
    ],
    ctaLabel: "Join as Operator",
    ctaNote: "Free · advanced builders welcome · stretch + lift the floor",
  },
];

const BLOCKER_MOVES: Record<
  string,
  { firstMove: string; mentorAsk: string; benefit: string }
> = {
  start: {
    firstMove:
      "Do not invent a perfect idea at home. Start at the Inspiration Board and pick one beginner prompt before noon.",
    mentorAsk:
      "Help me choose one beginner-friendly project and write my first prompt brief.",
    benefit:
      "You get a starting line and live setup help — the two things that usually kill solo beginners.",
  },
  stuck: {
    firstMove:
      "Park near the mentor helpdesk. Rule: if stuck 15 minutes, ask. Do not grind alone.",
    mentorAsk:
      "Unblock this exact step — here is what I tried and where it fails.",
    benefit:
      "You convert stuck loops into progress with humans who have seen the failure mode before.",
  },
  time: {
    firstMove:
      "Your constraint is focus, not knowledge. Block a quiet build window after setup and defend it.",
    mentorAsk: "Review my scope — what should I cut so I finish today?",
    benefit:
      "The event gives you protected time, tools, and social pressure to actually ship.",
  },
  level: {
    firstMove:
      "Find other advanced builders early, share your brief, and run critique through the afternoon.",
    mentorAsk: "Push my architecture — what would a stronger builder do next?",
    benefit:
      "You get peer density you cannot recreate alone — harder problems, faster feedback.",
  },
};

export type TraitScore = {
  id: CategoryId;
  letter: string;
  label: string;
  meaning: string;
  value: number;
  max: number;
  percent: number;
  insight: string;
};

export type ScorecardResult = {
  score: number;
  percent: number;
  personality: Personality;
  traits: TraitScore[];
  weakest: TraitScore[];
  strongest: TraitScore | null;
  blockerId: string;
  firstMove: string;
  mentorAsk: string;
  eventBenefit: string;
  eventHooks: string[];
};

export function scoreAnswers(answers: Record<string, string>): number {
  return QUIZ_QUESTIONS.reduce((total, item) => {
    const selectedId = answers[item.id];
    const option = item.options.find((entry) => entry.id === selectedId);
    return total + (option?.points ?? 0);
  }, 0);
}

export function scoreToPercent(score: number): number {
  return Math.round(
    (Math.max(0, Math.min(score, MAX_SCORE)) / MAX_SCORE) * 100,
  );
}

export function getPersonality(percent: number): Personality {
  const clamped = Math.max(0, Math.min(percent, 100));
  const match = PERSONALITIES.find(
    (candidate) =>
      clamped >= candidate.minPercent && clamped <= candidate.maxPercent,
  );
  return match ?? PERSONALITIES[PERSONALITIES.length - 1];
}

function insightFor(meta: CategoryMeta, value: number): string {
  if (value <= 0) return meta.lowInsight;
  if (value === 1) return meta.lowInsight;
  if (value === 2) return meta.midInsight;
  return meta.highInsight;
}

export function getTraitScores(answers: Record<string, string>): TraitScore[] {
  return CATEGORIES.map((meta) => {
    const question = QUIZ_QUESTIONS.find((item) => item.category === meta.id);
    const selectedId = question ? answers[question.id] : undefined;
    const option = question?.options.find((entry) => entry.id === selectedId);
    const value = option?.points ?? 0;
    return {
      id: meta.id,
      letter: meta.letter,
      label: meta.label,
      meaning: meta.meaning,
      value,
      max: MAX_CATEGORY_SCORE,
      percent: Math.round((value / MAX_CATEGORY_SCORE) * 100),
      insight: insightFor(meta, value),
    };
  });
}

export function buildScorecard(
  answers: Record<string, string>,
): ScorecardResult {
  const score = scoreAnswers(answers);
  const percent = scoreToPercent(score);
  const personality = getPersonality(percent);
  const traits = getTraitScores(answers);
  const sorted = [...traits].sort((a, b) => a.value - b.value);
  const weakest = sorted.filter((trait) => trait.value <= 1).slice(0, 2);
  const fallbackWeak = sorted.slice(0, 2);
  const blockerId = answers.blocker ?? "start";
  const blocker = BLOCKER_MOVES[blockerId] ?? BLOCKER_MOVES.start;

  return {
    score,
    percent,
    personality,
    traits,
    weakest: weakest.length > 0 ? weakest : fallbackWeak,
    strongest: [...traits].sort((a, b) => b.value - a.value)[0] ?? null,
    blockerId,
    firstMove: blocker.firstMove,
    mentorAsk: blocker.mentorAsk,
    eventBenefit: blocker.benefit,
    eventHooks: [
      "Free mentor help whenever you get stuck",
      "Free AI tools to learn, build, and publish on the day",
      "Inspiration Board if you arrive without an idea",
      "Optional Show + Tell — take a working build home",
    ],
  };
}

export function buildShareText(input: {
  name: string;
  percent: number;
  personality: Personality;
}): string {
  const displayName = input.name.trim() || "I";
  return `${displayName}'s AI Builder Score: ${input.percent}% — ${input.personality.title} (${input.personality.code})
${input.personality.tagline}

Method: ${METHOD_NAME} · Malaysian Learn-a-thon · 12 Aug 2026 · The Campus KL
Get yours: https://learnaimto.my/welcome`;
}
