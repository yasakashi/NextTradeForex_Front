import { Link } from "react-router-dom";

const GalleryCard = ({ gallery }) => {
  return (
    <div className="w-[180px] border border-gray-200 rounded-[4px] shadow-md">
      <div className="w-fulll h-[180px] p-1 border cursor-pointer">
        {console.log(gallery)}
        <img
          className="object-cover rounded-[4px] w-full h-full"
          src="/assets/profile/cover-photo.jpg"
          alt="Gallery"
        />
      </div>
      <div className=" mt-4">
        <Link
          to="#"
          className="text-[#2d5be3] capitalize text-center hover:underline mx-auto w-full px-3 my-2"
        >
          {gallery?.galleryname}
        </Link>
        <div className="flex items-center text-sm mt-3 justify-between border-t">
          <span className="hover:bg-blue-400 hover:text-white p-1 w-full text-center rounded-[4px] transition-all cursor-pointer text-[#2d5be3]">
            View
          </span>
          <span className="hover:bg-blue-400 hover:text-white p-1 w-full text-center rounded-[4px] transition-all cursor-pointer border-x text-[#2d5be3] border-gray-200 px-2">
            Upload
          </span>
          <span className="text-red-500 hover:bg-red-500 w-full text-center hover:text-white p-1 rounded-[4px] transition-all cursor-pointer ">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
