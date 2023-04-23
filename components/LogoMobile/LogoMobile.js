import Image from "next/image";
import logoPic2 from "../../images/blogger-gs.svg";

export const LogoMobile = () => {
  return (
    <div className="text-md flex items-center py-4 text-center font-heading">
      <Image
        src={logoPic2}
        alt="logo"
        width={35}
        height={"auto"}
        className=" opacity-80"
      />
      <span className="ml-1">AI Blogger</span>
    </div>
  );
};
