export type QuizOption = {
  id: string;
  label: string;
  points: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  options: QuizOption[];
};

export type ScoreTier = {
  min: number;
  max: number;
  title: string;
  label: string;
  summary: string;
  nextStep: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "usage",
    prompt: "How often do you use AI tools today?",
    helper: "ChatGPT, Claude, Gemini, Copilot — anything counts.",
    options: [
      { id: "never", label: "Almost never", points: 0 },
      { id: "sometimes", label: "A few times a month", points: 1 },
      { id: "weekly", label: "Every week", points: 2 },
      { id: "daily", label: "Pretty much daily", points: 3 },
    ],
  },
  {
    id: "comfort",
    prompt: "How comfortable are you prompting AI?",
    options: [
      { id: "lost", label: "Still figuring out what to type", points: 0 },
      { id: "basic", label: "I can get a useful answer", points: 1 },
      { id: "iterate", label: "I iterate until it gets good", points: 2 },
      { id: "systems", label: "I build workflows and systems with it", points: 3 },
    ],
  },
  {
    id: "built",
    prompt: "Have you built anything with AI yet?",
    helper: "An app, automation, bot, slide deck — shipped or half-finished.",
    options: [
      { id: "none", label: "Not yet", points: 0 },
      { id: "tried", label: "Tried once or twice", points: 1 },
      { id: "side", label: "Yes — a personal project", points: 2 },
      { id: "work", label: "Yes — something people actually use", points: 3 },
    ],
  },
  {
    id: "tools",
    prompt: "Which best describes your AI toolkit?",
    options: [
      { id: "one", label: "One chatbot, that's it", points: 0 },
      { id: "few", label: "A couple of tools I know well", points: 1 },
      { id: "stack", label: "A small stack for writing, coding, research", points: 2 },
      { id: "builder", label: "I mix models, agents, and no-code builders", points: 3 },
    ],
  },
  {
    id: "goal",
    prompt: "What do you want AI to help you with most?",
    options: [
      { id: "curious", label: "Just curious — want to understand it", points: 0 },
      { id: "work", label: "Speed up school or work", points: 1 },
      { id: "build", label: "Build something of my own", points: 2 },
      { id: "ship", label: "Ship products or automations for others", points: 3 },
    ],
  },
  {
    id: "blocker",
    prompt: "What's holding you back right now?",
    options: [
      { id: "start", label: "I don't know where to start", points: 0 },
      { id: "stuck", label: "I get stuck without help", points: 1 },
      { id: "time", label: "I know enough — just need time", points: 2 },
      { id: "level", label: "I want to level up with other builders", points: 3 },
    ],
  },
];

export const MAX_SCORE = QUIZ_QUESTIONS.length * 3;

export const SCORE_TIERS: ScoreTier[] = [
  {
    min: 0,
    max: 5,
    title: "AI Curious",
    label: "Ready to begin",
    summary:
      "You're at the perfect starting line. A guided day with mentors will get you from blank page to first build fast.",
    nextStep: "Come to the Learn-a-thon and leave with something you made.",
  },
  {
    min: 6,
    max: 11,
    title: "AI Explorer",
    label: "Building momentum",
    summary:
      "You've tasted the tools. Now it's time to turn prompts into projects with hands-on help around you.",
    nextStep: "Use the Learn-a-thon to ship your first real AI build.",
  },
  {
    min: 12,
    max: 15,
    title: "AI Builder",
    label: "Ready to ship",
    summary:
      "You already move with AI. Surround yourself with other builders and push something further in one day.",
    nextStep: "Bring an idea, get unstuck, and take a working build home.",
  },
  {
    min: 16,
    max: 18,
    title: "AI Operator",
    label: "Leading the pack",
    summary:
      "You're fluent. The Learn-a-thon is your chance to mentor, collaborate, and show what focused builders can do.",
    nextStep: "Join the floor, help others, and stretch your own stack.",
  },
];

export function getScoreTier(score: number): ScoreTier {
  const clamped = Math.max(0, Math.min(score, MAX_SCORE));
  const tier = SCORE_TIERS.find(
    (candidate) => clamped >= candidate.min && clamped <= candidate.max,
  );

  if (!tier) {
    return SCORE_TIERS[SCORE_TIERS.length - 1];
  }

  return tier;
}

export function scoreToPercent(score: number): number {
  return Math.round((Math.max(0, Math.min(score, MAX_SCORE)) / MAX_SCORE) * 100);
}
