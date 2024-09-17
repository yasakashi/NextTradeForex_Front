import CummunityNavbar from "../../../../../components/tradersCommunity/Navbar";
import { useNavigate } from "react-router-dom";
import GroupsPageBanner from "../../../../../components/tradersCommunity/groups/GroupsPageBanner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import {
  createGroupAction,
  setCommunityGroupPic,
  setGroupId,
} from "../../../../../redux/features/groupSlice";
import CustomCircleLoader from "../../../../../utils/loaders/CustomCircleLoader";
import toast from "react-hot-toast";
import GroupDetail from "./GroupDetail";
import CreateGroupSettings from "./CreateGroupSettings";
import GroupProfilePhoto from "./GroupProfilePhoto";
import GroupCoverPhoto from "./GroupCoverPhoto";

const CreateGroup = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("1");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [profileImages, setProfileImages] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleGroupTypeChange = (e) => {
    setGroupType(e.target.value);
  };

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, setGroupPicLoading } = useSelector((state) => state.group);
  const navigate = useNavigate();

  const createGroupHandler = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Add signal data
      const creatGroupRes = await dispatch(
        createGroupAction({
          axiosPrivate,
          data: { title, description, grouptypeId: parseInt(groupType) },
          toast,
        })
      );
      if (creatGroupRes?.payload?.messageCode === 200) {
        // Step 2: Upload signal image
        const formData = await new FormData();
        console.log({ coverPhoto });
        formData.append("Id", creatGroupRes?.payload?.messageData?.id); // Assuming id is returned in the payload
        formData.append("coverPicture", coverPhoto);

        const uploadImageResponse = await dispatch(
          setCommunityGroupPic({
            axiosPrivate,
            data: formData,
            toast,
          })
        );

        if (creatGroupRes?.payload?.messageCode === 200) {
          dispatch(setGroupId(creatGroupRes?.payload?.messageData?.id));
          toast.success("Group created successfully");
          let title = creatGroupRes?.payload?.messageData?.title
            ?.replace(/\s+/g, "-")
            .toLowerCase();
          navigate(`/traders-community/groups/${title}`);
        }

        if (uploadImageResponse.payload) {
          toast.success("group photo uploaded");
          // Handle success actions if needed
        }
      }
    } catch (error) {
      console.error("Error creating signal", error);
      if (error?.message) {
        toast.error(error.message);
      }
    }

    // dispatch(
    //   createGroupAction({
    //     axiosPrivate,
    //     data: { title, description, groupType },
    //     toast,
    //     navigate,
    //   })
    // );
  };

  const backToPrevStep = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const reomveCoverImgHandler = (i) => {
    let files = coverImages.filter((_, index) => index !== i);
    setCoverImages([...files]);
  };

  const CoverImageHandler = (e) => {
    setCoverPhoto(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImages([...coverImages, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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

  const nextStepHandler = () => {
    if (!title.trim()) {
      setErrors({ ...errors, title: "Group name is required." });
      return;
    } else if (!description.trim()) {
      setErrors({ ...errors, description: "Description is required." });
      return;
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  return (
    <>
      {(isLoading || setGroupPicLoading) && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )}
      <div className="bg-link-water w-full min-h-screen h-auto">
        <CummunityNavbar />
        <div className="wrapper">
          <GroupsPageBanner />
          <div className="mt-10 mb-6">
            <h1 className="text-2xl font-semibold">Create A Group</h1>
          </div>
          <div className="pb-10">
            <form
              onSubmit={createGroupHandler}
              className="flex flex-col items-start space-y-6"
            >
              {step === 1 && (
                <GroupDetail
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  titleError={errors.title}
                  descriptionError={errors.description}
                  setErrors={setErrors}
                  errors={errors}
                />
              )}

              {step === 2 && (
                <CreateGroupSettings
                  groupType={groupType}
                  handleGroupTypeChange={handleGroupTypeChange}
                />
              )}

              {step === 3 && (
                <GroupProfilePhoto
                  removeProfileImgHandler={removeProfileImgHandler}
                  profileImages={profileImages}
                  profileImgHandler={profileImgHandler}
                />
              )}

              {step === 4 && (
                <GroupCoverPhoto
                  CoverImageHandler={CoverImageHandler}
                  reomveCoverImgHandler={reomveCoverImgHandler}
                  coverImages={coverImages}
                />
              )}

              {step === 4 && (
                <button
                  type="submit"
                  className="text-white bg-blue-light px-3 py-1 text-sm font-medium rounded-md"
                >
                  Create Group
                </button>
              )}
            </form>
            <div className="w-full my-6 flex justify-start gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={backToPrevStep}
                  className="text-white bg-blue-light px-3 py-1 text-sm font-medium rounded-md"
                >
                  Back to Previous Step
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={nextStepHandler}
                  className="text-white bg-blue-light px-3 py-1 text-sm font-medium rounded-md"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
