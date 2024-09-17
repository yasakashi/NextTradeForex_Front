import { BsMegaphone } from "react-icons/bs";
import CummunityNavbar from "../../../components/tradersCommunity/Navbar";
import { Link, useNavigate } from "react-router-dom";
import GroupsPageBanner from "../../../components/tradersCommunity/groups/GroupsPageBanner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { createGroupAction } from "../../../redux/features/groupSlice";
import CustomCircleLoader from "../../../utils/loaders/CustomCircleLoader";
import toast from "react-hot-toast";
import { userDataAction } from "../../../redux/features/userDataSlice";

const CreateGroup = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("0");

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    groupType,
  });

  const handleGroupTypeChange = (e) => {
    setGroupType(e.target.value);
  };

  // -------------------
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { createGroupStatus, isLoading, errorMsg } = useSelector(
    (state) => state.group
  );
  const navigate = useNavigate();


  const createGroupHandler = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!title.trim()) {
        setErrors({ ...errors, title: "Group name cannot be empty." });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      dispatch(
        createGroupAction({
          axiosPrivate,
          data: { title, description, groupType },
          toast,
          navigate,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(userDataAction({axiosPrivate}));
  }, [])

  return (
    <>
      {isLoading && (
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
          {/* banner */}
          <GroupsPageBanner />
          {/* title */}
          <div className="my-10">
            <h1 className="text-2xl font-semibold">Crete A Group</h1>
          </div>

          {/*  */}
          <div className="pb-20">
            {/* name and description */}
            <form
              onSubmit={createGroupHandler}
              className="flex flex-col items-start space-y-6"
            >
              {step === 1 && (
                <>
                  <label className="flex flex-col justify-start w-[80%]">
                    <span className="label">Group Name: </span>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-4 py-3 rounded-lg border w-full outline-blue-light"
                      type="text"
                      placeholder="Group name"
                    />
                    <span className="text-red-600 text-sm py-1">
                      {errors.title}
                    </span>
                  </label>

                  <label className="flex flex-col justify-start w-[80%]">
                    <span className="label">Description: </span>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Group Description"
                      className="w-full mt-1 rounded-lg border p-2 outline-blue-light"
                    />
                  </label>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="public"
                      className="flex items-center  hover:bg-gray-200 transition-all border-2 border-gray-300 rounded-lg p-6 cursor-pointer"
                    >
                      <input
                        value="0"
                        checked={groupType === "0"}
                        onChange={handleGroupTypeChange}
                        name="groupType"
                        id="public"
                        type="radio"
                      />
                      <div className="flex gap-2">
                        <span className="border-r border-gray-400 px-2">
                          Public
                        </span>
                        <p className="text-sm text-gray-600 font-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Placeat, saepe.
                        </p>
                      </div>
                    </label>

                    <label
                      htmlFor="private"
                      className="flex items-center  hover:bg-gray-200 transition-all border-2 border-gray-300 rounded-lg p-6 cursor-pointer"
                    >
                      <input
                        value="1"
                        checked={groupType === "1"}
                        onChange={handleGroupTypeChange}
                        name="groupType"
                        id="private"
                        type="radio"
                      />
                      <div className="flex gap-2">
                        <span className="border-r border-gray-400 px-2">
                          Private
                        </span>
                        <p className="text-sm text-gray-600 font-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Placeat, saepe.
                        </p>
                      </div>
                    </label>
                  </div>
                </>
              )}
              {/* button */}
              <div className="w-full my-10 flex justify-start gap-4">
                {step === 2 ? (
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3 font-semibold bg-blue-light text-white hover:bg-blue-dark transition-colors shadow-xl rounded-xl"
                  >
                    Back
                  </button>
                ) : step === 1 ? (
                  <Link
                    to="/traders-community/groups"
                    className="px-8 py-3 font-semibold bg-blue-light text-white hover:bg-blue-dark transition-colors shadow-xl rounded-xl"
                  >
                    Dissmiss
                  </Link>
                ) : null}

                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-light font-semibold border-2 border-blue-light hover:text-white hover:bg-blue-light transition-colors shadow-xl rounded-xl"
                >
                  {step === 1 ? "Next" : step === 2 ? "Create" : null}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
