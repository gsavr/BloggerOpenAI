import Link from "next/link";
import { htmlToText } from "html-to-text";
import Image from "next/image";
import { useRanBlogPic } from "../../hooks/useRanBlogPic";

export const LatestBlogs = (props) => {
  const { posts } = props;

  const blogPic = useRanBlogPic();

  //console.log(posts);
  return (
    <div className="flex flex-col overflow-auto py-5 px-5 font-body">
      <div className="text-2xl font-bold">Latest AI Blog Entries</div>
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="flex flex-col items-start border border-transparent border-b-slate-300 py-4 md:flex-row "
          >
            {/* did not add link because it warped image */}
            <Image
              src={blogPic}
              alt="blog_image"
              className="mr-4 h-auto w-[175px]"
            />

            <div className="flex flex-col">
              <Link
                key={post._id}
                href={`/latest/${post._id}`}
                className={`my-1 px-0`}
              >
                <div className="text-xl italic">{post.title}</div>
              </Link>
              <div className="mt-0 mb-4 text-xs italic md:text-sm">
                {post.created}
              </div>
              <div className="hidden md:flex md:text-base">
                {htmlToText(post.postContent).substring(0, 400)}...
              </div>
              <div className="flex text-sm md:hidden">
                {htmlToText(post.postContent).substring(0, 250)}...
              </div>
              <Link
                href={`/latest/${post._id}`}
                className="text-sm italic underline md:text-base"
              >
                Continue reading ...
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
