import NewCourceCard from "../../pages/profile/new_course_components/new_cource_card";

const LTRTopicAttributes = () => {
  return (
    <NewCourceCard title="Topic Attributes">
      <div className="w-full p-4">
        <div className="grid grid-cols-2 items-center">
          <label className="text-[13px] text-gray-700 font-semibold">
            Type :
          </label>
          <select className="text-base py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600">
            <option>Normal</option>
            <option>Sticky</option>
            <option>Super Sticky</option>
          </select>
        </div>

        <div className="grid grid-cols-2 items-center mt-3">
          <label className="text-[13px] text-gray-700 font-semibold">
            Status :
          </label>
          <select className="text-base py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600">
            <option>Open</option>
            <option>Close</option>
            <option>Spam</option>
            <option>Trash</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="w-full h-[1px] bg-gray-300 my-3" />

        <div className="grid grid-cols-2 items-center">
          <label className="text-[13px] text-gray-700 font-semibold">
            Forum :
          </label>
          <select className="text-base py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600">
            <option>Open</option>
            <option>Close</option>
            <option>Spam</option>
            <option>Trash</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LTRTopicAttributes;
