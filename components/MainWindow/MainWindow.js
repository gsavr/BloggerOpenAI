import { useEffect } from "react";

export const MainWindow = (props) => {
  const { children, open, setOpen, setOpening, setMenuOpen } = props;

  useEffect(() => {
    const el = document.getElementById("main");
    el.addEventListener("click", () => {
      setOpening("closing");
      setMenuOpen("closed");
      setTimeout(() => {
        setOpen("hidden");
      }, 500);
    });
    return () => el.removeEventListener("click", () => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      id="main"
      className="duration-1500 flex flex-1 overflow-auto transition-all"
    >
      {children}
    </div>
  );
};
