import Image from "next/image";
import Orb from "@/assets/orb.png";

export default function OrbImage() {
  return (
    <div className={`w-full h-full`} aria-hidden="true">
      <Image
        src={Orb}
        alt="Orb"
        width={Orb.width}
        height={Orb.height}
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
