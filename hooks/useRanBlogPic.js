import { useEffect, useState } from "react";
import img1 from "../images/img-1.jpg";
import img2 from "../images/img-2.jpg";
import img3 from "../images/img-3.jpg";
import img4 from "../images/img-4.jpg";
import img5 from "../images/img-5.jpg";
import img6 from "../images/img-6.jpg";

const pic = [img1, img2, img3, img4, img5, img6];

export const useRanBlogPic = () => {
  const [blogPic, setBlogPic] = useState(img1);

  useEffect(() => {
    let num = Math.floor(Math.random() * 6);
    setBlogPic(pic[num]);
  }, []);

  return blogPic;
};
