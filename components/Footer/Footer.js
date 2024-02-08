import Image from "next/image";
import githubC from "../../images/github-c.png";
import linkedin from "../../images/linkedin.png";
import gs_logo from "../../images/gs_logo.png";

export const Footer = () => {
  return (
    <footer className="sticky top-[100vh] w-full bg-[#8bd8bd]/20">
      <div className="container relative mx-auto px-5 pb-10 pt-0">
        {/*  Flex container for all items  */}
        <div className="flex flex-col items-center justify-between space-y-12 md:flex-row md:space-y-0">
          <div className="mt-20">
            <div className="flex  space-x-3 md:-mt-6">
              <div>&copy; 2024, Giorgio Savron Development</div>
            </div>
          </div>
          {/*  Social  */}
          <div className="!mt-10 flex items-center space-x-8 pb-0">
            <div>
              <a
                href="https://www.giorgiosavron.com"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={gs_logo}
                  alt="Linkedin"
                  className="ficon h-[30px] w-[30px]  "
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/giorgio-savron/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={linkedin}
                  alt="Linkedin"
                  className="ficon h-[30px] w-[30px]  "
                />
              </a>
            </div>
            <div>
              <a
                href="https://github.com/gsavr/BloggerOpenAI"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={githubC}
                  alt="github"
                  className="ficon h-[30px] w-[30px]  "
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
