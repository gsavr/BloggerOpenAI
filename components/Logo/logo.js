import Image from "next/image";
import logo from "../../images/blogger-gs.svg";

export const Logo = () => {
  return (
    <div className="mx-auto flex items-center justify-center py-4 text-center font-heading text-2xl">
      <span className="mr-1">Blogger-GS</span>{" "}
      <Image
        src={logo}
        alt="logo"
        width={40}
        height={40}
        className=" opacity-80"
      />
    </div>
  );
};
