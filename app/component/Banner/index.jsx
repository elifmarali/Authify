import React from "react";
import style from "./styles.modules.scss";
import Image from "next/image";
import BannerImage from "../../../public/banner.jpg";

function Banner() {
  return <Image src={BannerImage} alt="Banner Image" fill style={{zIndex:"-1000",opacity:0.7}}/>;
}

export default Banner;
