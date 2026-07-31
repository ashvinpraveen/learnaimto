"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import {
  getScoreTier,
  MAX_SCORE,
  QUIZ_QUESTIONS,
  scoreToPercent,
  type QuizOption,
} from "./questions";
import styles from "./page.module.css";

const REGISTRATION_URL =
  "https://event.aimto.my/concierge-menu/registration";

type Phase = "intro" | "quiz" | "result";

export default function WelcomeQuiz() {
  const rootId = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const question = QUIZ_QUESTIONS[step];
  const progress =
    phase === "result"
      ? 100
      : phase === "intro"
        ? 0
        : (step / QUIZ_QUESTIONS.length) * 100;

  const score = QUIZ_QUESTIONS.reduce((total, item) => {
    const selectedId = answers[item.id];
    const option = item.options.find((entry) => entry.id === selectedId);
    return total + (option?.points ?? 0);
  }, 0);

  const tier = getScoreTier(score);
  const percent = scoreToPercent(score);

  const goToStep = useCallback((nextStep: number, dir: "forward" | "back") => {
    setDirection(dir);
    setAnimKey((value) => value + 1);
    setStep(nextStep);
  }, []);

  const selectOption = useCallback(
    (option: QuizOption) => {
      if (!question) return;

      setAnswers((current) => ({ ...current, [question.id]: option.id }));

      window.setTimeout(() => {
        if (step >= QUIZ_QUESTIONS.length - 1) {
          setDirection("forward");
          setAnimKey((value) => value + 1);
          setPhase("result");
          return;
        }

        goToStep(step + 1, "forward");
      }, 220);
    },
    [goToStep, question, step],
  );

  const startQuiz = () => {
    setDirection("forward");
    setAnimKey((value) => value + 1);
    setPhase("quiz");
    setStep(0);
  };

  const goBack = useCallback(() => {
    if (phase === "result") {
      setDirection("back");
      setAnimKey((value) => value + 1);
      setPhase("quiz");
      setStep(QUIZ_QUESTIONS.length - 1);
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
    if (phase !== "quiz") return;

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
            : (currentIndex + delta + (question?.options.length ?? 0)) %
              (question?.options.length ?? 1);
        optionRefs.current[nextIndex]?.focus();
        return;
      }

      const digit = Number(event.key);
      if (
        Number.isInteger(digit) &&
        digit >= 1 &&
        question &&
        digit <= question.options.length
      ) {
        event.preventDefault();
        selectOption(question.options[digit - 1]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack, phase, question, selectOption]);

  const onOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    option: QuizOption,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(option);
    }
  };

  return (
    <div className={styles.site} id={`welcome-${rootId}`}>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Quiz progress"
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
        {(phase === "quiz" || phase === "result") && (
          <button type="button" className={styles.ghostButton} onClick={goBack}>
            Back
          </button>
        )}
      </header>

      <main className={styles.stage}>
        <div
          key={`${phase}-${step}-${animKey}`}
          className={`${styles.panel} ${
            direction === "forward" ? styles.slideIn : styles.slideInBack
          }`}
        >
          {phase === "intro" && (
            <section className={styles.intro} aria-labelledby="welcome-title">
              <p className={styles.kicker}>2-minute check-in</p>
              <h1 id="welcome-title" className={styles.title}>
                Get your <span>AI score</span>
              </h1>
              <p className={styles.lede}>
                Answer six quick questions. We&apos;ll map where you are with AI
                — and what to do next at the Malaysian Learn-a-thon.
              </p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={startQuiz}
                >
                  Start <span aria-hidden="true">→</span>
                </button>
                <p className={styles.hint}>
                  Press <kbd>1</kbd>–<kbd>4</kbd> to answer · Esc to go back
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
                {step + 1} <span>/</span> {QUIZ_QUESTIONS.length}
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
                      onKeyDown={(event) => onOptionKeyDown(event, option)}
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

          {phase === "result" && (
            <section className={styles.result} aria-labelledby="score-title">
              <p className={styles.kicker}>Your AI score</p>
              <div className={styles.scoreRow}>
                <p className={styles.scoreValue} aria-live="polite">
                  {percent}
                  <span>%</span>
                </p>
                <div className={styles.scoreMeta}>
                  <p className={styles.tierLabel}>{tier.label}</p>
                  <h2 id="score-title" className={styles.tierTitle}>
                    {tier.title}
                  </h2>
                  <p className={styles.scoreDetail}>
                    {score} / {MAX_SCORE} points
                  </p>
                </div>
              </div>
              <p className={styles.summary}>{tier.summary}</p>
              <p className={styles.nextStep}>{tier.nextStep}</p>
              <div className={styles.actions}>
                <a className={styles.primaryButton} href={REGISTRATION_URL}>
                  Sign up for Learn-a-thon{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={restart}
                >
                  Retake quiz
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      <div className={styles.atmosphere} aria-hidden="true" />
    </div>
  );
}
