import React from "react";
import { BASE_URL } from "../axios/axiosInstance";

const ImageComponent = ({ src, alt = "Next Trade" , className=""}) => {
  const imageUrl = `${BASE_URL}${src}`; // Construct the full image URL



  return <img className={className} src={imageUrl} alt={alt} />;
};

export default ImageComponent;
