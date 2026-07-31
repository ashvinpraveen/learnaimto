"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import AimtoThemeToggle from "../aimto/AimtoThemeToggle";
import { REGISTRATION_URL } from "@/lib/constants";
import ShareCard, { downloadShareCard } from "./ShareCard";
import {
  buildScorecard,
  buildShareText,
  MAX_SCORE,
  METHOD_NAME,
  QUALIFIER,
  QUIZ_QUESTIONS,
  type QuizOption,
} from "./questions";
import styles from "./page.module.css";

const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1; // + qualifier
type Phase = "intro" | "quiz" | "qualifier" | "name" | "result";

export default function WelcomeQuiz() {
  const rootId = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const shareRootRef = useRef<HTMLDivElement>(null);

  const question = QUIZ_QUESTIONS[step];
  const result = phase === "result" ? buildScorecard(answers) : null;

  const progress =
    phase === "result"
      ? 100
      : phase === "intro"
        ? 0
        : phase === "name"
          ? 96
          : phase === "qualifier"
            ? ((QUIZ_QUESTIONS.length + 0.5) / (TOTAL_STEPS + 1)) * 100
            : ((step + 0.15) / (TOTAL_STEPS + 1)) * 100;

  const goForward = useCallback((next: Phase, nextStep = 0) => {
    setDirection("forward");
    setAnimKey((value) => value + 1);
    setPhase(next);
    setStep(nextStep);
  }, []);

  const goToStep = useCallback((nextStep: number, dir: "forward" | "back") => {
    setDirection(dir);
    setAnimKey((value) => value + 1);
    setStep(nextStep);
    setPhase("quiz");
  }, []);

  const selectOption = useCallback(
    (option: QuizOption) => {
      if (!question) return;
      setAnswers((current) => ({ ...current, [question.id]: option.id }));

      window.setTimeout(() => {
        if (step >= QUIZ_QUESTIONS.length - 1) {
          goForward("qualifier");
          return;
        }
        goToStep(step + 1, "forward");
      }, 180);
    },
    [goForward, goToStep, question, step],
  );

  const selectQualifier = useCallback(
    (optionId: string) => {
      setAnswers((current) => ({ ...current, blocker: optionId }));
      window.setTimeout(() => goForward("name"), 180);
    },
    [goForward],
  );

  const startQuiz = () => goForward("quiz", 0);

  const submitName = (event?: FormEvent) => {
    event?.preventDefault();
    if (!name.trim()) {
      nameInputRef.current?.focus();
      return;
    }
    goForward("result");
  };

  const goBack = useCallback(() => {
    if (phase === "result") {
      setDirection("back");
      setAnimKey((value) => value + 1);
      setPhase("name");
      return;
    }
    if (phase === "name") {
      setDirection("back");
      setAnimKey((value) => value + 1);
      setPhase("qualifier");
      return;
    }
    if (phase === "qualifier") {
      goToStep(QUIZ_QUESTIONS.length - 1, "back");
      return;
    }
    if (phase === "quiz" && step > 0) {
      goToStep(step - 1, "back");
      return;
    }
    if (phase === "quiz" && step === 0) {
      setDirection("back");
      setAnimKey((value) => value + 1);
      setPhase("intro");
    }
  }, [goToStep, phase, step]);

  const restart = () => {
    setAnswers({});
    setName("");
    setCopied(false);
    setShareStatus(null);
    setStep(0);
    setDirection("back");
    setAnimKey((value) => value + 1);
    setPhase("intro");
  };

  useEffect(() => {
    const previousDocumentBackground =
      document.documentElement.style.backgroundColor;
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousColorScheme = document.documentElement.style.colorScheme;

    document.documentElement.style.backgroundColor = "#070707";
    document.documentElement.style.colorScheme = "dark";
    document.body.style.backgroundColor = "#070707";

    return () => {
      document.documentElement.style.backgroundColor =
        previousDocumentBackground;
      document.documentElement.style.colorScheme = previousColorScheme;
      document.body.style.backgroundColor = previousBodyBackground;
    };
  }, []);

  useEffect(() => {
    if (phase === "name") {
      nameInputRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "quiz" && phase !== "qualifier") return;

    const activeOptions =
      phase === "quiz" ? question?.options : QUALIFIER.options;
    if (!activeOptions) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        goBack();
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = optionRefs.current.findIndex(
          (node) => node === document.activeElement,
        );
        const delta = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          currentIndex < 0
            ? 0
            : (currentIndex + delta + activeOptions.length) %
              activeOptions.length;
        optionRefs.current[nextIndex]?.focus();
        return;
      }

      const digit = Number(event.key);
      if (
        Number.isInteger(digit) &&
        digit >= 1 &&
        digit <= activeOptions.length
      ) {
        event.preventDefault();
        if (phase === "quiz" && question) {
          selectOption(question.options[digit - 1]);
        } else {
          selectQualifier(QUALIFIER.options[digit - 1].id);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack, phase, question, selectOption, selectQualifier]);

  const onOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const sharePayload = result
    ? buildShareText({
        name,
        percent: result.percent,
        personality: result.personality,
      })
    : "";

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(sharePayload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setShareStatus("Could not copy — long-press the card to screenshot.");
    }
  };

  const downloadCard = async () => {
    const slug = (name.trim() || "builder").toLowerCase().replace(/\s+/g, "-");
    await downloadShareCard(
      shareRootRef.current,
      `aimto-ai-scorecard-${slug}.png`,
    );
    setShareStatus("Scorecard image downloaded.");
    window.setTimeout(() => setShareStatus(null), 2000);
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      await copyShare();
      return;
    }
    try {
      await navigator.share({
        title: "My AIMTO AI Builder Score",
        text: sharePayload,
      });
    } catch {
      // user cancelled
    }
  };

  const stepLabel =
    phase === "quiz"
      ? `${step + 1} / ${TOTAL_STEPS}`
      : phase === "qualifier"
        ? `${QUIZ_QUESTIONS.length + 1} / ${TOTAL_STEPS}`
        : null;

  return (
    <div className={styles.site} id={`welcome-${rootId}`}>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Scorecard progress"
      >
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className={styles.topBar}>
        <a className={styles.brand} href="/" aria-label="Aimto home">
          <Image
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover"
            width={600}
            height={113}
            sizes="150px"
            priority
          />
        </a>
        <div className={styles.topBarActions}>
          <AimtoThemeToggle />
          {phase !== "intro" && (
            <button
              type="button"
              className={styles.ghostButton}
              onClick={goBack}
            >
              Back
            </button>
          )}
        </div>
      </header>

      <main
        className={`${styles.stage} ${
          phase === "result" ? styles.stageResult : ""
        }`}
      >
        <div
          key={`${phase}-${step}-${animKey}`}
          className={`${styles.panel} ${
            phase === "result" ? styles.panelWide : ""
          } ${direction === "forward" ? styles.slideIn : styles.slideInBack}`}
        >
          {phase === "intro" && (
            <section className={styles.intro} aria-labelledby="welcome-title">
              <p className={styles.kicker}>AI BUILDER SCORECARD_</p>
              <h1 id="welcome-title" className={styles.title}>
                How ready are you
                <br />
                to build with AI?
              </h1>
              <p className={styles.lede}>
                A 2-minute checklist across the {METHOD_NAME} method. Get your
                score, your builder type, and a personalised Learn-a-thon day
                plan.
              </p>
              <ul className={styles.benefitList}>
                <li>Your overall AI Builder Score + type</li>
                <li>Category breakdown across {METHOD_NAME}</li>
                <li>A day plan for 12 Aug at The Campus KL</li>
              </ul>
              <p className={styles.credibility}>
                Built for the Malaysian Learn-a-thon — free, open to every
                Malaysian, hands-on mentors on the floor.
              </p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={startQuiz}
                >
                  Discover your score <span aria-hidden="true">→</span>
                </button>
                <p className={styles.hint}>
                  {TOTAL_STEPS} questions · under 2 minutes · press{" "}
                  <kbd>1</kbd>–<kbd>4</kbd> to answer
                </p>
              </div>
            </section>
          )}

          {phase === "quiz" && question && (
            <section
              className={styles.question}
              aria-labelledby={`q-${question.id}`}
            >
              <p className={styles.stepLabel}>
                {stepLabel} · {METHOD_NAME} /{" "}
                {question.category.toUpperCase()}
              </p>
              <h2 id={`q-${question.id}`} className={styles.questionTitle}>
                {question.prompt}
              </h2>
              {question.helper ? (
                <p className={styles.helper}>{question.helper}</p>
              ) : null}
              <div
                className={styles.options}
                role="listbox"
                aria-label={question.prompt}
              >
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${styles.option} ${
                        selected ? styles.optionSelected : ""
                      }`}
                      onClick={() => selectOption(option)}
                      onKeyDown={(event) =>
                        onOptionKeyDown(event, () => selectOption(option))
                      }
                    >
                      <span className={styles.optionKey} aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {phase === "qualifier" && (
            <section
              className={styles.question}
              aria-labelledby="q-blocker"
            >
              <p className={styles.stepLabel}>
                {stepLabel} · DAY PLAN INPUT
              </p>
              <h2 id="q-blocker" className={styles.questionTitle}>
                {QUALIFIER.prompt}
              </h2>
              {QUALIFIER.helper ? (
                <p className={styles.helper}>{QUALIFIER.helper}</p>
              ) : null}
              <div
                className={styles.options}
                role="listbox"
                aria-label={QUALIFIER.prompt}
              >
                {QUALIFIER.options.map((option, index) => {
                  const selected = answers.blocker === option.id;
                  return (
                    <button
                      key={option.id}
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${styles.option} ${
                        selected ? styles.optionSelected : ""
                      }`}
                      onClick={() => selectQualifier(option.id)}
                      onKeyDown={(event) =>
                        onOptionKeyDown(event, () =>
                          selectQualifier(option.id),
                        )
                      }
                    >
                      <span className={styles.optionKey} aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {phase === "name" && (
            <section className={styles.question} aria-labelledby="q-name">
              <p className={styles.stepLabel}>ALMOST THERE_</p>
              <h2 id="q-name" className={styles.questionTitle}>
                What&apos;s your name?
              </h2>
              <p className={styles.helper}>
                We put it on your personalised scorecard so it feels like yours
                to keep and share.
              </p>
              <form className={styles.nameForm} onSubmit={submitName}>
                <label className={styles.srOnly} htmlFor="builder-name">
                  Your name
                </label>
                <input
                  id="builder-name"
                  ref={nameInputRef}
                  className={styles.nameInput}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Type your name…"
                  autoComplete="name"
                  maxLength={40}
                />
                <button type="submit" className={styles.primaryButton}>
                  See my scorecard <span aria-hidden="true">→</span>
                </button>
              </form>
            </section>
          )}

          {phase === "result" && result && (
            <section className={styles.result} aria-labelledby="score-title">
              <div className={styles.resultGrid}>
                <div className={styles.resultMain}>
                  <p className={styles.kicker}>YOUR {METHOD_NAME} SCORECARD_</p>
                  <p className={styles.resultName}>{name.trim()}</p>
                  <div className={styles.scoreRow}>
                    <p
                      className={styles.scoreValue}
                      style={{ color: result.personality.accent }}
                      aria-live="polite"
                    >
                      {result.percent}
                      <span>%</span>
                    </p>
                    <div className={styles.scoreMeta}>
                      <p className={styles.tierLabel}>
                        TYPE {result.personality.code} ·{" "}
                        {result.personality.dayTrack}
                      </p>
                      <h2 id="score-title" className={styles.tierTitle}>
                        {result.personality.title}
                      </h2>
                      <p className={styles.scoreDetail}>
                        {result.personality.tagline} · {result.score}/{MAX_SCORE}{" "}
                        pts
                      </p>
                    </div>
                  </div>

                  <p className={styles.summary}>{result.personality.summary}</p>

                  <div className={styles.insightBlock}>
                    <p className={styles.blockLabel}>INSIGHTS_</p>
                    <ul className={styles.insightList}>
                      {result.personality.insights.map((insight) => (
                        <li key={insight}>{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.traitBlock}>
                    <p className={styles.blockLabel}>
                      {METHOD_NAME} BREAKDOWN_
                    </p>
                    <ul className={styles.traitList}>
                      {result.traits.map((trait) => (
                        <li key={trait.id} className={styles.traitItem}>
                          <div className={styles.traitHead}>
                            <span>
                              <strong>{trait.letter}</strong> {trait.label}
                            </span>
                            <span>
                              {trait.value}/{trait.max}
                            </span>
                          </div>
                          <div
                            className={styles.traitBar}
                            aria-hidden="true"
                          >
                            <span
                              style={{
                                width: `${trait.percent}%`,
                                background: result.personality.accent,
                              }}
                            />
                          </div>
                          <p className={styles.traitMeaning}>{trait.meaning}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.gapBlock}>
                    <div>
                      <p className={styles.blockLabel}>WHERE TO IMPROVE_</p>
                      <ul className={styles.plainList}>
                        {result.weakest.map((trait) => (
                          <li key={trait.id}>{trait.insight}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={styles.blockLabel}>ALREADY STRONG_</p>
                      <ul className={styles.plainList}>
                        {result.personality.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <aside className={styles.resultAside}>
                  <div className={styles.sharePanel} ref={shareRootRef}>
                    <p className={styles.blockLabel}>SHAREABLE SCORECARD_</p>
                    <ShareCard
                      name={name}
                      percent={result.percent}
                      score={result.score}
                      maxScore={MAX_SCORE}
                      personality={result.personality}
                      traits={result.traits}
                    />
                    <div className={styles.shareActions}>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={downloadCard}
                      >
                        Download image
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={copyShare}
                      >
                        {copied ? "Copied" : "Copy text"}
                      </button>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={nativeShare}
                      >
                        Share
                      </button>
                    </div>
                    {shareStatus ? (
                      <p className={styles.shareStatus}>{shareStatus}</p>
                    ) : null}
                  </div>

                  <div className={styles.playbook}>
                    <p className={styles.blockLabel}>YOUR LEARN-A-THON PLAN_</p>
                    <h3 className={styles.playbookTitle}>
                      {result.personality.dayTrack}
                    </h3>
                    <p className={styles.playbookLead}>
                      12 Aug 2026 · The Campus, KL · Free for every Malaysian
                    </p>
                    <p className={styles.eventBenefit}>{result.eventBenefit}</p>

                    <p className={styles.miniLabel}>FIRST MOVE ON THE DAY</p>
                    <p className={styles.miniBody}>{result.firstMove}</p>

                    <p className={styles.miniLabel}>ASK A MENTOR</p>
                    <p className={styles.miniBody}>
                      &ldquo;{result.mentorAsk}&rdquo;
                    </p>

                    <p className={styles.miniLabel}>HOUR-BY-HOUR</p>
                    <ol className={styles.dayPlan}>
                      {result.personality.dayPlan.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>

                    <p className={styles.miniLabel}>WHAT YOU GET</p>
                    <ul className={styles.plainList}>
                      {result.eventHooks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className={styles.ctaStack}>
                      <a
                        className={styles.primaryButton}
                        href={REGISTRATION_URL}
                      >
                        {result.personality.ctaLabel}{" "}
                        <span aria-hidden="true">↗</span>
                      </a>
                      <p className={styles.ctaNote}>
                        {result.personality.ctaNote}
                      </p>
                      <button
                        type="button"
                        className={styles.textButton}
                        onClick={restart}
                      >
                        Retake scorecard
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
