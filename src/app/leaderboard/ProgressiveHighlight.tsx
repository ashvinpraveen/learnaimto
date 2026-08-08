"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import styles from "./page.module.css";

type HighlightLine = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type ProgressiveHighlightProps = {
  className: string;
  prefix: string;
  text: string;
};

const animationDelay = 2;
const animationDuration = 4.4;

export default function ProgressiveHighlight({
  className,
  prefix,
  text,
}: ProgressiveHighlightProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const highlightedTextRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<HighlightLine[]>([]);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    const highlightedText = highlightedTextRef.current;
    if (!paragraph || !highlightedText) return;

    const measureLines = () => {
      const paragraphRect = paragraph.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(highlightedText);

      const nextLines = Array.from(range.getClientRects())
        .filter((rect) => rect.width > 0 && rect.height > 0)
        .map((rect) => ({
          height: rect.height * 0.82,
          left: rect.left - paragraphRect.left,
          top: rect.top - paragraphRect.top + rect.height * 0.12,
          width: rect.width,
        }));

      setLines(nextLines);
    };

    measureLines();

    const resizeObserver = new ResizeObserver(measureLines);
    resizeObserver.observe(paragraph);
    void document.fonts?.ready.then(measureLines);

    return () => resizeObserver.disconnect();
  }, [text]);

  const totalWidth = lines.reduce((sum, line) => sum + line.width, 0);
  let completedWidth = 0;

  return (
    <p className={className} ref={paragraphRef}>
      <span className={styles.highlightContent}>
        {prefix}
        <span ref={highlightedTextRef}>{text}</span>
      </span>
      <span className={styles.highlightLayer} aria-hidden="true">
        {lines.map((line, index) => {
          const delay =
            animationDelay +
            (totalWidth ? completedWidth / totalWidth : 0) * animationDuration;
          const duration = Math.max(
            0.18,
            (totalWidth ? line.width / totalWidth : 1) * animationDuration,
          );
          completedWidth += line.width;

          return (
            <span
              className={styles.highlightLine}
              key={`${index}-${line.top}-${line.width}`}
              style={
                {
                  "--highlight-delay": `${delay}s`,
                  "--highlight-duration": `${duration}s`,
                  height: `${line.height}px`,
                  left: `${line.left}px`,
                  top: `${line.top}px`,
                  width: `${line.width}px`,
                } as CSSProperties
              }
            />
          );
        })}
      </span>
    </p>
  );
}
