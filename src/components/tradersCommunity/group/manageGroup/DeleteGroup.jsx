import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { removeGroup } from "../../../../redux/features/groupSlice";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DeleteGroup = () => {
  const groupId = localStorage.getItem("groupId");

  const [agreed, setAgreed] = useState(false);

  const { isLoading } = useSelector((state) => state.group);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const removeGroupHandler = () => {
    dispatch(
      removeGroup({ axiosPrivate, data: { id: groupId }, navigate, toast })
    );
  };

  return (
    <div>
      <p className="text-white bg-blue-light p-3 rounded-md">
        WARNING: Deleting this group will completely remove ALL content
        associated with it. There is no way back, please be careful with this
        option.
      </p>

      <div className="flex items-center my-2 gap-2">
        <input
          onChange={(e) => setAgreed(e.target.checked)}
          checked={agreed}
          type="checkbox"
        />

        <p className="text-gray-700 text-sm">
          I understand the consequences of deleting this group.
        </p>
      </div>

      <button
        onClick={removeGroupHandler}
        disabled={!agreed}
        type="button"
        className="bg-[#2d5be3] disabled:bg-[#657bbd] disabled:cursor-not-allowed text-sm px-6 py-2 rounded-[4px] mt-6 text-white"
      >
        {isLoading ? <CustomBeatLoader color="#fff" /> : "sDelete Group"}
      </button>
    </div>
  );
};

export default DeleteGroup;
