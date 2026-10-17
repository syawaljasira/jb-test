"use client";

import type { Swiper as SwiperInstance } from "swiper";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import WalkthroughSlide from "./Slides/WalkthroughSlide";
import { useMainContext } from "@/lib/hooks";
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
  const { slider, setSlider } = useMainContext();

  const rootRef = useRef<HTMLElement>(null);
  const bgIntroRef = useRef<HTMLDivElement>(null);
  const bgMainRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);

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
    const index = swiperRef.current?.activeIndex ?? slider;

    if (index < LAST_INDEX) {
      swiperRef.current?.slideTo(index + 1);
    }
  }

  function previous() {
    const index = swiperRef.current?.activeIndex ?? slider;
    if (index > 0) swiperRef.current?.slideTo(index - 1);
  }

  function restart() {
    swiperRef.current?.slideTo(0);
  }

  useGSAP(
    () => {
      const isStarted = slider > 0;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const duration = reducedMotion ? 0 : 0.8;

      // Orb resize
      gsap.to(orbRef.current, {
        width: isStarted ? "36.66%" : "70%",
        duration,
        ease: "power3.inOut",
        overwrite: "auto",
      });

      gsap.to(bgMainRef.current, {
        opacity: slider === 1 ? 1 : 0,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    {
      scope: rootRef,
      dependencies: [slider],
    },
  );

  return (
    <main ref={rootRef} className="w-full relative flex flex-col min-h-screen">
      <Background bgIntroRef={bgIntroRef} bgMainRef={bgMainRef} />
      <Header previous={previous} restart={restart} />

      <section
        className="relative isolate flex h-full flex-col overflow-hidden gap-8 pt-36"
        aria-label="Onboarding Juicebox"
      >
        <div ref={orbRef} className="relative flex mx-auto w-7/10 h-auto">
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
            setSlider(swiper.activeIndex);
          }}
        >
          <SwiperSlide
            className="h-full"
            data-slide-index="0"
            aria-hidden={slider !== 0}
            inert={slider !== 0}
          >
            <IntroSlide />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="1"
            aria-hidden={slider !== 1}
            inert={slider !== 1}
          >
            <WalkthroughSlide index={0} active={slider === 1} />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="2"
            aria-hidden={slider !== 2}
            inert={slider !== 2}
          >
            <WalkthroughSlide index={1} active={slider === 2} />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="3"
            aria-hidden={slider !== 3}
            inert={slider !== 3}
          >
            <WalkthroughSlide index={2} active={slider === 3} />
          </SwiperSlide>
        </Swiper>

        <div className="flex flex-col px-6 pb-10">
          <ButtonPrimary onClick={slider === LAST_INDEX ? restart : next}>
            Get a reality check
          </ButtonPrimary>
        </div>
      </section>
    </main>
  );
};

export default Onboarding;
