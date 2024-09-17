const CreateGroupSettings = ({ groupType, handleGroupTypeChange }) => {
  return (
    <>
      <div className="flex flex-col gap- border-2 border-gray-200 rounded-sm p-2 w-full">
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
      </div>

      <div className="flex flex-col gap- border-2 border-gray-200 rounded-sm p-2 w-full">
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
    </>
  );
};

export default CreateGroupSettings;
