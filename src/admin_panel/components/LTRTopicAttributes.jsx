import NewCourceCard from "../../pages/profile/new_course_components/new_cource_card";

const LTRTopicAttributes = ({ formik }) => {
  return (
    <NewCourceCard title="Topic Attributes">
      <div className="w-full p-4">
        <div className="grid grid-cols-2 items-center">
          <label className="text-[13px] text-gray-700 font-semibold">
            Type :
          </label>
          <select
            value={formik.values?.typeId}
            onChange={(e) => formik.setFieldValue("typeId", e.target.value)}
            className="text-sm py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600"
          >
            <option value={1}>Normal</option>
            <option value={2}>Sticky</option>
            <option value={3}>Super Sticky</option>
          </select>
        </div>

        <div className="grid grid-cols-2 items-center mt-3">
          <label className="text-[13px] text-gray-700 font-semibold">
            Status :
          </label>
          <select
            value={formik.values?.statusId}
            onChange={(e) => formik.setFieldValue("statusId", e.target.value)}
            className="text-sm py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600"
          >
            <option value={1}>Open</option>
            <option value={2}>Close</option>
            <option value={3}>Spam</option>
            <option value={4}>Trash</option>
            <option value={5}>Pending</option>
          </select>
        </div>

        <div className="w-full h-[1px] bg-gray-300 my-3" />

        <div className="grid grid-cols-2 items-center">
          <label className="text-[13px] text-gray-700 font-semibold">
            Forum :
          </label>
          <select
            value={formik.values?.forumId}
            onChange={(e) => formik.setFieldValue("forumId", e.target.value)}
            className="text-sm py-[6px] pl-2 rounded-sm bg-transparent border border-gray-500 outline-blue-600 active:text-blue-600"
          >
            <option value="">No forum</option>
          </select>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LTRTopicAttributes;
