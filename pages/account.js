import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import Image from "next/image";

export default function Account(props) {
  const { availableTokens, user } = props;

  const handleClick = async () => {
    const result = await fetch("/api/addTokens", {
      method: "POST",
    });
    const json = await result.json();
    console.log(json);
    window.location.href = json.session.url;
  };

  return (
    <div className="items-left mb-7 mt-9 flex h-fit w-screen flex-col justify-center rounded-sm border border-[#243665] pb-8 md:mx-4 md:px-7 md:pl-12 md:pr-7 lg:px-0">
      <h1 className="pl-9 text-slate-800">Account</h1>
      <div className="text-md p-6 text-slate-500 md:text-lg ">
        <Image
          className="mx-auto mb-8 -mt-4 rounded-full"
          src={user.picture}
          alt={user.name}
          height={140}
          width={140}
        />
        <div className="pl-0 md:pl-9">
          <div className="flex flex-col md:flex-row ">
            <div className=" w-40">Name:</div>{" "}
            <div className="flex flex-1 pl-8">{user.name}</div>
          </div>
          <div className="flex flex-col md:flex-row  ">
            <div className=" w-40">Email:</div>
            <div className="flex flex-1 pl-8">{user.email}</div>
          </div>
          <div className="flex flex-col md:flex-row ">
            <div className=" w-40">Available Tokens:</div>
            <div className="flex flex-1 pl-8">{availableTokens}</div>
          </div>
        </div>
      </div>

      <button className="btn shadow-lg" onClick={handleClick}>
        Add tokens
      </button>
    </div>
  );
}

Account.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(cntxt) {
    const props = await getAppProps(cntxt);
    return {
      props,
    };
  },
});
