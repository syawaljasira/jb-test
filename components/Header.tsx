import Image from "next/image.js";

import arrowLeftIcon from "@/assets/icons/arrow-left.svg";
import refreshIcon from "@/assets/icons/refresh.svg";
import { useMainContext } from "@/lib/hooks";
import Logo from "@/assets/Logo";

interface HeaderProps {
  previous: () => void;
  restart: () => void;
}

const Header = ({ previous, restart }: HeaderProps) => {
  const { slider } = useMainContext();

  return (
    <div className="absolute top-0 left-0 z-5 w-full flex justify-between items-center py-4 px-6 bg-transparent text-white pt-14">
      <button
        className={`cursor-pointer ${slider === 0 ? "invisible" : "visible"}`}
        onClick={previous}
      >
        <Image src={arrowLeftIcon} alt="Arrow Left" />
      </button>

      <div>
        <Logo className="w-auto h-6" />
      </div>

      <button className="cursor-pointer" onClick={restart}>
        <Image src={refreshIcon} alt="Refresh" />
      </button>
    </div>
  );
};

export default Header;
