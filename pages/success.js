import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function Success(props) {
  const { availableTokens } = props;
  return (
    <div className="mx-auto mb-7 flex h-fit flex-col items-center justify-center pl-12 pr-7 pt-8 md:px-7 lg:px-0">
      <h1>Thank you for your purchase</h1>
      <p className="text-lg">
        You now have {availableTokens} tokens in your account
      </p>
      <Link href="/posts/new" className=" animate-pulse text-lg underline">
        Create new Blog Post
      </Link>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
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
