import { IoIosClose } from "react-icons/io";

const GroupCoverPhoto = ({
  CoverImageHandler,
  reomveCoverImgHandler,
  coverImages,
}) => {
  return (
    <div className="my-10 w-full">
      <div className="my-4 flex flex-row justify-between flex-wrap items-center gap-5">
        <label
          htmlFor="cover_1"
          className="w-[30%] min-w-[200px] relative min-h-[100px]"
        >
          <input
            className="z-10 accent-white relative m-2 scale-125"
            type="radio"
            id="cover_1"
            name="cover_img"
          />
          <img
            className="w-full h-full absolute inset-0 z-0 rounded-md"
            src="/assets/community/dummy-banner.jpg"
            alt="group cover image"
          />
        </label>
        <label
          htmlFor="cover_2"
          className="w-[30%] min-w-[200px] relative min-h-[100px]"
        >
          <input
            className="z-10 accent-white relative m-2 scale-125"
            type="radio"
            id="cover_2"
            name="cover_img"
          />
          <img
            className="w-full h-full absolute inset-0 z-0 rounded-md"
            src="/assets/community/dummy-banner.jpg"
            alt="group cover image"
          />
        </label>
        <label
          htmlFor="cover_3"
          className="w-[30%] min-w-[200px] relative min-h-[100px]"
        >
          <input
            className="z-10 accent-white relative m-2 scale-125"
            type="radio"
            id="cover_3"
            name="cover_img"
          />
          <img
            htmlFor="cover_3"
            className="w-full h-full absolute inset-0 z-0 rounded-md"
            src="/assets/community/dummy-banner.jpg"
            alt="group cover image"
          />
        </label>
      </div>
      <p className="p-1 text-sm text-gray-500">
        The Cover Image will be used to customize the header of your group.
      </p>

      <div className="border-2 border-dashed border-gray-400 p-4 mb-4">
        {coverImages?.length ? (
          <>
            {coverImages.map((image, index) => (
              <div key={index} className="relative w-max">
                <img
                  src={image}
                  alt={`upload-${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => reomveCoverImgHandler(index)}
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
                onChange={CoverImageHandler}
                className="hidden"
                id="file-upload-cover"
              />
              <label
                htmlFor="file-upload-cover"
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
      {/*  */}
      {/* <div className="border-2 border-dashed border-gray-400 p-4 my-4">
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            onChange={handleCoverPhoto}
            className="hidden"
            id="file-upload-cover"
          />
          <label
            htmlFor="file-upload-cover"
            className="cursor-pointer bg-blue-light text-white px-4 py-2 rounded-md"
          >
            Select your File
          </label>
          <span className="mt-2">or</span>
          <span className="mt-2 text-gray-600">Drop your file here</span>
        </div>
      </div> */}
    </div>
  );
};

export default GroupCoverPhoto;
