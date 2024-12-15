import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { useEffect, useState } from "react";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import LTRCategory from "../../../components/LTRCategory";
import { MdClose } from "react-icons/md";
import { useAddNewLTRWebinarMutation } from "../../../../redux/features/learnToTrade/LearnToTradeApi";
import toast from "react-hot-toast";

import * as Yup from "yup";

const FILE_SIZE = 500 * 1024; // 500 KB
const SUPPORTED_IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const dropdownOptions = [
  { label: "Webinar", value: "webinarVideo" },
  { label: "Live Meeting", value: "liveMeeting" },
];

const webinarValidationSchema = Yup.object()
  .shape({
    title: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
    webinarFile: Yup.mixed().nullable(),
    liveMeetingLink: Yup.string().url("Must be a valid URL").nullable(),
    dateAndTime: Yup.date().required("Date and Time is required."),
    featuredImage: Yup.mixed()
      .optional()
      .nullable()
      .test("fileSize", "File must be less than 500 KB", (value) => {
        return !value || (value && value.size <= FILE_SIZE);
      })
      .test("fileFormat", "Unsupported format", (value) => {
        return (
          !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
        );
      }),
  })
  .test(
    "video-or-link",
    "You must provide either a video file or a live meeting link.",
    function (values) {
      return (
        (values?.webinarFile && !values?.liveMeetingLink) ||
        (!values?.webinarFile && values?.liveMeetingLink)
      );
    }
  );

const AddNewWebinar = () => {
  const [openWebinarFile, setOpenWebinarFile] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [webinarType, setWebinarType] = useState(null);

  const [videoURL, setVideoURL] = useState(null);

  const [addNewLTRWebinar, { isLoading }] = useAddNewLTRWebinarMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      webinarFile: null,
      liveMeetingLink: "",
      excerpt: "",
      featuredImage: null,
      lessonCategoryId: 1,
      categoryids: [],
      dateAndTime: "",
    },
    validationSchema: webinarValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("title", values?.title);
      formData.append("description", values?.description);
      if (values.webinarFile) {
        formData.append("webinarFile", values.webinarFile);
      }
      if (values.liveMeetingLink) {
        formData.append("liveMeetingLink", values.liveMeetingLink);
      }
      if (values.featuredImage) {
        formData.append("featuredImage", values.featuredImage);
      }

      values?.categoryids.forEach((categoryId) =>
        formData.append("categories[]", categoryId)
      );

      try {
        const response = await addNewLTRWebinar({ data: formData }).unwrap();

        if (response?.data?.messageCode === 200) {
          toast.success("Topic created.");
          resetForm();
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! please try again.");
      }
    },
  });

  useEffect(() => {
    if (formik.values?.videoFile) {
      setVideoURL(URL.createObjectURL(formik.values?.videoFile));
    }
  }, [formik.values?.videoFile]);

  const clearVideoFile = () => {
    formik.setFieldValue("webinarFile", null);
    setVideoURL(null);
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">
        Add New Webinar
      </h1>

      <form
        onSubmit={formik.handleSubmit}
        className="space-x-0 lg:space-x-4 grid grid-cols-1 lg:grid-cols-4 items-start"
      >
        <div className="col-span-1 lg:col-span-3">
          <CustomTextInput
            name="title"
            placeholder="Add title"
            className="border border-gray-700 py-[10px] placeholder:text-sm rounded-sm"
            value={formik.values?.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.touched?.title ? formik.errors?.title : ""}
          />
          <NewCourceCard title="Webinar">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              <div className="flex flex-col space-y-3 justify-between">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Webinar
                  <span className="text-red-600">*</span>
                </h5>

                {webinarType === null ? (
                  <div className="border border-gray-300 text-sm text-gray-600 w-full text-center border-dashed flex items-center justify-center py-5 rounded-md">
                    Click the "Add Row" button below to start creating your
                    layout
                  </div>
                ) : webinarType === "webinarVideo" ? (
                  <NewCourceCard title="Webinar">
                    <div className="w-full p-4 flex flex-col relative space-y-8">
                      {/* upload Webinar */}
                      <div className="pb-4">
                        <h5 className="font-medium text-[14px] text-gray-700">
                          Webinar Video
                          <span className="text-red-600">*</span>
                        </h5>
                        <div className="w-full">
                          {formik.values.webinarFile ? (
                            <div className="w-full my-4 h-[100px] flex items-center gap-2 border border-gray-300 p-4 relative">
                              <div className="flex items-center gap-4">
                                <div className="bg-gray-200 w-[70px] flex items-center justify-center shrink-0 p-2 border border-gray-300">
                                  <img src="/assets/audio.png" alt="Audio" />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex text-nowrap text-sm space-x-2">
                                    <h5 className="font-medium text-[14px] text-gray-700">
                                      File name :
                                    </h5>
                                    <span className="text-blue-accent text[13px]">
                                      {formik?.values?.webinarFile?.name}
                                    </span>
                                  </div>
                                  <div className="flex text-nowrap text-sm space-x-2">
                                    <h5 className="font-medium text-[14px] text-gray-700">
                                      File size :
                                    </h5>
                                    <span>
                                      {(
                                        formik.values?.webinarFile?.size /
                                        (1024 * 1024)
                                      ).toFixed(2)}
                                      MB
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute top-2 right-2 text-white bg-gray-900 flex items-center justify-center rounded-full p-1 shadow-sm">
                                <button onClick={clearVideoFile} type="button">
                                  <MdClose size={20} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 flex items-center gap-2">
                              <span className="text-[13px] text-gray-700 font-normal">
                                No file selected
                              </span>
                              <CustomButton
                                type="button"
                                onClick={() => setOpenWebinarFile(true)}
                                size="sm"
                              >
                                Add File
                              </CustomButton>
                            </div>
                          )}

                          <LibraryModal
                            file={formik?.values?.webinarFile}
                            set_file={(file) => {
                              formik.setFieldValue("webinarFile", file);
                            }}
                            error={formik.errors?.webinarFile}
                            onBlur={formik.handleBlur}
                            has_side_bar_action={false}
                            title="Add Media"
                            open={openWebinarFile}
                            set_open={setOpenWebinarFile}
                            onSave={() => setOpenWebinarFile(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </NewCourceCard>
                ) : webinarType === "liveMeeting" ? (
                  <NewCourceCard title="Live Meeting">
                    <div className="p-4">
                      <h5 className="font-medium text-[14px] text-gray-700">
                        Meeting Link
                        <span className="text-red-600">*</span>
                      </h5>
                      <CustomTextInput
                        name="liveMeetingLink"
                        value={formik.values.liveMeetingLink}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="px-2 py-[1] rounded-lg mt-2"
                        placeholder="https://www.example.com"
                      />
                    </div>
                  </NewCourceCard>
                ) : null}
                {/* <div className="border border-gray-300 text-sm text-gray-600 w-full text-center border-dashed flex items-center justify-center py-5 rounded-md">
                  Click the "Add Row" button below to start creating your layout
                </div> */}

                <div className="ml-auto flex justify-end">
                  <div className="relative w-[200px]">
                    {/* Trigger Button */}
                    <span
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      className="bg-blue-accent flex justify-end w-max ml-auto text-nowrap text-[13px] text-white px-3 py-[6px] rounded-md cursor-pointer"
                    >
                      Add Row
                    </span>

                    {/* Dropdown Menu */}
                    {dropdownVisible && (
                      <div className="absolute z-10 mt-2 bg-[#1D2939] text-[#D0D5DD] w-[160px] rounded-[6px] text-[13px] shadow-md">
                        {dropdownOptions.map((option) => (
                          <div
                            key={option.value}
                            className="px-4 py-2 cursor-pointer hover:bg-[#293B4D] transition"
                            onClick={() => {
                              formik.setFieldValue("webinarFile", null);
                              formik.setFieldValue("liveMeetingLink", "");
                              setWebinarType(option?.value);
                              setDropdownVisible(false); // Close dropdown after selecting
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {formik.errors?.webinarFile ||
                formik.errors?.liveMeetingLink ? (
                  <span className="text-sm p-1 text-red-600">
                    {formik.errors?.webinarFile ||
                      formik.errors.liveMeetingLink}
                  </span>
                ) : null}
              </div>
              {console.log(formik.values)}

              {/* Description */}
              <label className="space-y-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Description
                  <span className="text-red-600">*</span>
                </h5>
                <CustomTextArea
                  name="description"
                  value={formik.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-[200px]"
                  error={
                    formik.touched.description
                      ? formik.errors.description
                      : null
                  }
                />
              </label>

              {/* Date and Time */}
              {/* Meeting Date and Time */}
              <div className="flex flex-col gap-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Date and Time
                  <span className="text-red-600">*</span>
                </h5>
                <div className="w-full">
                  <DatePicker
                    format="MM/DD/YYYY HH:mm:ss"
                    plugins={[<TimePicker hideSeconds position="bottom" />]}
                    calendarPosition="top-right"
                    inputClass="w-full block py-[6px] text-gray-600 px-3 border border-gray-300"
                    containerClassName="w-full"
                    value={formik?.values?.dateAndTime}
                    onChange={(date) =>
                      formik.setFieldValue("dateAndTime", date.format())
                    }
                  />
                </div>
              </div>
            </div>
          </NewCourceCard>

          {/* excerpt */}
          <ExcerptComponent name="excerpt" formik={formik} />

          <div className="lg:hidden space-y-4">
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>

          <div className="lg:hidden space-y-4">
            <LTRCategory formik={formik} />
          </div>

          {/* categories */}
          <CategoriesComponent />

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <LTRCategory formik={formik} />
          <PublishComponent isLoading={isLoading} />
          <FeaturedImageComponent name="featuredImage" formik={formik} />
        </div>
      </form>
    </div>
  );
};
export default AddNewWebinar;
