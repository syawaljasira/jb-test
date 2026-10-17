"use client";

import { useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

import "lenis/dist/lenis.css";

type Props = {
  text: string;
  active: boolean;
  slideNumber: number;
};

export default function ScrollRevealText({ text, active, slideNumber }: Props) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!active) return;

    const viewport = viewportRef.current;
    const content = contentRef.current;
    const copy = copyRef.current;

    if (!viewport || !content || !copy) return;

    const wordElements = Array.from(
      copy.querySelectorAll<HTMLElement>("[data-reveal-word]"),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reset state
    viewport.scrollTop = 0;

    gsap.set(wordElements, {
      color: "#777781",
    });

    if (reducedMotion) {
      gsap.set(wordElements, {
        color: "#ffffff",
      });

      return;
    }

    // Single GSAP timeline for all words
    const revealTimeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "none",
      },
    });

    revealTimeline.to(wordElements.slice(0), {
      color: "#ffffff",
      duration: 0.8,
      stagger: 0.7,
      ease: "none",
    });

    // Initialize Lenis
    const lenis = new Lenis({
      wrapper: viewport,
      content,

      autoRaf: false,
      lerp: 0.1,

      smoothWheel: true,
      wheelMultiplier: 0.8,

      syncTouch: false,
      touchMultiplier: 1,

      overscroll: false,
      autoResize: true,
    });

    // Map scroll progress to GSAP timeline
    const update = () => {
      const progress = lenis.limit > 0 ? lenis.scroll / lenis.limit : 0;

      revealTimeline.progress(gsap.utils.clamp(0, 1, progress));
    };

    // Sync Lenis with GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    lenis.on("scroll", update);

    lenis.resize();
    update();

    // Cleanup
    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(tick);

      revealTimeline.kill();
      lenis.destroy();
    };
  }, [active, text]);

  return (
    <>
      {/* Fixed text overlay */}
      <p
        ref={copyRef}
        className="pointer-events-none absolute top-[10%] right-6 left-6 z-1 text-h4 font-bagoss text-balance text-center"
        aria-hidden="true"
      >
        {words.map((word, index) => (
          <span
            key={`${index}-${word}`}
            data-reveal-word
            className={index === 0 ? "text-white" : "text-[#777781]"}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>

      {/* Scrollable interaction layer */}
      <div
        ref={viewportRef}
        className="scrollbar-none absolute inset-0 z-2 overflow-y-auto overscroll-contain touch-pan-y [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label={`Slide ${slideNumber} text reveal`}
        tabIndex={active ? 0 : -1}
      >
        <div
          ref={contentRef}
          className="h-[calc(100%+520px)] motion-reduce:h-full"
        >
          <p className="sr-only">{text}</p>
        </div>
      </div>
    </>
  );
}
