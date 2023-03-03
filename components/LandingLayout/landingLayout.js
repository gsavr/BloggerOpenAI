import { NavBar } from "../NavBar/navBar";

export const LandingLayout = ({ children, ...rest }) => {
  //console.log(rest);
  return (
    <>
      <div className="relative flex h-screen w-screen overflow-hidden overflow-x-hidden">
        <div className="container mx-auto min-h-screen max-w-6xl overflow-auto px-0 py-0 pb-2">
          <NavBar />
          <div /* className="flex overflow-auto" */>{children}</div>
        </div>
      </div>
    </>
  );
};
