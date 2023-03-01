import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { getAppProps } from "../../utils/getAppProps";

export default function Post(props) {
  //console.log(props);
  return (
    <div className="mx-auto mb-7 flex h-fit justify-center px-7 pt-8 lg:px-0">
      <div className="max-w-screen-sm">
        {props.created}
        <div className="mt-6 rounded-sm bg-[#8bd8bd]/70 p-2 text-sm font-bold">
          Blog post
        </div>
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
        <div className="flex flex-wrap gap-1 pt-2">
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
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(cntxt) {
    //get app props -- will pass them at bottom ...props
    const props = await getAppProps(cntxt);
    //get user from auth0
    const userSession = await getSession(cntxt.req, cntxt.res);
    //conect to mongoDB
    const client = await clientPromise;
    const db = client.db("BloggerOpenAI");
    //find db user that matches auth0
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    //find post using params postId that belongs to user
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(cntxt.params.postId),
      userId: user._id,
    });
    //console.log(post);

    if (!post) {
      return {
        redirect: "/posts/new",
        permanent: false,
      };
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        created: post.created.toString(),
        ...props,
      },
    };
  },
});
