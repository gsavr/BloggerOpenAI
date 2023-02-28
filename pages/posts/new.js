import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppLayout } from "../../components/AppLayout";
import { Loading } from "../../components/Loading/Loading";
import { getAppProps } from "../../utils/getAppProps";

export default function NewPost() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //use api to send out topic and keywords to get post back
    const respose = await fetch(`/api/generatePost`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic, keywords }),
    });
    const json = await respose.json();
    //console.log(json);
    setLoading(false);
    //when the post is finalized -- navigate to it
    if (json?.postId) {
      router.push(`/posts/${json.postId}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto flex flex-col items-center justify-center">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>
                <strong>Generate a blog post on the topic of:</strong>
              </label>
              <textarea
                className="my-2 w-full resize-none rounded-sm border border-slate-500 px-4 py-2"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <label>
                <strong>Use the following keywords:</strong>
              </label>
              <textarea
                className="my-2 w-full resize-none rounded-sm border border-slate-500 px-4 py-2"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Generate
            </button>
          </form>
        </div>
      )}
    </>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
