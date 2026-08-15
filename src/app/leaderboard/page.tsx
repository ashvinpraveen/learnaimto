import type { Metadata } from "next";
import Image from "next/image";
import AimtoNav from "@/app/aimto/AimtoNav";
import AimtoThemeToggle from "@/app/aimto/AimtoThemeToggle";
import { UNIVERSITY_SIGNUP_URL } from "@/lib/constants";
import { getLeaderboardData } from "@/lib/leaderboard";
import LeaderboardAutoRefresh from "./LeaderboardAutoRefresh";
import LeaderboardHeroMotion from "./LeaderboardHeroMotion";
import LeaderboardRows from "./LeaderboardRows";
import ProgressiveHighlight from "./ProgressiveHighlight";
import RippleDotField from "./RippleDotField";
import brandStyles from "@/app/aimto/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "University Leaderboard",
  description:
    "Campus race for the free Malaysian Learn-a-thon on 12 August at The Campus, KL — see which university is bringing the most students.",
  alternates: { canonical: "/leaderboard" },
};

export const revalidate = 300;

function formatUpdatedAt(value: string | null) {
  if (!value) return "Updated recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Updated recently";

  return new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboardData();
  const totalSignups = leaderboard.universities.reduce(
    (sum, university) => sum + university.signups,
    0,
  );
  return (
    <div className={`${brandStyles.site} ${styles.page}`} id="top">
      <LeaderboardAutoRefresh />
      <AimtoNav
        registrationUrl={UNIVERSITY_SIGNUP_URL}
        ctaLabel="University signup"
        openInNewTab
        themeLogo
      />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <RippleDotField className={styles.heroDots} />
          <LeaderboardHeroMotion
            className={styles.heroContent}
            readyClassName={styles.heroMotionReady}
          >
            <p className={styles.eyebrow}>The Malaysian Learn-a-thon</p>
            <h1>
              Which campus will
              <span> take the lead?</span>
            </h1>
            <ProgressiveHighlight
              className={styles.heroCopy}
              prefix="Universities race to bring the most students to "
              text="the free Learn-a-thon on 12 August at The Campus, KL"
              suffix=". Top two can win exclusive merch and AI credits, plus an office visit, co-working session and CEO networking."
            />

            <div className={styles.stats} aria-label="Leaderboard summary">
              <div>
                <strong>All</strong>
                <span>Malaysian universities welcome</span>
              </div>
              <div>
                <strong>{totalSignups}</strong>
                <span>verified student signups</span>
              </div>
              <div>
                <strong>5 MIN</strong>
                <span>REFRESH</span>
              </div>
            </div>

            <p className={styles.deadline}>
              Final tally closes Tuesday, 11 August at 10 PM (MYT).
            </p>
          </LeaderboardHeroMotion>
        </section>

        <section className={styles.boardSection} aria-labelledby="standings-title">
          <div className={styles.boardHeading}>
            <div>
              <p className={styles.sectionLabel}>Campus standings_</p>
              <h2 id="standings-title">The leaderboard</h2>
            </div>
            <div className={styles.updated}>
              <span className={styles.liveDot} />
              {formatUpdatedAt(leaderboard.updatedAt)}
            </div>
          </div>

          <>
            <div className={styles.board}>
              <div className={styles.tableHeader} aria-hidden="true">
                <span>Rank</span>
                <span>University</span>
                <span>Verified signups</span>
              </div>

              <LeaderboardRows universities={leaderboard.universities} />
            </div>

          </>

          <div className={styles.supportGrid}>
            <section className={styles.universitySignup}>
              <h2>Sign up for your university.</h2>
              <div className={styles.signupAction}>
                <p>
                  Add your verified signup and help move your university up the
                  leaderboard.
                </p>
                {UNIVERSITY_SIGNUP_URL ? (
                  <a
                    href={UNIVERSITY_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    University signup <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className={styles.signupPlaceholder}>
                    Form link coming soon
                  </span>
                )}
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
