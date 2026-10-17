"use client";

import type { Swiper as SwiperInstance } from "swiper";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import WalkthroughSlide from "./Slides/WalkthroughSlide";
import IntroSlide from "./Slides/IntroSlide";
import { ButtonPrimary } from "./Button";
import Background from "./Background";
import OrbImage from "./OrbImage";
import Header from "./Header";

import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(useGSAP);

const LAST_INDEX = 6;

const Onboarding = () => {
  const rootRef = useRef<HTMLElement>(null);
  const bgIntroRef = useRef<HTMLDivElement>(null);
  const bgMainRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSpeed = () => {
      if (swiperRef.current)
        swiperRef.current.params.speed = preference.matches ? 0 : 650;
    };
    updateSpeed();
    preference.addEventListener("change", updateSpeed);
    return () => preference.removeEventListener("change", updateSpeed);
  }, []);

  function next() {
    const index = swiperRef.current?.activeIndex ?? activeIndex;

    if (index < LAST_INDEX) {
      swiperRef.current?.slideTo(index + 1);
    }
  }

  function previous() {
    const index = swiperRef.current?.activeIndex ?? activeIndex;
    if (index > 0) swiperRef.current?.slideTo(index - 1);
  }

  function restart() {
    swiperRef.current?.slideTo(0);
  }

  useGSAP(
    () => {
      const isStarted = activeIndex > 0;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const duration = reducedMotion ? 0 : 0.8;

      // Orb resize
      gsap.to(orbRef.current, {
        width: isStarted ? "40%" : "75%",
        duration,
        ease: "power3.inOut",
        overwrite: "auto",
      });

      gsap.to(bgMainRef.current, {
        opacity: activeIndex === 1 ? 1 : 0,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    {
      scope: rootRef,
      dependencies: [activeIndex],
    },
  );

  return (
    <main ref={rootRef} className="w-full relative flex flex-col min-h-screen">
      <Background bgIntroRef={bgIntroRef} bgMainRef={bgMainRef} />
      <Header />

      <section
        className="relative isolate flex h-full flex-col overflow-hidden gap-8 pt-36"
        aria-label="Onboarding Juicebox"
      >
        <div ref={orbRef} className="relative flex mx-auto w-9/12 h-auto">
          <OrbImage />
        </div>

        <Swiper
          className="relative z-1 min-h-0 h-full w-full flex-1"
          modules={[EffectFade, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={650}
          slidesPerView={1}
          allowTouchMove={false}
          preventInteractionOnTransition
          resistanceRatio={0.2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          <SwiperSlide
            className="h-full"
            data-slide-index="0"
            aria-hidden={activeIndex !== 0}
            inert={activeIndex !== 0}
          >
            <IntroSlide />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="1"
            aria-hidden={activeIndex !== 1}
            inert={activeIndex !== 1}
          >
            <WalkthroughSlide index={0} active={activeIndex === 1} />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="2"
            aria-hidden={activeIndex !== 2}
            inert={activeIndex !== 2}
          >
            <WalkthroughSlide index={1} active={activeIndex === 2} />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="3"
            aria-hidden={activeIndex !== 3}
            inert={activeIndex !== 3}
          >
            <WalkthroughSlide index={2} active={activeIndex === 3} />
          </SwiperSlide>
        </Swiper>

        <div className="flex flex-col px-6 pb-10">
          <ButtonPrimary onClick={activeIndex === LAST_INDEX ? restart : next}>
            Get a reality check
          </ButtonPrimary>
        </div>
      </section>
    </main>
  );
};

export default Onboarding;
