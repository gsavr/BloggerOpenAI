import Image from "next/image";
import logo from "../../images/blogger-gs.svg";

export const LogoMobile = () => {
  return (
    <div className="text-md flex items-center py-4 text-center font-heading">
      <Image
        src={logo}
        alt="logo"
        width={35}
        height={"auto"}
        className=" opacity-80"
      />{" "}
      <span className="ml-1">Blogger-GS</span>
    </div>
  );
};
