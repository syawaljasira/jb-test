import Image from "next/image.js";
import refreshIcon from "@/assets/icons/refresh.svg";
import arrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Logo from "@/assets/Logo";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center py-4 px-6 bg-transparent text-white pt-14">
      <button className="cursor-pointer invisible">
        <Image src={arrowLeftIcon} alt="Arrow Left" />
      </button>

      <div className="">
        <Logo className="w-auto h-6" />
      </div>

      <button className="cursor-pointer">
        <Image src={refreshIcon} alt="Refresh" />
      </button>
    </div>
  );
};

export default Header;
