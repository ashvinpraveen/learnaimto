import type { Metadata } from "next";
import Image from "next/image";
import AimtoMotion from "../AimtoMotion";
import AimtoNav from "../AimtoNav";
import AimtoScrambleTitle from "../AimtoScrambleTitle";
import AimtoButton from "./AimtoButton";
import LearnathonCountdown from "./LearnathonCountdown";
import LearnathonProjects from "./LearnathonProjects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  },
  icons: {
    icon: [
      {
        url: "/aimto-assets/favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home. 12 August 2026 at The Campus Ampang.",
    url: "/aimto/learnathon",
    type: "website",
    images: [
      {
        url: "/aimto-assets/learnathon-builder-floor.jpg",
        width: 1536,
        height: 1024,
        alt: "A collaborative AI builder floor at The Campus Ampang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home.",
    images: ["/aimto-assets/learnathon-builder-floor.jpg"],
  },
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const tickerItems = [
  "OPEN TO EVERY MALAYSIAN_",
  "LEARN AI_",
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

const trainers = [
  {
    name: "Timothy Tiah",
    title: "Founder & CEO, Colony",
    bio: "Founder and CEO of Colony and co-founder of Nuffnang, sharing practical lessons from building and scaling Malaysian companies.",
    image: "/aimto-assets/trainers/timothy-tiah.png",
  },
  {
    name: "Jon Lai",
    title: "Founder & CEO, Atomic Group",
    bio: "Founder and CEO of Atomic Group, building digital-first consumer brands in health and wellness.",
    image: "/aimto-assets/trainers/jon-lai.jpg",
  },
  {
    name: "Warren Leow",
    title: "Founder & Strategy Lead, AITraining2U",
    bio: "Former Bain consultant and former CEO of Designs.ai, now leading practical AI training and automation at AITraining2U.",
    image: "/aimto-assets/trainers/warren-leow.jpg",
  },
  {
    name: "Danial Hadi",
    title: "Founder, KrackedDevs",
    bio: "Founder of KrackedDevs, a Malaysian builder community where people learn, build and ship real software projects.",
    image: "/aimto-assets/trainers/danial-hadi.jpg",
  },
];

const faqs = [
  {
    question: "Is the Learn-a-thon free?",
    answer:
      "Yes. Public registration is free. Some AI tools may have optional paid plans after the event; we will make any tool requirements clear before the day.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. Complete beginners are welcome, with setup support, practical sessions and mentors who can help you take the next step.",
  },
  {
    question: "Should I bring a laptop?",
    answer:
      "Yes—bring a laptop and charger if you want to build. We will share any account or setup guidance before the day.",
  },
  {
    question: "What if I have no idea what to build?",
    answer:
      "That is exactly what the Inspiration Board is for. Choose a beginner prompt, browse community problems or find a teammate at the Build Wall.",
  },
  {
    question: "Can experienced builders join?",
    answer:
      "Absolutely. Take on a challenge, explore advanced tools, meet other builders, showcase a project or help someone who is just getting started.",
  },
  {
    question: "Do I have to present my project?",
    answer:
      "No. Show and Tell is optional. You can submit to the Builder Gallery, quietly take your project home or volunteer for a five-minute demo.",
  },
];

export default function LearnathonThreePage() {
  return (
    <div className={styles.site} id="aimto-learnathon-site">
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
              <AimtoButton href={registrationUrl}>
                Sign up <span aria-hidden="true">↗</span>
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

        <section
          className={styles.trainersSection}
          aria-labelledby="trainers-title"
          id="trainers"
        >
          <div className={styles.trainersIntro} data-reveal="up">
            <div>
              <div className={styles.sectionLabel}>
                REAL BUILDERS, BESIDE YOU_
              </div>
              <h2 id="trainers-title">Speakers and mentors</h2>
            </div>
            <p>
              Learn from people doing the work, ask the difficult question and
              get practical help when your build needs a push.
            </p>
          </div>
          <div
            className={styles.trainersGrid}
            aria-label="Learn-a-thon speakers and mentors"
            data-reveal="stagger"
          >
            {trainers.map((trainer) => (
              <article className={styles.trainerCard} key={trainer.name}>
                <div className={styles.trainerPortrait}>
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1000px) 44vw, 22vw"
                  />
                </div>
                <div className={styles.trainerDetails}>
                  <h3>{trainer.name}</h3>
                  <small>{trainer.title}</small>
                  <p>{trainer.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.trainersMore}>
            MORE SPEAKERS AND MENTORS TO BE ANNOUNCED_
          </p>
        </section>

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

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <div className={styles.sectionLabel}>FAQ_</div>
            <h2>Questions &amp; Answers</h2>
          </div>
          <div className={styles.faqList} data-reveal="up">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}_</span>
                  {faq.question}
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalGlow} aria-hidden="true" />
          <div data-reveal="up">
            <h2>
              <span>Jommm</span> sign up
            </h2>
            <p className={styles.finalDescription}>
              Open to any and every Malaysian. Free. Just come!
            </p>
            <AimtoButton href={registrationUrl}>
              Sign up <span aria-hidden="true">↗</span>
            </AimtoButton>
          </div>
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
            <p>Malaysia learns AI by building, together.</p>
          </div>
          <AimtoButton className={styles.footerCta} href={registrationUrl}>
            Sign up <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>

        <nav className={styles.footerNav} aria-label="Footer navigation">
          <div>
            <h2>Program_</h2>
            <a href="#overview">About the Learn-a-thon</a>
            <a href="#inspiration">What you could build</a>
            <a href="#experience">What you&apos;ll get</a>
            <a href="#trainers">Speakers and mentors</a>
          </div>
          <div>
            <h2>About_</h2>
            <a href="/aimto">AI Malaysia Takeover</a>
            <a href="#campus">The Campus</a>
            <a href="https://instagram.com/malaysianai">
              Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            <h2>Attend_</h2>
            <a href={registrationUrl}>Sign up</a>
            <a href="#campus">Get here</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <h2>Legal_</h2>
            <a href="/privacy">Privacy notice</a>
            <a href="/terms">Terms &amp; conditions</a>
          </div>
        </nav>

        <div className={styles.footerMeta}>
          <p>© The Malaysian Learn-a-thon 2026</p>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
