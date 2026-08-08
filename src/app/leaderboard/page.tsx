import type { Metadata } from "next";
import Image from "next/image";
import AimtoNav from "@/app/aimto/AimtoNav";
import AimtoThemeToggle from "@/app/aimto/AimtoThemeToggle";
import { REGISTRATION_URL, UNIVERSITY_SIGNUP_URL } from "@/lib/constants";
import { getLeaderboardData } from "@/lib/leaderboard";
import LeaderboardHeroMotion from "./LeaderboardHeroMotion";
import ProgressiveHighlight from "./ProgressiveHighlight";
import RippleDotField from "./RippleDotField";
import brandStyles from "@/app/aimto/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "University Leaderboard",
  description:
    "See which Malaysian university is bringing the biggest student community to the Malaysian Learn-a-thon.",
  alternates: { canonical: "/leaderboard" },
};

export const revalidate = 86_400;

const rankLabels = ["01", "02", "03"];

function formatUpdatedAt(value: string | null) {
  if (!value) return "Coming soon";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Updated daily";

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
      <AimtoNav registrationUrl={REGISTRATION_URL} themeLogo />

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
              prefix="The top two universities get a chance to win "
              text="exclusive merch and AI credits, plus an office visit, co-working session and CEO networking."
            />

            <div className={styles.stats} aria-label="Leaderboard summary">
              <div>
                <strong>All</strong>
                <span>Malaysian universities welcome</span>
              </div>
              <div>
                <strong>{leaderboard.isLive ? totalSignups : "Soon"}</strong>
                <span>
                  {leaderboard.isLive
                    ? "verified student signups"
                    : "first standings"}
                </span>
              </div>
              <div>
                <strong>10 PM</strong>
                <span>daily refresh (MYT)</span>
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
            {leaderboard.isLive && (
              <div className={styles.updated}>
                <span className={styles.liveDot} />
                {formatUpdatedAt(leaderboard.updatedAt)}
              </div>
            )}
          </div>

          {leaderboard.isLive ? (
            <>
              <div className={styles.board}>
                <div className={styles.tableHeader} aria-hidden="true">
                  <span>Rank</span>
                  <span>University</span>
                  <span>Verified signups</span>
                </div>

                <ol className={styles.rows}>
                  {leaderboard.universities.map((university, index) => (
                    <li
                      className={`${styles.row} ${index < 3 ? styles[`rank${index + 1}`] : ""}`}
                      key={university.name}
                    >
                      <span className={styles.rank} aria-label={`Rank ${index + 1}`}>
                        {index < 2 ? (
                          <Image
                            className={styles.rankCoin}
                            src={
                              index === 0
                                ? "/aimto-assets/leaderboard-first-place-cutout.png"
                                : "/aimto-assets/leaderboard-second-place-cutout-v2.png"
                            }
                            alt={
                              index === 0
                                ? "Gold 01 placement coin"
                                : "Silver 02 placement coin"
                            }
                            width={72}
                            height={72}
                          />
                        ) : (
                          rankLabels[index] ?? String(index + 1).padStart(2, "0")
                        )}
                      </span>
                      <div className={styles.university}>
                        <strong>{university.name}</strong>
                        {index === 2 && <span>Almost there</span>}
                      </div>
                      <span className={styles.signups}>
                        <b>{university.signups}</b>
                        <small>
                          {university.signups === 1 ? "signup" : "signups"}
                        </small>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className={styles.note}>
                One verified student email counts as one point for that student&apos;s
                university. Each email address is counted once. Any Malaysian university
                can join; a new university appears after its first verified signup.
              </p>
            </>
          ) : (
            <div className={styles.comingSoonStage}>
              <div className={styles.previewBoard} aria-hidden="true">
                <div className={styles.tableHeader}>
                  <span>Rank</span>
                  <span>University</span>
                  <span>Verified signups</span>
                </div>
                <ol className={styles.rows}>
                  {leaderboard.universities.map((university, index) => (
                    <li className={styles.row} key={university.name}>
                      <span className={styles.rank}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={styles.university}>
                        <strong>{university.name}</strong>
                      </div>
                      <span className={styles.signups}>—</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.comingSoon}>
                <h3>Coming soon.</h3>
              </div>
            </div>
          )}

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
                    rel="noreferrer"
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
