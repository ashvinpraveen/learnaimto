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
import AimtoMotion from "../aimto/AimtoMotion";
import AimtoNav from "../aimto/AimtoNav";
import AimtoScrambleTitle from "../aimto/AimtoScrambleTitle";
import AimtoThemeToggle from "../aimto/AimtoThemeToggle";
import AimtoButton from "../aimto/AimtoButton";
import LearnathonCountdown from "../aimto/learnathon/LearnathonCountdown";
import LearnathonProjects from "../aimto/learnathon/LearnathonProjects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  alternates: {
    canonical: "/v2",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home. 12 August 2026 at The Campus Ampang.",
    url: "/v2",
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
  { value: "1,000+", label: "AI builders" },
  { value: "50+", label: "Local & International Speakers" },
  { value: "50+", label: "Sponsors & Exhibitors" },
];

const faqs = LEARNATHON_FAQS;

/** Partner logos sourced from the AIMTO 2026 partners strip on aimto.my */
const partners = [
  {
    name: "Ministry of Digital",
    src: "/aimto-assets/partners/ministry-of-digital.jpg",
    width: 181,
    height: 169,
  },
  {
    name: "MyDIGITAL",
    src: "/aimto-assets/partners/mydigital.jpg",
    width: 408,
    height: 169,
  },
  {
    name: "YTL",
    src: "/aimto-assets/partners/ytl.jpg",
    width: 408,
    height: 169,
  },
  {
    name: "500 Global",
    src: "/aimto-assets/partners/500-global.jpg",
    width: 622,
    height: 214,
  },
  {
    name: "M30",
    src: "/aimto-assets/partners/m30.png",
    width: 1267,
    height: 295,
  },
  {
    name: "Kracked Devs",
    src: "/aimto-assets/partners/kracked-devs.jpg",
    width: 600,
    height: 256,
  },
  {
    name: "Women in Tech",
    src: "/aimto-assets/partners/women-in-tech.jpg",
    width: 600,
    height: 261,
  },
  {
    name: "AI SEA",
    src: "/aimto-assets/partners/ai-sea.jpg",
    width: 271,
    height: 271,
  },
  {
    name: "Malaysian AI",
    src: "/aimto-assets/partners/malaysian-ai.png",
    width: 966,
    height: 966,
  },
  {
    name: "Build with AI",
    src: "/aimto-assets/partners/build-with-ai.jpeg",
    width: 200,
    height: 200,
  },
  {
    name: "Build Club",
    src: "/aimto-assets/partners/build-club.webp",
    width: 512,
    height: 512,
  },
  {
    name: "AI Tinkerers",
    src: "/aimto-assets/partners/ai-tinkerers.png",
    width: 810,
    height: 179,
  },
  {
    name: "AI Hackerdorm",
    src: "/aimto-assets/partners/ai-hackerdorm.webp",
    width: 512,
    height: 512,
  },
  {
    name: "Rakan Tutor",
    src: "/aimto-assets/partners/rakan-tutor.png",
    width: 373,
    height: 219,
  },
  {
    name: "CoderPuffs",
    src: "/aimto-assets/partners/coderpuffs.png",
    width: 702,
    height: 727,
  },
  {
    name: "Cursor Community",
    src: "/aimto-assets/partners/cursor-community.png",
    width: 1003,
    height: 1003,
  },
  {
    name: "Tealive",
    src: "/aimto-assets/partners/tealive.jpg",
    width: 396,
    height: 105,
  },
  {
    name: "EmbeddedLLM",
    src: "/aimto-assets/partners/embedded-llm.jpg",
    width: 600,
    height: 152,
  },
  {
    name: "The Campus",
    src: "/aimto-assets/partners/the-campus.jpg",
    width: 212,
    height: 212,
  },
  {
    name: "LuasLink",
    src: "/aimto-assets/partners/luaslink.jpg",
    width: 600,
    height: 261,
  },
] as const;

/** Mirrors the current partner hierarchy published on aimto.my. */
const partnerGroups = [
  { label: "Supported by", partners: partners.slice(0, 1) },
  { label: "Strategic Partner", partners: partners.slice(1, 2) },
  { label: "AI Platform Partner", partners: partners.slice(2, 3) },
  { label: "VC Partner", partners: partners.slice(3, 4) },
  {
    label: "Ecosystem & Community Partners",
    partners: [
      partners[8],
      partners[5],
      partners[7],
      partners[4],
      partners[6],
      partners[9],
      partners[11],
      partners[12],
      partners[14],
      partners[13],
      partners[15],
      partners[10],
    ],
  },
  { label: "Event Partners", partners: partners.slice(16, 18) },
  { label: "Venue Partner", partners: partners.slice(18, 19) },
  { label: "Event Internet Partner", partners: partners.slice(19, 20) },
] as const;

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
            <div className={styles.introCopy}>
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

        <section
          className={styles.partnersSection}
          id="partners"
          aria-label="Partners"
        >
          <div className={styles.partnersBoard} data-reveal="stagger">
            <div className={styles.partnerTopRow}>
              {partnerGroups.slice(0, 4).map((group) => (
                <PartnerGroup key={group.label} group={group} />
              ))}
            </div>
            <div className={styles.partnerDivider} aria-hidden="true" />
            <div className={styles.partnerMiddleRow}>
              {partnerGroups.slice(4, 5).map((group) => (
                <PartnerGroup key={group.label} group={group} />
              ))}
            </div>
            <div className={styles.partnerDivider} aria-hidden="true" />
            <div className={styles.partnerBottomRow}>
              {partnerGroups.slice(5).map((group) => (
                <PartnerGroup key={group.label} group={group} />
              ))}
            </div>
          </div>
        </section>

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

function PartnerGroup({
  group,
}: {
  group: (typeof partnerGroups)[number];
}) {
  return (
    <div className={styles.partnerGroup}>
      <p className={styles.partnerGroupLabel}>{group.label}</p>
      <div className={styles.partnerGroupLogos}>
        {group.partners.map((partner) => (
          partner.name === "Malaysian AI" ? (
            <div className={styles.malaysianAiLockup} key={partner.name}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                sizes="42px"
              />
              <span>Malaysian.ai</span>
            </div>
          ) : (
            <Image
              key={partner.name}
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              sizes="(max-width: 700px) 130px, 200px"
            />
          )
        ))}
      </div>
    </div>
  );
}
