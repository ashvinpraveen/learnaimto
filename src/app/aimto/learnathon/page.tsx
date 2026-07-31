import type { Metadata } from "next";
import Image from "next/image";
import {
  LEARNATHON_FAQS,
  OG_IMAGE,
  REGISTRATION_URL,
  SITE_NAME,
} from "@/lib/constants";
import {
  JsonLd,
  learnathonEventJsonLd,
  learnathonFaqJsonLd,
} from "@/lib/seo";
import AimtoMotion from "../AimtoMotion";
import AimtoNav from "../AimtoNav";
import AimtoScrambleTitle from "../AimtoScrambleTitle";
import AimtoThemeToggle from "../AimtoThemeToggle";
import AimtoButton from "../AimtoButton";
import LearnathonCountdown from "./LearnathonCountdown";
import LearnathonProjects from "./LearnathonProjects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home. 12 August 2026 at The Campus Ampang.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian Learn-a-thon",
    description: "Learn AI, build something useful and take it home.",
    images: [OG_IMAGE.url],
  },
};

const registrationUrl = REGISTRATION_URL;

const tickerItems = [
  "OPEN TO EVERY MALAYSIAN_",
  "LEARN AI_",
  "AI FOR THE UNCLES_",
  "AI FOR THE AUNTIES_",
  "AI FOR THE KIDS_",
  "BUILD SOMETHING FOR YOURSELF_",
  "HANDS-ON HELP FROM EXPERTS_",
  "FREE AI TOOLS_",
  "SHOW + TELL_",
  "TAKE YOUR BUILD HOME_",
];

const whatYouGet = [
  {
    number: "01",
    title: "Free support",
    body: "Hands-on help from mentors and trainers whenever you get stuck.",
    image: "/aimto-assets/learnathon-zones/mentor-helpdesk.jpg",
  },
  {
    number: "02",
    title: "Free AI tools",
    body: "Access the tools you need to learn, build and publish on the day.",
    image: "/aimto-assets/learnathon-zones/starter-kits.jpg",
  },
  {
    number: "03",
    title: "See what other people are building",
    body: "Catch show and tells from fellow Malaysians building in the open.",
    image: "/aimto-assets/learnathon-zones/show-and-tell.jpg",
  },
  {
    number: "04",
    title: "A day of fun, community and your own working apps",
    body: "Leave with new friends, new skills and something you actually made.",
    image: "/aimto-assets/learnathon-zones/builder-floor.jpg",
  },
];

const learnathonStats = [
  { value: "3,000+", label: "International & Local Participants" },
  { value: "1,000+", label: "Hacker House Participants" },
  { value: "50+", label: "Local & International Speakers" },
  { value: "50+", label: "Sponsors & Exhibitors" },
];

const faqs = LEARNATHON_FAQS;

export default function LearnathonThreePage() {
  return (
    <div className={styles.site} id="aimto-learnathon-site">
      <JsonLd data={learnathonEventJsonLd()} />
      <JsonLd data={learnathonFaqJsonLd()} />
      <AimtoMotion rootId="aimto-learnathon-site" />
      <AimtoNav registrationUrl={registrationUrl} />

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1>
              The Malaysian
              <br />
              <span>Learn-a-thon</span>
            </h1>
            <p className={styles.heroIntro}>
              Open to any and every Malaysian: Learn AI. Build something for
              yourself. Hands on help from experts. Where else can get? Free
              some more. Just come!
            </p>
            <div className={styles.heroEventMeta}>
              <div className={styles.heroDate}>
                <strong>
                  12
                  <br />
                  AUG 2026
                </strong>
              </div>
              <div className={styles.heroPlace}>
                <span>VENUE_</span>
                <strong>
                  THE CAMPUS
                  <br />
                  KUALA LUMPUR
                </strong>
              </div>
            </div>
            <div className={styles.heroActions}>
              <AimtoButton className={styles.ctaButton} href={registrationUrl}>
                Sign up free <span aria-hidden="true">↗</span>
              </AimtoButton>
              <a className={styles.textLink} href="#overview">
                About the day <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroOrganisers} aria-label="Event organisers">
            <span>ORGANISED BY_</span>
            <div>
              <Image
                src="/aimto-assets/ludic-logo-white.png"
                alt="Ludic Asia"
                width={800}
                height={275}
                sizes="110px"
              />
              <Image
                src="/aimto-assets/500-logo-white.png"
                alt="500 Global"
                width={800}
                height={275}
                sizes="100px"
              />
            </div>
          </div>

          <div className={styles.ticker} aria-label="Learn-a-thon highlights">
            <div className={styles.tickerTrack}>
              <div className={styles.tickerGroup}>
                {tickerItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={styles.tickerGroup} aria-hidden="true">
                {tickerItems.map((item) => (
                  <span key={`${item}-repeat`}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.proof}
          aria-label="Learn-a-thon at a glance"
          data-reveal="up"
        >
          {learnathonStats.map((stat) => (
            <div className={styles.proofStat} key={stat.label}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        <section className={styles.introSection} id="overview">
          <div className={styles.sectionLabel} data-reveal="up">
            ABOUT_
          </div>
          <div className={styles.introLayout} data-reveal="up">
            <AimtoScrambleTitle />
            <div
              className={`${styles.introCopy} ${styles.learnathonIntroCopy}`}
            >
              <p className={styles.lead}>
                &ldquo;Building cool things with AI has never been easier.
                Especially with hands-on support!&rdquo;
              </p>
              <p>
                The Learn-a-thon is a space where anyone with zero experience
                can learn to build apps and websites and publish them all within
                a day.
              </p>
              <p>
                It&apos;ll be a fun day filled with activities and support from
                leading AI trainers in Malaysia — and it&apos;s free!
              </p>
            </div>
            <div className={styles.introArtwork} data-reveal="soft">
              <Image
                src="/aimto-assets/digital-hibiscus.png"
                alt="A hibiscus constructed from hot-pink and violet ASCII characters"
                width={1402}
                height={1122}
                sizes="(max-width: 680px) calc(100vw - 40px), 360px"
              />
            </div>
          </div>
        </section>

        <LearnathonProjects />

        <section className={styles.zonesSection} id="experience">
          <div className={styles.sectionHeading} data-reveal="up">
            <div className={styles.sectionLabel}>THE DAY_</div>
            <h2>What you&apos;ll get</h2>
          </div>
          <div className={`${styles.zonesGrid} ${styles.benefitsGrid}`} data-reveal="stagger">
            {whatYouGet.map((item) => (
              <article className={styles.zoneCard} key={item.number}>
                <Image
                  src={item.image}
                  alt=""
                  width={800}
                  height={520}
                  sizes="(max-width: 680px) 100vw, 50vw"
                />
                <div className={styles.zoneMeta}>
                  <span className={styles.zoneIndex}>{item.number}_</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/*
        <section className={styles.learningToolsSection} aria-labelledby="learn-latest-ai-tools">
          <div className={styles.sectionHeading} data-reveal="up">
            <h2 id="learn-latest-ai-tools">
              Learn the latest AI tools & tech
            </h2>
            <p className={styles.learningToolsCopy}>
              Mentors, support and community to help you learn the latest tools.
            </p>
          </div>
          <div
            className={styles.toolLogoStrip}
            aria-hidden="true"
            data-reveal="up"
          >
            <div className={styles.toolLogoStripTrack}>
              {Array.from({ length: 8 }).map((_, index) => (
                <span className={styles.toolLogoSlot} key={`tool-slot-${index}`} />
              ))}
            </div>
          </div>
        </section>
        */}

        <LearnathonCountdown />

        <section className={styles.campusSection} id="campus">
          <div className={styles.campusCopy} data-reveal="up">
            <div className={styles.campusIntro}>
              <div className={styles.sectionLabel}>VENUE_</div>
              <h2>Located at The Campus</h2>
              <p>
                Experience the future in a familiar space. The Campus is a
                former school, reimagined as an open-air community hub, with
                courtyards, halls and shared spaces made for people to gather.
                For one day, it becomes Malaysia&apos;s shared AI builder floor.
              </p>
            </div>
            <div className={styles.campusMeta}>
              <address>
                The Campus Ampang
                <br />
                Jalan Kolam Air Lama
                <br />
                Ampang, Kuala Lumpur
              </address>
              <a
                className={styles.textLink}
                href="https://maps.google.com/?q=The+Campus+Ampang"
              >
                Open in maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.campusGallery} data-reveal="stagger">
            <Image
              className={styles.campusMain}
              src="/aimto-assets/campus-steps.jpg"
              alt="The Campus Ampang amphitheatre steps"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 100vw, 70vw"
            />
            <Image
              className={styles.campusRoof}
              src="/aimto-assets/campus-exterior.jpg"
              alt="The Campus Ampang exterior"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
            <Image
              className={styles.campusCourtyard}
              src="/aimto-assets/campus-courtyard.jpg"
              alt="The Campus Ampang open-air courtyard"
              width={1000}
              height={1500}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
          </div>
          <p className={styles.campusCredit}>
            Photography: H. Lin Ho Photography and Amran Bin Yahaya. Images via{" "}
            <a
              href="https://architecturemalaysia.my/2026/06/24/the-campus-ampang/"
              target="_blank"
              rel="noreferrer"
            >
              Architecture Malaysia
            </a>
            .
          </p>
        </section>

        {/*
        <section className={styles.fullEventSection} aria-labelledby="join-the-full-event">
          <div className={styles.fullEventIntro} data-reveal="up">
            <div className={styles.sectionLabel}>THE FULL EVENT_</div>
            <h2 id="join-the-full-event">Your build day is just the beginning.</h2>
            <p>
              Join the full AI Malaysia Takeover: two days of workshops, talks and
              panels with leaders from across Malaysia.
            </p>
          </div>
        </section>
        */}

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <div className={styles.sectionLabel}>FAQ_</div>
            <h2>Questions &amp; answers</h2>
          </div>
          <div className={styles.faqList} data-reveal="up">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}_</span>
                  <h3>{faq.question}</h3>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCopy} data-reveal="up">
            <h2>
              <span>Jommm</span> sign up
            </h2>
            <p className={styles.finalDescription}>
              Open to any and every Malaysian. Free. Just come!
            </p>
          </div>
          <AimtoButton
            className={`${styles.ctaButton} ${styles.finalCtaButton}`}
            href={registrationUrl}
            data-reveal="up"
          >
            Sign up free <span aria-hidden="true">↗</span>
          </AimtoButton>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerLead}>
          <div>
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
