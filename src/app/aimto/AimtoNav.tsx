"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AimtoButton from "./AimtoButton";
import styles from "./page.module.css";

type AimtoNavProps = {
  registrationUrl: string;
  themeLogo?: boolean;
};

export default function AimtoNav({ registrationUrl, themeLogo = false }: AimtoNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.navWrap}>
      <nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""} ${
          themeLogo ? styles.navThemeLogo : ""
        }`}
        data-scrolled={scrolled ? "true" : "false"}
        aria-label="AI Malaysia Takeover"
      >
        <a
          className={styles.brand}
          href="/"
          aria-label="AI Malaysia Takeover home"
        >
          <Image
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
            width={600}
            height={113}
            sizes="188px"
            priority
            className={styles.brandLogo}
          />
        </a>
        <div className={styles.navActions}>
          <AimtoButton
            className={`${styles.ctaButton} ${styles.navCta}`}
            href={registrationUrl}
          >
            Sign up free <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>
        <div className={styles.mobileNavActions}>
          <AimtoButton
            className={`${styles.ctaButton} ${styles.mobileJoinCta}`}
            href={registrationUrl}
          >
            Sign up free <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>
      </nav>
    </header>
  );
}
