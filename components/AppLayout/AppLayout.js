import { useUser } from "@auth0/nextjs-auth0/client";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../Logo/logo";

export const AppLayout = ({ children, ...rest }) => {
  const { user } = useUser();
  console.log(rest);

  const renderPosts = () => {
    return rest.posts.map((post) => {
      return (
        <Link
          key={post._id}
          href={`/posts/${post._id}`}
          className={`my-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border px-2 transition-all ${
            rest.postId === post._id
              ? "border-white bg-white/20"
              : " border-white/0 bg-white/10"
          }`}
        >
          {/* Capitalize topic */}
          {post.topic && post.topic[0].toUpperCase() + post.topic.slice(1)}
        </Link>
      );
    });
  };

  return (
    <>
      <div className="flex h-screen max-h-screen">
        <div className=" flex w-1/5 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#243665] to-[#8bd8bd] text-white">
          <div className="flex flex-col px-2">
            <Logo />
            <Link href="/posts/new" className="btn">
              New Post
            </Link>
            <div className="mt-2 flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
              <Link href="/token-topup" className=" text-center">
                <span className="pl-1">{rest.availableTokens} tokens</span>
              </Link>
            </div>
            <div className="mx-auto mt-3">Latest Topics</div>
            <div className="flex min-h-0 flex-1 flex-col overflow-auto overscroll-contain">
              {renderPosts()}
            </div>
          </div>
          <div>
            <div className=" flex h-20 items-center gap-2 border-t border-t-[#243665]/30 px-2">
              {user ? (
                <>
                  <div>
                    <Image
                      className="rounded-full"
                      src={user.picture}
                      alt={user.name}
                      height={50}
                      width={50}
                    />
                  </div>
                  <div>
                    <div className="text-sm">{user.name}</div>
                    <div className="text-sm">{user.email}</div>
                    <Link
                      className="text-xs transition-all"
                      href="/api/auth/logout"
                    >
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 overflow-auto">{children}</div>
      </div>
    </>
  );
};
