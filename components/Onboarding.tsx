"use client";

import type { Swiper as SwiperInstance } from "swiper";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ButtonLight, ButtonOutline, ButtonPrimary } from "./Button";
import { CompletionSlide } from "./Slides/CompletionSlide";
import WalkthroughSlide from "./Slides/WalkthroughSlide";
import { FormSlide } from "./Slides/FormSlide";
import IntroSlide from "./Slides/IntroSlide";
import { useMainContext } from "@/lib/hooks";
import Background from "./Background";
import OrbImage from "./OrbImage";
import Header from "./Header";

import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(useGSAP);

const LAST_INDEX = 6;

const Onboarding = () => {
  const {
    slider,
    name,
    email,
    nameError,
    emailError,
    setSlider,
    setName,
    setEmail,
    setNameError,
    setEmailError,
  } = useMainContext();

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

    if (index === 4) {
      if (name.trim().length < 3) {
        setNameError("Enter a name with at least 3 characters.");
        document.getElementById("name-input")?.focus();
        return;
      }
      setNameError("");
    }

    if (index === 5) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setEmailError("Enter a valid email address.");
        document.getElementById("email-input")?.focus();
        return;
      }
      setEmailError("");
    }

    if (index < LAST_INDEX) {
      swiperRef.current?.slideTo(index + 1);
    }
  }

  function previous() {
    const index = swiperRef.current?.activeIndex ?? slider;
    if (index > 0) swiperRef.current?.slideTo(index - 1);
  }

  function restart() {
    setName("");
    setEmail("");
    setNameError("");
    setEmailError("");

    swiperRef.current?.slideTo(0);
  }

  const buttonLabel =
    slider === 0
      ? "Get a reality check"
      : slider === 3
        ? "Get started"
        : "Continue";

  const renderButton = () => {
    if (slider === 0) {
      return <ButtonPrimary onClick={next}>{buttonLabel}</ButtonPrimary>;
    }

    if (slider === 3 || slider === LAST_INDEX) {
      return (
        <ButtonLight onClick={slider === LAST_INDEX ? restart : next}>
          {buttonLabel}
        </ButtonLight>
      );
    }

    return <ButtonOutline onClick={next}>{buttonLabel}</ButtonOutline>;
  };

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
          <SwiperSlide
            className="h-full"
            data-slide-index="4"
            aria-hidden={slider !== 4}
            inert={slider !== 4}
          >
            <FormSlide
              kind="name"
              value={name}
              onChange={(value) => {
                setName(value);
                setNameError("");
              }}
              onSubmit={next}
              error={nameError}
            />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="5"
            aria-hidden={slider !== 5}
            inert={slider !== 5}
          >
            <FormSlide
              kind="email"
              value={email}
              onChange={(value) => {
                setEmail(value);
                setEmailError("");
              }}
              onSubmit={next}
              error={emailError}
            />
          </SwiperSlide>
          <SwiperSlide
            className="h-full"
            data-slide-index="6"
            aria-hidden={slider !== 6}
            inert={slider !== 6}
          >
            <CompletionSlide />
          </SwiperSlide>
        </Swiper>

        <div className="flex flex-col px-6 pb-10">{renderButton()}</div>
      </section>
    </main>
  );
};

export default Onboarding;
