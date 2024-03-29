import Image from "next/image";
import logoPic from "../../images/blogger-gs.svg";

export const LogoDesk = () => {
  return (
    <div className="flex items-center py-4 text-center font-heading text-2xl">
      <Image
        src={logoPic}
        alt="logo"
        width={40}
        height={"auto"}
        className=" opacity-80"
      />
      <span className="ml-1">AI Blogger</span>
    </div>
  );
};
