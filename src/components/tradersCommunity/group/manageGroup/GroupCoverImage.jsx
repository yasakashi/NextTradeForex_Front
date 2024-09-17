import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { setCommunityGroupCoverImage } from "../../../../redux/features/groupSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";

const GroupCoverImage = () => {
  const groupId = localStorage.getItem("groupId");

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const { setGroupPicLoading } = useSelector((state) => state.group);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const CoverImageHandler = (e) => {
    setCoverPhoto(e.target.files[0]);
    setSelectedImageUrl(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImages([...coverImages, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handlePredefinedImageSelection = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setCoverPhoto(null); // Reset local cover photo
    setCoverImages([imageUrl]);
  };

  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: mimeType });
  };

  const reomveCoverImgHandler = (i) => {
    let files = coverImages.filter((_, index) => index !== i);
    setCoverImages([...files]);
  };

  const updateGroupAvatarHandler = async () => {
    const formData = new FormData();
    formData.append("Id", groupId);

    if (coverPhoto) {
      formData.append("photofile", coverPhoto);
    } else if (selectedImageUrl) {
      const file = await urlToFile(
        selectedImageUrl,
        "predefined-image.jpg",
        "image/jpeg"
      );
      formData.append("photofile", file);
    }

    dispatch(
      setCommunityGroupCoverImage({ axiosPrivate, data: formData, toast })
    );
  };

  return (
    <div className="my-10 w-full">
      <div className="my-4 flex flex-row justify-between flex-wrap items-center gap-5">
        <label
          htmlFor="cover_1"
          className="w-[30%] min-w-[200px] relative h-[65px]"
        >
          <input
            onChange={() =>
              handlePredefinedImageSelection(
                "/assets/community/dummy-banner.jpg"
              )
            }
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
          className="w-[30%] min-w-[200px] relative h-[65px]"
        >
          <input
            onChange={() =>
              handlePredefinedImageSelection(
                "/assets/community/dummy-banner.jpg"
              )
            }
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
          className="w-[30%] min-w-[200px] relative h-[65px]"
        >
          <input
            onChange={() =>
              handlePredefinedImageSelection(
                "/assets/community/dummy-banner.jpg"
              )
            }
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
              <div key={index} className="relative w-[60%] mx-auto">
                <img
                  src={image}
                  alt={`upload-${index}`}
                  className="w-full h-[130px] object-contain rounded"
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
      {coverImages?.length > 0 && (
        <button
          disabled={setGroupPicLoading}
          onClick={updateGroupAvatarHandler}
          className="cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed mt-4 ml-auto bg-blue-light text-white px-4 py-2 rounded-md"
        >
          {setGroupPicLoading ? <CustomBeatLoader color="#fff" /> : "Send"}
        </button>
      )}
    </div>
  );
};

export default GroupCoverImage;
