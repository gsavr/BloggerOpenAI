import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const Logo = () => {
  return (
    <div className="text-2xl text-center py-4 font-heading">
      Blogger-GS
      <FontAwesomeIcon icon={faPaperPlane} className="text-slate-400" />
    </div>
  );
};
