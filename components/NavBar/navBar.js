import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogoMobile } from "../Logo/logoMobile";
import { Logo } from "../Logo/logo";

export const NavBar = () => {
  return (
    <nav className="flex flex-1 items-center justify-between bg-[#8bd8bd]/60 px-2 font-bold shadow-md transition-all">
      {/* Logo  */}
      <div className="ml-8 hidden md:flex">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="ml-1 flex md:hidden">
        <Link href="/">
          <LogoMobile />
        </Link>
      </div>
      {/*  Menu */}
      <div className=" ml-3 flex h-10 items-center justify-end px-1 py-1 md:mx-7 md:space-x-8 md:px-4 md:py-2">
        {/* All links */}
        <Link
          href="/posts/new"
          className="btn m-0 flex rounded-full text-xs md:text-base"
        >
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
};
