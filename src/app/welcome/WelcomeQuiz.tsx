"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Screen = "entry" | "projects" | "tutorial" | "complete";

const LESSONS = [
  {
    label: "00 / GET SET UP",
    title: "Open Google AI Studio first.",
    body: "Open AI Studio in a new tab, then sign in or create a free Google account. Start a new chat and keep it open beside this tutorial—you’ll paste one prompt there at every step.",
    prompt: "I’m brand new to building with AI. I’m making my first personal website today. Please act as my friendly building coach and guide me one small step at a time.",
    preview: "AI Studio is open. You’re ready!",
  },
  {
    label: "01 / YOUR IDEA",
    title: "Start with something you care about.",
    body: "Paste this into your new AI Studio chat. A great first build fixes one tiny annoyance—tell Gemini what you wish worked better.",
    prompt: "I want to make a personal website that helps people understand who I am. Help me plan it.",
    preview: "Your corner of the internet",
  },
  {
    label: "02 / MAKE IT YOURS",
    title: "Give your site a personality.",
    body: "Paste this next prompt into the same AI Studio chat. Ask for a headline, a short intro, and one thing you are proud of. You do not need perfect words—AI can help you shape them.",
    prompt: "Write friendly copy for my personal website. Include a welcoming headline, a short bio, and a fun fact.",
    preview: "Hello, I’m a curious maker ✦",
  },
  {
    label: "03 / ADD SOME COLOUR",
    title: "Choose a vibe and iterate.",
    body: "Paste this next prompt into AI Studio to direct the style. Try colours, fonts, or a mood. The secret is to respond to the first draft, not settle for it.",
    prompt: "Make the design playful, warm, and a little retro. Use a bright accent colour and big friendly type.",
    preview: "Built with curiosity & good snacks",
  },
  {
    label: "04 / BUILD IT",
    title: "Turn the plan into a real page.",
    body: "Paste this final prompt into AI Studio to generate your first version. Then keep chatting with Gemini—ask for changes, try new ideas, and keep refining until the site feels like yours.",
    prompt: "Create a simple one-page personal website from this plan. Use HTML and CSS, and explain how I can change it later.",
    preview: "It’s alive! Your first site is ready.",
  },
];

const PROJECTS = [
  { icon: "✦", title: "Personal Website", note: "Tell your story online", active: true },
  { icon: "▦", title: "Pixel Drawing Board", note: "Make tiny art with code", active: false },
  { icon: "🦕", title: "Dinosaur Jumping Game", note: "Build a little game", active: false },
];

export default function WelcomeQuiz() {
  const [screen, setScreen] = useState<Screen>("entry");
  const [lesson, setLesson] = useState(0);
  const [toast, setToast] = useState("");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const chooseProject = (active: boolean) => {
    if (active) {
      setScreen("tutorial");
      setLesson(0);
      return;
    }
    setToast("That one’s coming soon. Try Personal Website for now!");
    window.setTimeout(() => setToast(""), 2600);
  };

  const jumpToBuild = () => {
    setScreen("tutorial");
    setLesson(0);
  };

  const copyPrompt = async () => {
    await navigator.clipboard?.writeText(current.prompt);
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const current = LESSONS[lesson];

  return (
    <main className={styles.app}>
      <div className={styles.pixelGrid} aria-hidden="true" />
      <header className={styles.header}>
        <a className={styles.logo} href="/" aria-label="AIMTO home">
          <span>AI</span>MTO
        </a>
        <div className={styles.status}><i /> FIRST QUEST</div>
      </header>

      {screen === "entry" && (
        <section className={`${styles.entry} ${styles.screen}`} aria-labelledby="welcome-title">
          <div className={styles.sparkles} aria-hidden="true"><b>✦</b><b>+</b><b>✧</b></div>
          <p className={styles.eyebrow}>AIMTO LEARN-A-THON PRESENTS</p>
          <div className={styles.levelBadge}>+1 <span>LEVEL UP</span></div>
          <h1 id="welcome-title">Welcome to your first<br />AI learning experience! <span>🥳</span></h1>
          <p className={styles.lede}>No experience needed. Just bring a little curiosity—we’ll turn an idea into something real together.</p>
          <button className={styles.primaryButton} onClick={() => setScreen("projects")}>Let’s go <span>→</span></button>
          <p className={styles.keyHint}><kbd>↵</kbd> press enter to continue</p>
        </section>
      )}

      {screen === "projects" && (
        <section className={`${styles.projects} ${styles.screen}`} aria-labelledby="project-title">
          <div className={styles.sectionTop}><button className={styles.back} onClick={() => setScreen("entry")}>← Back</button><p className={styles.step}>LEVEL 01 OF 02</p></div>
          <p className={styles.eyebrow}>CHOOSE YOUR ADVENTURE</p>
          <h1 id="project-title">Let’s build your first project!</h1>
          <p className={styles.projectLede}>Pick one to bring to life:</p>
          <div className={styles.cardGrid}>
            {PROJECTS.map((project) => (
              <button key={project.title} className={`${styles.projectCard} ${project.active ? styles.activeCard : styles.lockedCard}`} onClick={() => chooseProject(project.active)}>
                {!project.active && <span className={styles.comingSoon}>COMING SOON</span>}
                <span className={styles.cardIcon}>{project.icon}</span>
                <strong>{project.title}</strong>
                <small>{project.note}</small>
                {project.active && <span className={styles.cardGo}>Build this →</span>}
              </button>
            ))}
          </div>
          <button className={styles.ownIdea} onClick={jumpToBuild}>I already have my own idea, let’s jump straight in! 🚀</button>
          {toast && <p role="status" className={styles.toast}>{toast}</p>}
        </section>
      )}

      {screen === "tutorial" && (
        <section className={`${styles.tutorial} ${styles.screen}`} aria-labelledby="lesson-title">
          <div className={styles.tutorialHeader}>
            <button className={styles.back} onClick={() => setScreen("projects")}>← Projects</button>
            <div className={styles.progressWrap}><span>YOUR BUILD PROGRESS</span><div><i style={{ width: `${((lesson + 1) / LESSONS.length) * 100}%` }} /></div></div>
            <span className={styles.lessonCount}>{lesson + 1} / {LESSONS.length}</span>
          </div>
          <div className={styles.tutorialGrid}>
            <div className={styles.lessonCopy}>
              <p className={styles.eyebrow}>{current.label}</p>
              <h1 id="lesson-title">{current.title}</h1>
              <p className={styles.lessonBody}>{current.body}</p>
              <div className={styles.promptBox} style={{ background: "#24203f", border: "3px solid #f4c335", boxShadow: "5px 5px 0 #29213d", color: "#fffaf0" }}>
                <span style={{ color: "#ffd84d", fontSize: "0.76rem" }}>PASTE THIS INTO GOOGLE AI STUDIO</span>
                <p style={{ background: "rgba(255,255,255,.075)", fontFamily: "var(--font-mono), monospace", fontStyle: "normal", margin: "16px 0", padding: "15px", whiteSpace: "pre-wrap" }}>“{current.prompt}”</p>
                <div className={styles.promptActions} style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <button onClick={copyPrompt} style={{ background: "#ffd84d", border: "2px solid #ffd84d", boxShadow: "3px 3px 0 #0f0c1d", color: "#211c36", cursor: "pointer", font: "800 .82rem var(--font-mono), monospace", letterSpacing: ".04em", padding: "12px 14px", textDecoration: "none" }}>{copiedPrompt ? "✓ COPIED!" : "▣ COPY PROMPT"}</button>
                  <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ border: "2px solid #aaa1dc", boxShadow: "3px 3px 0 #0f0c1d", color: "#fffaf0", font: "700 .82rem var(--font-mono), monospace", letterSpacing: ".04em", padding: "12px 14px", textDecoration: "none" }}>OPEN AI STUDIO ↗</a>
                </div>
                <small style={{ color: "#d7d1eb", display: "block", marginTop: "16px" }}>1. Copy it &nbsp; 2. Paste it in AI Studio &nbsp; 3. Come back here</small>
              </div>
              {lesson < LESSONS.length - 1 ? (
                <button className={styles.primaryButton} onClick={() => setLesson((step) => step + 1)}>I tried it, next step <span>→</span></button>
              ) : (
                <div className={styles.finishActions}><button className={styles.primaryButton} onClick={() => setScreen("complete")}>Finish quest <span>★</span></button><p style={{ color: "#716a7b", fontSize: ".84rem", margin: 0 }}>Keep chatting in AI Studio until you&apos;re happy with it.</p></div>
              )}
            </div>
            <aside className={styles.previewPanel} aria-label="Your website preview">
              <p style={{ color: "#7a5cff", font: "800 .72rem var(--font-mono), monospace", letterSpacing: ".08em", margin: "0", padding: "14px 14px 0" }}>LIVE PREVIEW</p>
              <div className={styles.browserBar}><i /><i /><i /><span>your-first-site.com</span></div>
              <div className={styles.previewPage}>{lesson === 0 ? <div style={{ border: "2px dashed #a8a0ca", color: "#605a78", fontSize: "1.05rem", lineHeight: 1.5, maxWidth: "450px", padding: "25px", textAlign: "left" }}>Your page is empty for now—and that&apos;s exactly right. Your website will appear here as you go.</div> : <><p>MY FIRST WEBSITE</p><h2>{current.preview}</h2><div className={styles.previewShape}>✦</div><small>Made with AI, made by me.</small></>}</div>
              <div className={styles.previewCaption}><span>LIVE PREVIEW</span><b>Things are taking shape ✨</b></div>
            </aside>
          </div>
        </section>
      )}

      {screen === "complete" && (
        <section className={`${styles.entry} ${styles.screen}`} aria-labelledby="complete-title">
          <div aria-hidden="true" style={{ alignItems: "center", background: "#d8f4e6", border: "3px solid #25213d", boxShadow: "6px 6px 0 #7367e8", display: "flex", fontSize: "3.3rem", height: "112px", justifyContent: "center", marginBottom: "34px", width: "112px" }}>🧑‍🚀</div>
          <p className={styles.eyebrow}>QUEST COMPLETE</p>
          <h1 id="complete-title" style={{ fontSize: "clamp(2.7rem,5vw,4.8rem)" }}>You built a website!</h1>
          <div className={styles.levelBadge} style={{ marginTop: "25px" }}>✦ +1 <span>LEVEL UP · LVL 2</span></div>
          <p className={styles.lede} style={{ marginBottom: "20px" }}>You wrote real HTML, styled it with CSS, and learned how to steer an AI tutor instead of telling it what to do. That&apos;s the whole skill.</p>
          <div style={{ maxWidth: "390px", textAlign: "left", width: "100%" }}>
            <div style={{ display: "flex", font: "800 .72rem var(--font-mono), monospace", justifyContent: "space-between", letterSpacing: ".06em", marginBottom: "7px" }}><span>PERSONAL WEBSITE</span><span>100%</span></div>
            <div style={{ background: "#e8dfcf", border: "2px solid #25213d", height: "14px", padding: "2px" }}><i style={{ background: "#ffd84d", display: "block", height: "100%", width: "100%" }} /></div>
          </div>
          <div className={styles.finishActions} style={{ justifyContent: "center", marginTop: "35px" }}>
            <button className={styles.primaryButton} onClick={jumpToBuild}>Build my own idea next <span>→</span></button>
            <button className={styles.reset} onClick={() => { setScreen("tutorial"); setLesson(0); }}>↻ Replay tutorial</button>
          </div>
        </section>
      )}
    </main>
  );
}
