export const HamburgerButton = (props) => {
  const { open, setOpen, setOpening, menuOpen, setMenuOpen } = props;

  const openMobileMenu = () => {
    if (open === "hidden") {
      setOpen("flex");
      setMenuOpen("open");
      setTimeout(() => {
        setOpening("opening");
      }, 100);
    } else if (open === "flex") {
      setOpening("closing");
      setMenuOpen("closed");
      setTimeout(() => {
        setOpen("hidden");
      }, 500);
    }
  };

  return (
    <div className="absolute z-50 mt-3 flex items-center lg:hidden">
      <div className="pb-2 pr-5"></div>
      <button
        id="menu-btn"
        onClick={openMobileMenu}
        type="button"
        className={`${menuOpen} hamburger z-40 block focus:outline-none lg:hidden`}
      >
        <span className="hamburger-top  "></span>
        <span className="hamburger-middle  "></span>
        <span className="hamburger-bottom  "></span>
      </button>
    </div>
  );
};
