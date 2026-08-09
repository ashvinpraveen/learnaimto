"use client";

import { useId, useState, type FormEvent } from "react";
import { jsPDF } from "jspdf";
import CertificateCanvas, { getCertificateCanvas } from "./CertificateCanvas";
import {
  CERT_HEIGHT,
  CERT_WIDTH,
  canvasToBlob,
  slugifyName,
  triggerDownload,
} from "./certificate";
import styles from "./page.module.css";

type View = "form" | "certificate";

export default function CertApp() {
  const nameId = useId();
  const [draftName, setDraftName] = useState("");
  const [name, setName] = useState("");
  const [view, setView] = useState<View>("form");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState<"png" | "pdf" | "share" | null>(null);
  const [status, setStatus] = useState("");
  const [certRoot, setCertRoot] = useState<HTMLDivElement | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = draftName.trim();
    if (!next) {
      setStatus("Enter your name to generate a certificate.");
      return;
    }
    setName(next);
    setView("certificate");
    setReady(false);
    setStatus("");
  };

  const withCanvas = async (
    action: "png" | "pdf" | "share",
    run: (canvas: HTMLCanvasElement) => Promise<void>,
  ) => {
    const canvas = getCertificateCanvas(certRoot);
    if (!canvas || !ready) {
      setStatus("Certificate is still loading — try again in a moment.");
      return;
    }

    setBusy(action);
    setStatus("");
    try {
      await run(canvas);
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const downloadPng = () =>
    withCanvas("png", async (canvas) => {
      const blob = await canvasToBlob(canvas, "image/png");
      triggerDownload(
        blob,
        `aimto-learnathon-certificate-${slugifyName(name)}.png`,
      );
      setStatus("PNG downloaded.");
    });

  const downloadPdf = () =>
    withCanvas("pdf", async (canvas) => {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [CERT_WIDTH, CERT_HEIGHT],
        hotfixes: ["px_scaling"],
      });
      pdf.addImage(dataUrl, "JPEG", 0, 0, CERT_WIDTH, CERT_HEIGHT, undefined, "FAST");
      pdf.save(`aimto-learnathon-certificate-${slugifyName(name)}.pdf`);
      setStatus("PDF downloaded.");
    });

  const shareCertificate = () =>
    withCanvas("share", async (canvas) => {
      const blob = await canvasToBlob(canvas, "image/png");
      const file = new File(
        [blob],
        `aimto-learnathon-certificate-${slugifyName(name)}.png`,
        { type: "image/png" },
      );
      const shareData: ShareData = {
        title: "AIMTO Learn-a-thon Certificate",
        text: `I earned a Certificate of Participation at the Malaysian Learn-a-thon — AI Malaysia Takeover 2026.`,
        files: [file],
      };

      if (
        typeof navigator.share === "function" &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        await navigator.share(shareData);
        setStatus("Shared.");
        return;
      }

      if (typeof navigator.share === "function") {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: window.location.href,
        });
        setStatus("Shared.");
        return;
      }

      triggerDownload(file, file.name);
      setStatus("Sharing isn’t supported here — downloaded PNG instead.");
    });

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      {view === "form" ? (
        <section className={styles.formPanel} aria-labelledby="cert-title">
          <p className={styles.eyebrow}>AI Malaysia Takeover 2026</p>
          <h1 id="cert-title" className={styles.title}>
            Certificate
          </h1>
          <p className={styles.lede}>
            Enter your name to generate your Learn-a-thon certificate of
            participation.
          </p>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.label} htmlFor={nameId}>
              Name
            </label>
            <input
              id={nameId}
              className={styles.input}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              maxLength={80}
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              autoFocus
            />
            <button className={styles.primaryButton} type="submit">
              Generate certificate
            </button>
          </form>

          {status ? (
            <p className={styles.status} role="status">
              {status}
            </p>
          ) : null}
        </section>
      ) : (
        <section className={styles.certPanel} aria-labelledby="cert-ready-title">
          <div className={styles.certHeader}>
            <div>
              <p className={styles.eyebrow}>Your certificate</p>
              <h1 id="cert-ready-title" className={styles.certTitle}>
                Looking good, {name}.
              </h1>
            </div>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => {
                setView("form");
                setDraftName(name);
                setStatus("");
              }}
            >
              Edit name
            </button>
          </div>

          <div ref={setCertRoot} className={styles.certificateFrame}>
            <CertificateCanvas name={name} onReadyChange={setReady} />
            {!ready ? (
              <p className={styles.loading} role="status">
                Rendering certificate…
              </p>
            ) : null}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={downloadPng}
              disabled={!ready || busy !== null}
            >
              {busy === "png" ? "Preparing…" : "Download PNG"}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={downloadPdf}
              disabled={!ready || busy !== null}
            >
              {busy === "pdf" ? "Preparing…" : "Download PDF"}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={shareCertificate}
              disabled={!ready || busy !== null}
            >
              {busy === "share" ? "Opening…" : "Share"}
            </button>
          </div>

          {status ? (
            <p className={styles.status} role="status">
              {status}
            </p>
          ) : null}
        </section>
      )}
    </main>
  );
}
