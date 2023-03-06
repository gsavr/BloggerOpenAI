import { LandingLayout } from "../components/LandingLayout";
import { Hero } from "../components/Hero/hero";
import { LatestBlogs } from "../components/LatestBlogs/LatestBlogs";
import { getLandingProps } from "../utils/getLandingProps";

export default function Home(props) {
  const { posts } = props;

  return (
    <div>
      <Hero />
      <LatestBlogs posts={posts} />
    </div>
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
