import React from "react";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { TiPin, TiImage } from "react-icons/ti";
import { IoNewspaperOutline, IoMusicalNotes } from "react-icons/io5";
import { RiFolderVideoFill } from "react-icons/ri";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { FaLink } from "react-icons/fa6";
import { TfiGallery } from "react-icons/tfi";





const formatItems = [
  {
    name: "Standard",
    value: 1,
    Icon: TiPin,
  },

  {
    name: "Aside",
    value: 2,
    Icon: IoNewspaperOutline,
  },
  {
    name: "Image",
    value: 3,
    Icon: TiImage,
  },

  {
    name: "Video",
    value: 4,
    Icon: RiFolderVideoFill,
  },
  {
    name: "Quote",
    value: 4,
    Icon: BiSolidQuoteAltLeft,
  },

  {
    name: "Link",
    value: 5,
    Icon: FaLink,
  },

  {
    name: "Gallery",
    value: 6,
    Icon: TfiGallery,
  },
  {
    name: "Audio",
    value: 7,
    Icon: IoMusicalNotes,
  },
];

const PostFormat = ({ formik, isLoading }) => {
  return (
    <NewCourceCard title="Format">
      <div className="p-4 space-y-2">
        {formatItems.map((item, index) => (
          <label
            className="flex items-center space-x-2 cursor-pointer"
            key={index}
          >
            <input type="radio" className="scale-110" />

            <item.Icon className="text-gray-400 opacity-50" size={20} />
            <span className="text-[#333333] font-normal text-[13px]">
              {item.name}
            </span>
          </label>
        ))}
      </div>
    </NewCourceCard>
  );
};

export default PostFormat;
