import { LandingLayout } from "../components/LandingLayout";
import { Hero } from "../components/Hero/hero";
import { LatestBlogs } from "../components/LatestBlogs/latestBlogs";
import { getLandingProps } from "../utils/getLandingProps";

export default function Home(props) {
  const { posts } = props;
  return (
    <>
      <Hero />
      <LatestBlogs posts={posts} />
    </>
  );
}

Home.getLayout = function getLayout(page, pageProps) {
  return <LandingLayout {...pageProps}>{page}</LandingLayout>;
};

export async function getServerSideProps() {
  const props = await getLandingProps();

  return {
    props,
  };
}
