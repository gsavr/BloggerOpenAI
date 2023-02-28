import Image from "next/image";
import Link from "next/link";
import { Logo } from "../components/Logo/logo";
import heroImg from "../public/hero.webp";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={heroImg} alt="hero" fill className="absolute" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
        <Logo />
        <p className="mb-4">
          This AI-powered SASS solution to generate SEP-optimized blog posts in
          minutes. Get high-quality content without sacrificing time
        </p>
        <Link href="/posts/new" className="btn">
          Begin
        </Link>
      </div>

      <div></div>
    </div>
  );
}
