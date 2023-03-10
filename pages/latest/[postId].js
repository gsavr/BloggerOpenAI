import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { LandingLayout } from "../../components/LandingLayout";
import clientPromise from "../../lib/mongodb";
import { getLandingProps } from "../../utils/getLandingProps";
import { useRanBlogPic } from "../../hooks/useRanBlogPic";
import Image from "next/image";

export default function Post(props) {
  const blogPic = useRanBlogPic();
  //console.log(props);
  return (
    <div className="mx-auto mb-7 flex justify-center pl-12 pr-7 pt-8  md:px-7 lg:px-0">
      <div className="max-w-screen-sm">
        {props.created}
        <div className="mt-6 rounded-sm bg-[#8bd8bd]/70 p-2 text-sm font-bold">
          Blog post
        </div>
        <Image src={blogPic} alt="blog_pic" className="mt-2 h-auto w-full" />
        <div dangerouslySetInnerHTML={{ __html: props.postContent || "" }} />
        <div className="mt-6 rounded-sm bg-[#8bd8bd]/70 p-2 text-sm font-bold">
          SEO Title and meta description
        </div>
        <div className="my-2 rounded-md border border-stone-200 p-4">
          <div className="text-xl font-bold text-[#243665]">{props.title}</div>
          <div className="mt-2">{props.metaDescription}</div>
        </div>
        <div className="mt-6 rounded-sm bg-[#8bd8bd]/70 p-2 text-sm font-bold">
          Keywords
        </div>
        <div className="flex flex-wrap gap-1 pt-2 pb-7">
          {props.keywords.split(",").map((keyword, i) => {
            return (
              <div className="rounded-full bg-[#243665] p-2 text-white" key={i}>
                <FontAwesomeIcon icon={faHashtag} /> {keyword.trim()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <LandingLayout {...pageProps}>{page}</LandingLayout>;
};

export async function getServerSideProps(cntxt) {
  const props = await getLandingProps(cntxt);
  //conect to mongoDB
  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");
  //find db default user
  const user = await db.collection("users").findOne({
    auth0Id: process.env.DEFAULT_BLOGGER,
  });
  //find post using params postId that belongs to user
  const post = await db.collection("posts").findOne({
    _id: new ObjectId(cntxt.params.postId),
    userId: user._id,
  });
  //console.log(post);

  if (!post) {
    return {
      redirect: "/",
      permanent: false,
    };
  }

  return {
    props: {
      postContent: post.postContent,
      title: post.title,
      metaDescription: post.metaDescription,
      keywords: post.keywords,
      created: post.created
        .toString()
        .split(" ")
        .slice(0, 5)
        .join(" ")
        .slice(0, -3),
      ...props,
    },
  };
}
