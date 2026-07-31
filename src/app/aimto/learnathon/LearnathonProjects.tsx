import Image from "next/image";
import styles from "./page.module.css";

type ProjectIdea = {
  type: string;
  prompt: string;
  image: string;
  alt: string;
};

const projectIdeas: ProjectIdea[] = [
  {
    type: "Ordering website",
    prompt:
      "Make me a website for people to order my home-cooked cinnamon rolls",
    image: "/aimto-assets/learnathon-inspiration-cinnamon-rolls.jpg",
    alt: "An artistic neon collage of a Malaysian home baker preparing cinnamon rolls for online orders",
  },
  {
    type: "Trip planner",
    prompt:
      "Make me a trip planner that builds an itinerary around my family's interests and budget",
    image: "/aimto-assets/learnathon-project-trip-planner.jpg",
    alt: "A multigenerational Chinese Malaysian family planning a trip together",
  },
  {
    type: "Personal money tracker",
    prompt:
      "Make me a personal money tracker that shows where my money goes and helps me save for my goals",
    image: "/aimto-assets/learnathon-project-money-tracker.jpg",
    alt: "An Indian Malaysian woman organising her personal finances with a laptop",
  },
  {
    type: "Boss battle study game",
    prompt:
      "Make me a study game that turns revision into boss battles, levels and rewards",
    image: "/aimto-assets/learnathon-project-study-game.jpg",
    alt: "Malay, Chinese and Indian Malaysian teenagers studying together with a playful digital game world",
  },
  {
    type: "Wedding planner",
    prompt:
      "Make me a wedding planner to keep my guest list, budget, vendors and checklist in one place",
    image: "/aimto-assets/learnathon-project-wedding-planner.jpg",
    alt: "A Malay Malaysian couple planning their wedding with a laptop and celebration details",
  },
  {
    type: "Invoice automation",
    prompt:
      "Make me an app that creates invoices, tracks payments and follows up with customers automatically",
    image: "/aimto-assets/learnathon-project-invoice-automation.jpg",
    alt: "A Chinese Malaysian small-business owner managing invoices and customer orders",
  },
  {
    type: "Personal AI assistant",
    prompt:
      "Make me a personal AI assistant that keeps me organised and brings me the news I care about",
    image: "/aimto-assets/learnathon-project-personal-ai-assistant.jpg",
    alt: "An Indian Malaysian man using a friendly personal AI assistant at home",
  },
  {
    type: "Fitness & calorie coach",
    prompt:
      "Make me a fitness coach that plans my workouts, tracks my meals and helps me hit my goals",
    image: "/aimto-assets/learnathon-project-fitness-coach.jpg",
    alt: "Malay and Chinese Malaysian friends using a fitness and meal coach together",
  },
  {
    type: "Family care organiser",
    prompt:
      "Make me a family care organiser for medicine, appointments, school schedules and reminders",
    image: "/aimto-assets/learnathon-project-family-care.jpg",
    alt: "An Indian Malaysian mother, elderly Chinese Malaysian father and Malay Malaysian child using a family care organiser",
  },
];

function ProjectCard({
  idea,
  duplicate = false,
}: {
  idea: ProjectIdea;
  duplicate?: boolean;
}) {
  return (
    <article
      className={styles.projectCard}
      aria-hidden={duplicate || undefined}
    >
      <div className={styles.projectVisual}>
        <Image
          src={idea.image}
          alt={duplicate ? "" : idea.alt}
          fill
          sizes="(max-width: 680px) 78vw, 320px"
          unoptimized
        />
      </div>
      <div className={styles.projectDetails}>
        <small>{idea.type}</small>
        <h3>{idea.prompt}</h3>
      </div>
    </article>
  );
}

export default function LearnathonProjects() {
  return (
    <section
      className={styles.projectsSection}
      aria-labelledby="learnathon-projects-title"
      id="inspiration"
    >
      <div className={styles.projectsIntro} data-reveal="up">
        <div className={styles.sectionLabel}>INSPIRATION_</div>
        <h2 id="learnathon-projects-title">What you could build</h2>
        <p>
          Here&apos;s some ideas what other Malaysians are building, but feel
          free to bring your own ideas. All you need is a laptop and we&apos;ll
          guide you every step on the way.
        </p>
      </div>

      <div
        className={styles.projectsCarousel}
        aria-label="Example Learn-a-thon projects"
        data-reveal="up"
      >
        <div className={styles.projectsCarouselTrack}>
          <div className={styles.projectsCarouselGroup}>
            {projectIdeas.map((idea) => (
              <ProjectCard idea={idea} key={idea.type} />
            ))}
          </div>
          <div className={styles.projectsCarouselGroup} aria-hidden="true">
            {projectIdeas.map((idea) => (
              <ProjectCard idea={idea} key={`${idea.type}-repeat`} duplicate />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
