import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
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
      //when the post is finalized -- navigate to it
      if (json?.postId) {
        setLoading(false);
        router.push(`/posts/${json.postId}`);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto flex flex-1 flex-row items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto flex flex-1 flex-col items-center justify-center bg-[#243665]/10">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="rounded-md bg-[#8bd8bd]/30 p-6 shadow-xl"
          >
            <div>
              <label>
                <strong>Generate a blog post on the topic of:</strong>
              </label>
              <textarea
                className="my-2 w-full resize-none rounded-sm border border-slate-500 px-4 py-2 outline-none"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={120}
              />
            </div>
            <div>
              <label>
                <strong>Use the following keywords:</strong>
              </label>
              <textarea
                className="my-2 w-full resize-none rounded-sm border border-slate-500 px-4 py-2 outline-none"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={80}
              />
              <small className="mb-2 -mt-3 block">
                Separate keywords with a comma
              </small>
            </div>
            <button
              type="submit"
              className="btn mx-auto"
              disabled={!topic.trim() || !keywords.trim()}
            >
              Generate
            </button>
          </form>
          {error && (
            <div className="mt-4 animate-pulse text-xl font-bold text-red-700">
              <FontAwesomeIcon icon={faPaperPlane} /> An error has occured -
              Please try again.
            </div>
          )}
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

    //if no tokens then send user to token topup page
    if (!props.availableTokens || props.availableTokens <= 1) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }

    return {
      props,
    };
  },
});
