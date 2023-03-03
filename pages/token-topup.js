import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import Image from "next/image";

export default function TokenTopup(props) {
  console.log(props);
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
    <div className="items-left mx-auto mb-7 mt-9 flex h-fit w-screen flex-col justify-center rounded-sm border border-[#243665] pl-12 pr-7 pb-8 md:px-7 lg:px-0">
      <h1 className="pl-6 text-slate-800">Account</h1>
      <div className="p-6 text-slate-500">
        <Image
          className="mx-auto mb-8 -mt-4 rounded-full"
          src={user.picture}
          alt={user.name}
          height={140}
          width={140}
        />
        <div className="flex flex-row text-lg ">
          <div className=" w-40">Name:</div>{" "}
          <div className="flex flex-1 items-end">{user.name}</div>
        </div>
        <div className="flex flex-row text-lg">
          <div className=" w-40">Email:</div> {user.email}
        </div>
        <div className="flex flex-row text-lg">
          <div className=" w-40">Available Tokens:</div> {availableTokens}
        </div>
      </div>

      <button className="btn" onClick={handleClick}>
        Add tokens
      </button>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
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
