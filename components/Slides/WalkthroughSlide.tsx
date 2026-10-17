import { WALKTHROUGH } from "@/lib/constants";
import ScrollRevealText from "../ScrollRevealText";

const WalkthroughSlide = ({
  index,
  active,
}: {
  index: 0 | 1 | 2;
  active: boolean;
}) => {
  const item = WALKTHROUGH[index];

  return (
    <div className="relative h-full min-h-0 w-full">
      <ScrollRevealText
        text={item.text}
        active={active}
        slideNumber={index + 2}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-10 z-30 flex items-center justify-center gap-2"
        aria-hidden="true"
      >
        {WALKTHROUGH.map((_, dot) => (
          <span
            key={dot}
            className={`block size-1.5 shrink-0 rounded-full transition-all duration-500 ${
              dot === index ? "bg-[#C9A5FF]" : "bg-[#64616F]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WalkthroughSlide;
