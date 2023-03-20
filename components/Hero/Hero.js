export const Hero = () => (
  <div className="flex flex-1 items-center justify-center bg-[#8bd8bd]/10 px-0 text-xs shadow-md transition-all md:px-2 md:text-base">
    <div className="relative rounded-md px-0 py-1 text-center font-body font-light text-black backdrop-blur-sm md:py-5 md:px-10">
      <div className="mb-1 md:mb-4">
        <p>
          AI-powered SASS solution to generate SEO-optimized blog posts in
          minutes. Get high-quality content without sacrificing time.
        </p>
        <p className="mx-auto flex flex-col text-center md:flex-row">
          <span className="uppercase md:ml-auto md:mr-1">
            Log in to make your blog post
          </span>
          <span className="md:mr-auto">using the GPT-3.5-Turbo model.</span>
        </p>
      </div>
    </div>
  </div>
);
