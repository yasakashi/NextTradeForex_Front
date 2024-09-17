// GroupProfilePhoto.js
import React from "react";
import { IoIosClose } from "react-icons/io";

const GroupProfilePhoto = ({
  profileImages,
  removeProfileImgHandler,
  profileImgHandler,
}) => {
  return (
    <div className="my-3 w-full">
      <h4 className="my-6 text-xl font-medium text-gray-700">
        Group Cover Photo
      </h4>
      <div className="mb-4 text-center">
        <img
          src="/assets/mystery-group.png"
          alt="Group profile"
          className="w-24 h-24"
        />
      </div>
      <p className="mb-4 text-left text-sm text-gray-500">
        Upload an image to use as a profile photo for this group. The image will
        be shown on the main group page, and in search results.
      </p>
      <p className="my-2 text-left text-sm text-gray-500">
        To skip the group profile photo upload process, hit the "Next Step"
        button.
      </p>

      <div className="border-2 border-dashed border-gray-400 p-4 mb-4">
        {profileImages?.length ? (
          <>
            {profileImages.map((image, index) => (
              <div key={index} className="relative w-max">
                <img
                  src={image}
                  alt={`upload-${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeProfileImgHandler(index)}
                  className="absolute top-0 right-0 p-[1px] bg-gray-300 rounded-full"
                >
                  <IoIosClose className="text-red-600" size={20} />
                </button>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                onChange={profileImgHandler}
                className="hidden"
                id="file-upload-profile"
              />
              <label
                htmlFor="file-upload-profile"
                className="cursor-pointer bg-blue-light text-white px-4 py-2 rounded-md"
              >
                Select your File
              </label>
              <span className="mt-2">or</span>
              <span className="mt-2 text-gray-600">Drop your file here</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupProfilePhoto;
