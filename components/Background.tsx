import bgIntro from "@/assets/bg-intro.png";
import bgMain from "@/assets/bg-main.png";
import Image from "next/image";
import type { RefObject } from "react";

type Props = {
  bgIntroRef: RefObject<HTMLDivElement | null>;
  bgMainRef: RefObject<HTMLDivElement | null>;
};

export default function Background({ bgIntroRef, bgMainRef }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-dark"
      aria-hidden="true"
    >
      {/* Background Intro - Initial */}
      <div ref={bgIntroRef} className="absolute inset-0 opacity-100">
        <Image
          src={bgIntro}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-top"
        />
      </div>

      {/* Background Main - After Start */}
      <div ref={bgMainRef} className="absolute inset-0 opacity-0">
        <Image
          src={bgMain}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-top"
        />
      </div>
    </div>
  );
}
