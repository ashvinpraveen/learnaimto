import type { Metadata } from "next";
import Image from "next/image";
import AimtoNav from "@/app/aimto/AimtoNav";
import AimtoThemeToggle from "@/app/aimto/AimtoThemeToggle";
import { getLeaderboardData } from "@/lib/leaderboard";
import ConfettiCelebration from "./ConfettiCelebration";
import LeaderboardHeroMotion from "./LeaderboardHeroMotion";
import LeaderboardRows from "./LeaderboardRows";
import RippleDotField from "./RippleDotField";
import brandStyles from "@/app/aimto/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "University Leaderboard Winners",
  description:
    "Congratulations to Sunway University and Taylor's University, the Malaysian Learn-a-thon university leaderboard winners.",
  alternates: { canonical: "/leaderboard" },
};

export const revalidate = 300;

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboardData();
  const totalSignups = leaderboard.universities.reduce(
    (sum, university) => sum + university.signups,
    0,
  );
  return (
    <div className={`${brandStyles.site} ${styles.page}`} id="top">
      <AimtoNav
        registrationUrl="#results"
        ctaLabel="See the winners"
        themeLogo
      />

      <main>
        <ConfettiCelebration />
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <RippleDotField className={styles.heroDots} />
          <LeaderboardHeroMotion
            className={styles.heroContent}
            readyClassName={styles.heroMotionReady}
          >
            <p className={styles.eyebrow}>The final results are in</p>
            <h1>The winners have been crowned</h1>
            <p className={styles.heroCopy}>
              Congratulations to 🥇 Sunway University and 🥈 Taylor&apos;s
              University to being our top 2 universities!
            </p>

            <div
              className={`${styles.stats} ${styles.finalStats}`}
              aria-label="Leaderboard summary"
            >
              <div>
                <strong>{totalSignups}</strong>
                <span>final verified signups</span>
              </div>
            </div>
          </LeaderboardHeroMotion>
        </section>

        <section
          className={styles.boardSection}
          id="results"
          aria-labelledby="standings-title"
        >
          <section className={styles.winnerAnnouncement} aria-labelledby="winners-title">
            <p className={styles.sectionLabel}>Official winners_</p>
            <h2 id="winners-title">Sunway &amp; Taylor’s</h2>
            <p className={styles.winnerCopy}>
              Congratulations! Someone from our team will reach out to both
              winning universities through WhatsApp soon with the next steps.
            </p>
            <div className={styles.prizePackage}>
              <div className={styles.prizeLabel}>
                <span>Winning package</span>
              </div>
              <p>
                Exclusive merch and AI credits, plus an office visit,
                co-working session and CEO networking.
              </p>
            </div>
          </section>

          <div className={styles.boardHeading}>
            <div>
              <p className={styles.sectionLabel}>Final campus standings_</p>
              <h2 id="standings-title">The final leaderboard</h2>
            </div>
            <div className={styles.updated}>
              <span className={styles.closedDot} />
              Results final
            </div>
          </div>

          <>
            <div className={styles.board}>
              <div className={styles.tableHeader} aria-hidden="true">
                <span>Rank</span>
                <span>University</span>
                <span>Verified signups</span>
              </div>

              <LeaderboardRows
                universities={leaderboard.universities}
                showChanges={false}
              />
            </div>

          </>

          <div className={styles.supportGrid}>
            <section className={styles.universitySignup}>
              <h2>What happens next?</h2>
              <div className={styles.signupAction}>
                <p>
                  We’ll contact Sunway University and Taylor’s University
                  through WhatsApp soon. Keep an eye on your messages for the
                  details.
                </p>
              </div>
            </section>
          </div>
        </section>

      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLead}>
          <a className={styles.footerBrand} href="#top">
            <Image
              src="/aimto-assets/logo-white.png"
              alt="AI Malaysia Takeover 2026"
              width={600}
              height={113}
              sizes="220px"
            />
          </a>
        </div>

        <div className={styles.footerMeta}>
          <p>© The Malaysian Learn-a-thon 2026</p>
          <div className={styles.footerMetaLinks}>
            <AimtoThemeToggle />
            <a
              href="https://instagram.com/malaysianai"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
