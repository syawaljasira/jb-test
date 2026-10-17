"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Lottie } from "lottie-react";

import { HOME_FEATURES } from "@/lib/constants";
import Orb from "@/assets/orb.png";
import { useMainContext } from "@/lib/hooks";
import orbLottie from "@/assets/JB2G_Lottie.json";

gsap.registerPlugin(useGSAP);

export default function OrbImage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const { slider } = useMainContext();

  useGSAP(
    () => {
      gsap.to(featureRef.current, {
        opacity: slider > 0 ? 0 : 1,
        duration: 0.2,
        ease: "power2.inOut",
        overwrite: "auto",
        delay: slider > 0 ? 0 : 0.6,
      });

      gsap.to(lottieRef.current, {
        autoAlpha: slider > 3 ? 1 : 0,
        opacity: slider > 3 ? 1 : 0,
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
    <div ref={rootRef} className={`w-full h-full`} aria-hidden="true">
      <div className="relative">
        <Image
          src={Orb}
          alt="Orb"
          width={Orb.width}
          height={Orb.height}
          draggable={false}
          className="h-full w-full object-cover relative"
        />

        <div
          ref={lottieRef}
          className="absolute absolute-center z-10 opacity-0"
        >
          <Lottie
            src={orbLottie}
            autoplay
            loop
            style={{ width: 32, height: 32 }}
            speed={1.4}
          />
        </div>
      </div>

      <div
        ref={featureRef}
        className="absolute left-[-10%] top-0 w-[120%] h-11/12 flex flex-col justify-between opacity-100"
      >
        {HOME_FEATURES.map((item, index) => {
          return (
            <p
              key={index}
              className="w-10/12 text-light font-sans text-xs even:text-end even:self-end"
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}
