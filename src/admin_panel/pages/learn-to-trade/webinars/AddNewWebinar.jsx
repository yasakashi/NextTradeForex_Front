import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { useEffect, useState } from "react";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import LTRCategory from "../../../components/LTRCategory";
import { MdClose } from "react-icons/md";

const dropdownOptions = [
  { label: "Webinar", value: "webinarVideo" },
  { label: "Live Meeting", value: "liveMeeting" },
];

const AddNewWebinar = () => {
  const [openWebinarFile, setOpenWebinarFile] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [webinarType, setWebinarType] = useState(null);

  const [videoURL, setVideoURL] = useState(null);
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      webinarFile: null,
      downloadable: true,
      subTitleLanguage: "",
      subTitleFile: null,
      excerpt: "",
      featuredImage: null,
    },
  });

  useEffect(() => {
    if (formik.values?.videoFile) {
      setVideoURL(URL.createObjectURL(formik.values?.videoFile));
    }
  }, [formik.values?.videoFile]);

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
                                      {formik?.values?.audioFile?.name}
                                    </span>
                                  </div>
                                  <div className="flex text-nowrap text-sm space-x-2">
                                    <h5 className="font-medium text-[14px] text-gray-700">
                                      File size :
                                    </h5>
                                    <span>
                                      {(
                                        formik.values?.audioFile?.size /
                                        (1024 * 1024)
                                      ).toFixed(2)}
                                      MB
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute top-2 right-2 text-white bg-gray-900 flex items-center justify-center rounded-full p-1 shadow-sm">
                                <button onClick={clearnAuio} type="button">
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
                            file={formik?.values?.audioFile}
                            set_file={(file) => {
                              formik.setFieldValue("audioFile", file);
                            }}
                            error={formik.errors?.audioFile}
                            onBlur={formik.handleBlur}
                            has_side_bar_action={false}
                            accept_file="Audio"
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
                      <CustomTextInput className="px-2 py-2 rounded-lg" />
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
                      className="bg-blue-accent ml-auto w-full text-nowrap text-sm text-white px-4 py-2 rounded-md cursor-pointer"
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
              </div>

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
                    value={formik?.values?.meetingDateTime}
                    onChange={(date) =>
                      formik.setFieldValue("meetingDateTime", date.format())
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
