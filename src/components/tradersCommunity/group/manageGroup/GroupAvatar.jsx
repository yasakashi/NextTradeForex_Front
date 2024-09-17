import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { setCommunityGroupPic } from "../../../../redux/features/groupSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";

const GroupAvatar = () => {
  const groupId = localStorage.getItem("groupId");
  const [profileImages, setProfileImages] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { setGroupPicLoading } = useSelector((state) => state.group);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const removeProfileImgHandler = (i) => {
    let files = profileImages.filter((_, index) => index !== i);
    setProfileImages([...files]);
  };

  const profileImgHandler = (e) => {
    setProfilePhoto(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImages([...profileImages, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateGroupAvatarHandler = async () => {
    const formData = await new FormData();
    formData.append("Id", groupId);
    formData.append("photofile", profilePhoto);

    dispatch(setCommunityGroupPic({ axiosPrivate, data: formData, toast }));
  };
  return (
    <div className="my-3 w-full">
      <p className="mb-4 text-left text-sm text-gray-500">
        Upload an image to use as a profile photo for this group. The image will
        be shown on the main group page, and in search results.
      </p>
      <div className="border-2 border-dashed border-gray-400 p-4 mb-4">
        {profileImages?.length > 0 ? (
          <>
            {profileImages.map((image, index) => (
              <div key={index} className="relative w-[40%] mx-auto">
                <img
                  src={image}
                  alt={`upload-${index}`}
                  className="w-[100%] h-[110px] object-contain rounded"
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
      {profileImages?.length > 0 && (
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

export default GroupAvatar;
