import { CgClose } from "react-icons/cg";
import ModalLayout from "../../../../common/modal_layout";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { useState } from "react";
import { useGetCoursesQuery } from "../../../../redux/features/api/course/courseApii";
import { IoIosArrowDown } from "react-icons/io";

const AddNewAnnouncement = ({ isOpen, setIsOpen }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      bio: "",
    },

    onSubmit: async (values) => {
      console.log({ values });
    },
  });

  return (
    <ModalLayout onClose={setIsOpen} open={isOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex min-w-[50vw] flex-col max-h-[90vh]"
      >
        <div className="flex w-full flex-col border-b border-gray-300">
          <div className="flex justify-between items-center py-4 px-8 w-full">
            <h4 className="font-semibold">Add New Instructor</h4>
            <button onClick={() => setIsOpen(false)}>
              <CgClose />
            </button>
          </div>
        </div>

        <div className="px-8 py-8 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
          <FormItemSelect
            formik={formik}
            name="courseId"
            label="Select Course"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <FormItem
            formik={formik}
            name="title"
            label="Announcement Title"
            placeholder="Announcement title"
          />

          <FormItemTextArea
            formik={formik}
            name="summary"
            label="Summary"
            placeholder="Summary"
          />
        </div>

        {/* divider */}
        <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-accent disabled:cursor-not-allowed px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm"
          >
            {isLoading ? "Sending ..." : "Add Lesson"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddNewAnnouncement;

const FormItem = ({
  formik,
  name,
  label,
  type = "text",
  description = "",
  placeholer = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          type={type}
          placeholder={placeholer}
          className="text-sm placeholder:text-gray-600 placeholder:text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />

        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-sm font-normal">
            {formik.errors[`${name}`]}
          </span>
        ) : null}

        {description ? (
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm p-1 text-[#646970]"
          ></p>
        ) : null}
      </div>
    </label>
  );
};

const FormItemTextArea = ({
  formik,
  name,
  label,
  type = "text",
  description = "",
  placeholer = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <CustomTextArea
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          type={type}
          placeholder={placeholer}
          className="text-sm h-[150px] placeholder:text-gray-600 placeholder:text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />

        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-sm font-normal">
            {formik.errors[`${name}`]}
          </span>
        ) : null}

        {description ? (
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm p-1 text-[#646970]"
          ></p>
        ) : null}
      </div>
    </label>
  );
};

const FormItemSelect = ({
  formik,
  name,
  label,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const { data: { messageData: courses } = { messageData: [] }, isLoading } =
    useGetCoursesQuery({
      data: {
        Id: null,
        authorId: null,
        allowQA: null,
        isPublicCourse: null,
        difficultyLevelId: null,
        courseTags: "",
        courseName: "",
        pageindex: 1,
        rowcount: 21,
      },
    });

  const filteredOptions = courses.filter((course) =>
    course.courseName.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-gray-600 font-medium">Course</h4>
          <div>
            <div className="relative my">
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full relative bg-white border border-gray-400 rounded-md px-3 py-[6px] hover:cursor-pointer text-gray-600"
              >
                <span>{selectedOption ? selectedOption : "Select course"}</span>
                <IoIosArrowDown
                  size={18}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 font-bold"
                />
              </div>
              {isOpen && (
                <ul className="absolute z-[100] w-full bg-white border border-gray-300 rounded-md mt-1 max-h-[300px] min-h-[260px] overflow-y-auto overflow-x-hidden overscroll-y-scroll scrollbar-thin px-2 text-gray-700">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none my-1 mx-1 focus:border-blue-600"
                    placeholder="Search ..."
                  />
                  <li
                    onMouseDown={() => {
                      setSelectedOption("All Courses");
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    All Courses
                  </li>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onMouseDown={() => {
                          setSelectedOption(option?.courseName);
                          setIsOpen(false);
                        }}
                      >
                        {option?.courseName}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      No results found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};
