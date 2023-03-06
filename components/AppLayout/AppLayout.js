import { useUser } from "@auth0/nextjs-auth0/client";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HamburgerButton } from "../HamburgerButton";
import { LogoDesk } from "../LogoDesk";
import { MainWindow } from "../MainWindow";

export const AppLayout = ({ children, ...rest }) => {
  const { user } = useUser();
  const [open, setOpen] = useState("hidden");
  const [opening, setOpening] = useState("closing");
  const [menuOpen, setMenuOpen] = useState("closed");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  //console.log(rest);

  const renderPosts = () => {
    return rest.posts.slice(start, end).map((post) => {
      return (
        <Link
          key={post._id}
          onClick={() => closeMobileMenu()}
          href={`/posts/${post._id}`}
          className={`my-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border px-2 transition-all hover:bg-white/80 ${
            rest.postId === post._id
              ? "border-white bg-white/60"
              : " border-white/0 bg-white/50"
          }`}
        >
          {/* Capitalize topic */}
          {post.topic && post.topic[0].toUpperCase() + post.topic.slice(1)}
        </Link>
      );
    });
  };

  const closeMobileMenu = () => {
    setOpening("closing");
    setMenuOpen("closed");
    setTimeout(() => {
      setOpen("hidden");
    }, 500);
  };

  const renderPrevButton = () => {
    if (start > 0) {
      return (
        <button
          className="btn mx-1 flex w-20 py-1 px-2 text-center text-xs tracking-tighter"
          onClick={() => {
            setStart(start - 10);
            setEnd(end - 10);
          }}
        >
          <span className="mx-auto">Previous</span>
        </button>
      );
    }
  };
  const renderNextButton = () => {
    if (rest.posts.length > end - 1) {
      return (
        <button
          className="btn mx-1 flex w-20 py-1 px-2 text-center text-xs tracking-tighter"
          onClick={() => {
            setStart(start + 10);
            setEnd(end + 10);
          }}
        >
          <span className="mx-auto"> Next</span>
        </button>
      );
    }
  };

  return (
    <>
      <div className="relative flex h-screen max-h-screen">
        <HamburgerButton
          open={open}
          setOpen={setOpen}
          opening={opening}
          setOpening={setOpening}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <div
          className={`${open} ${opening} mobile-menu w-full flex-col justify-between overflow-auto bg-[#BBE7D7] text-black transition-all duration-200 md:w-1/3 lg:flex lg:w-1/5 `}
        >
          <div className="flex flex-col px-2">
            <div className="mx-auto font-body">
              <Link href="/">
                <LogoDesk />
              </Link>
            </div>
            <Link
              href="/posts/new"
              className="btn"
              onClick={() => closeMobileMenu()}
            >
              New Post
            </Link>
            <div className="mt-2 flex flex-row items-center justify-center">
              <Link
                href="/account"
                className=" text-center"
                onClick={() => closeMobileMenu()}
              >
                <span className="pr-2">Account: </span>
                <FontAwesomeIcon icon={faCircleDollarToSlot} />
                <span className="pl-1">{rest.availableTokens} tokens</span>
              </Link>
            </div>
            {rest.posts.length > 0 && (
              <div className="mx-auto mt-3">Your Latest Topics</div>
            )}
            <div className="flex flex-1 flex-col overflow-auto overscroll-contain">
              {renderPosts()}
              <div className="my-2 flex flex-row justify-evenly">
                {renderPrevButton()}
                {renderNextButton()}
              </div>
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
        <MainWindow
          open={open}
          setOpen={setOpen}
          setOpening={setOpening}
          setMenuOpen={setMenuOpen}
        >
          {children}
        </MainWindow>
      </div>
    </>
  );
};
