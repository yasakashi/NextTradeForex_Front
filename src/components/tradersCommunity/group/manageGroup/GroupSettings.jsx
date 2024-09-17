import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { editGroupDetail } from "../../../../redux/features/groupSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";

const GroupSettings = () => {
  const [groupType, setGroupType] = useState("1");

  const { group, editGroupLoading } = useSelector((state) => state.group);

  useEffect(() => {
    setGroupType(group?.grouptypeId);
  }, [group]);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleGroupTypeChange = (e) => {
    setGroupType(e.target.value);
  };

  const editGroupTypeSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      editGroupDetail({
        axiosPrivate,
        data: {
          title: group?.title,
          description: group?.description,
          Id: group?.id,
          grouptypeId: JSON.parse(groupType),
        },
        toast,
      })
    );
  };

  return (
    <form
      onSubmit={editGroupTypeSubmitHandler}
      className="border-2 border-gray-200 p-3"
    >
      <div className="flex flex-col  rounded-sm p-2 w-full">
        <div className="bg-blue-light text-white px-5 py-2 rounded-[4px] flex items-center gap-2 w-max my-3 cursor-pointer text-sm">
          <input type="checkbox" />
          <span>Enable Gallery</span>
        </div>
        <h4 className="text-gray-600 text-2xl">Privacy Options</h4>
        <label
          htmlFor="public"
          className="flex flex-col gap-4 items-start transition-all rounded-lg p-6 cursor-pointer"
        >
          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-sm px-3 py-2 gap-3">
            <input
              value="1"
              checked={groupType === "1"}
              onChange={handleGroupTypeChange}
              name="groupType"
              id="public"
              type="radio"
              className=""
            />
            <span className="text-sm">This is a public group</span>
          </div>
          <ul className="list-disc space-y-1 pl-10">
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Any site member can join this group.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              This group will be listed in the groups directory and in search
              results.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Group content and activity will be visible to any site member.
            </li>
          </ul>
        </label>

        <label
          htmlFor="privet"
          className="flex flex-col gap-4 items-start transition-all rounded-lg p-6 cursor-pointer"
        >
          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-sm px-3 py-2 gap-3">
            <input
              value="2"
              checked={groupType === "2"}
              onChange={handleGroupTypeChange}
              name="groupType"
              id="privet"
              type="radio"
              className=""
            />
            <span className="">This is a privet group</span>
          </div>
          <ul className="list-disc space-y-1 pl-10">
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Only users who request membership and are accepted can join the
              group.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              This group will be listed in the groups directory and in search
              results.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Group content and activity will only be visible to members of the
              group.
            </li>
          </ul>
        </label>

        <label
          htmlFor="hidden"
          className="flex flex-col gap-4 items-start transition-all rounded-lg p-6 cursor-pointer"
        >
          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-sm px-3 py-2 gap-3">
            <input
              value="3"
              checked={groupType === "3"}
              onChange={handleGroupTypeChange}
              name="groupType"
              id="hidden"
              type="radio"
              className=""
            />
            <span className="">This is a hidden group</span>
          </div>
          <ul className="list-disc space-y-1 pl-10">
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Only users who are invited can join the group.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              This group will not be listed in the groups directory or search
              results.
            </li>
            <li className="text-gray-600 text-xs hover:text-gray-800 cursor-text">
              Group content and activity will only be visible to members of the
              group.
            </li>
          </ul>
        </label>
      </div>

      <div className="my-4">
        <h4 className="text-gray-600 text-xl">Group Invitations</h4>
        <p className="text-gray-500 my-4 text-sm">
          Which members of this group are allowed to invite others?
        </p>
        <div className="flex items-center flex-wrap gap-3">
          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-xs px-2 py-2 gap-2">
            <input
              // value="3"
              // checked={groupType === "3"}
              // onChange={handleGroupTypeChange}
              name="groupType"
              id="hidden"
              type="radio"
              className=""
            />
            <span className="">All group memebers</span>
          </div>

          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-xs px-2 py-2 gap-2">
            <input
              // value="3"
              // checked={groupType === "3"}
              // onChange={handleGroupTypeChange}
              name="groupType"
              id="hidden"
              type="radio"
              className=""
            />
            <span className="">Group admins and mods only</span>
          </div>

          <div className="text-white flex items-center w-max bg-blue-light rounded-md text-xs px-2 py-2 gap-2">
            <input
              // value="3"
              // checked={groupType === "3"}
              // onChange={handleGroupTypeChange}
              name="groupType"
              id="hidden"
              type="radio"
              className=""
            />
            <span className="">Group admins only</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-sm p-2 w-full">
        <h4 className="text-gray-600 text-2xl">Group Messages</h4>

        <div className="space-y-2 text-gray-600 text-xs pl-10 pt-4">
          <p>Enable Group Messages feature for this group</p>
          <p>
            All members of the group will be automatically joined to the
            conversation of this group
          </p>
        </div>
        <div className="flex items-center gap-1 my-2 pl-10">
          <label
            className="text-white bg-blue-light text-sm rounded-md px-3 py-1 gap-1 flex items-center w-max"
            htmlFor="enabled"
          >
            <input
              id="enabled"
              value="1"
              type="radio"
              checked={true}
              onChange={() => {}}
            />
            <span>Enabled</span>
          </label>

          <label
            className="text-white bg-blue-light text-sm rounded-md px-3 py-1 gap-1 flex items-center w-max"
            htmlFor="disabled"
          >
            <input id="disabled" value="2" type="radio" />
            <span>Disabled</span>
          </label>
        </div>
      </div>

      <button
        className="text-xs disabled:cursor-not-allowed bg-blue-light rounded-[4px] px-6 py-2 text-white mt-3 cursor-pointer"
        type="submit"
        disabled={editGroupLoading}
      >
        {editGroupLoading ? (
          <CustomBeatLoader backgroundColor="#fff" color="#fff" />
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};

export default GroupSettings;
