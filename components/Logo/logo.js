import Image from "next/image";
import logo from "../../images/blogger-gs.svg";

export const Logo = () => {
  return (
    <div className="flex items-center py-4 text-center font-heading text-2xl">
      <Image
        src={logo}
        alt="logo"
        width={40}
        height={"auto"}
        className=" opacity-80"
      />
      <span className="ml-1">Blogger-GS</span>
    </div>
  );
};
