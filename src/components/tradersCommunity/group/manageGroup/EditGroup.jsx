import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { editGroupDetail } from "../../../../redux/features/groupSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";


const EditGroup = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const { group, editGroupLoading } = useSelector((state) => state.group);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setTitle(group?.title);
    setDescription(group?.description);
  }, [group]);

  const editGroupSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      editGroupDetail({
        axiosPrivate,
        data: {
          title,
          description,
          Id: group?.id,
          grouptypeId: group?.grouptypeId,
        },
        toast,
      })
    );
  };
  return (
    <form className="" onSubmit={editGroupSubmitHandler}>
      <label className="flex flex-col justify-start w-full">
        <span className="text-sm mb-2 bg-blue-light text-white rounded-[4px] w-max px-2 py-1">
          Group Name: (required)
        </span>
        <input
          value={title}
          onInput={(e) => setErrors({ ...errors, title: "" })}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 placeholder:text-sm py-2 text-gray-600 rounded-lg border w-full outline-blue-light"
          type="text"
          placeholder="Group name"
        />
        <span className="text-red-600 text-[13px] p-1">{errors.title}</span>
      </label>

      <label className="flex flex-col justify-start w-full mt-6">
        <span className="text-sm mb-2 bg-blue-light text-white rounded-[4px] w-max px-2 py-1">
          Description: (required)
        </span>
        <textarea
          value={description}
          onInput={(e) => setErrors({ ...errors, description: "" })}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Group Description"
          className="w-full mt-1 placeholder:text-sm text-gray-600 rounded-lg border p-2 outline-blue-light"
        />
        <span className="text-red-600 text-[13px] p-1">
          {errors.description}
        </span>
      </label>

      <div className="text-[13px] mb-2 my-3 flex items-center gap-2 bg-blue-light text-white rounded-[4px] w-max px-2 py-1">
        <input type="checkbox" />
        <span>Notify group memmbers of these changes via email</span>
      </div>

      <button
        className="text-xs bg-blue-light rounded-[4px] px-6 py-2 text-white mt-3 cursor-pointer"
        type="submit"
      >
        {editGroupLoading ? (
          <CustomBeatLoader color="#fff" />
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};

export default EditGroup;
