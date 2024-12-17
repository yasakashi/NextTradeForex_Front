import NewCourceCard from "../../pages/profile/new_course_components/new_cource_card";

const types = [
  {
    id: 1,
    name: "Normal",
  },
  {
    id: 2,
    name: "Sticky",
  },
  {
    id: 3,
    name: "Super Sticky",
  },
];

const statusItems = [
  {
    id: 1,
    name: "Opne",
  },
  {
    id: 2,
    name: "Closed",
  },
  {
    id: 3,
    name: "Spam",
  },
  {
    id: 4,
    name: "Trash",
  },
  {
    id: 5,
    name: "Pending",
  },
];
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
            {types?.map((type, index) => (
              <option key={index} value={type?.id}>
                {type.name}
              </option>
            ))}
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
            {statusItems?.map((status, index) => (
              <option key={index} value={status?.id}>
                {status?.name}
              </option>
            ))}
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
