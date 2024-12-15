import { useFormik } from "formik";
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

import { MdClose } from "react-icons/md";
import TimeFrames from "./TimeFrames";
import PostDescription from "./PostDescription";
import TagsComponent from "../../../../pages/profile/new_course_components/tags_component";
import PostFormat from "./PostFormat";
import VoiceNote from "./VoiceNote";
import CustomTextArea from "../../../../components/ui/CustomTextArea";

const AddNewForumPost = () => {
  const [timeFrameOpen, setTimeframeOpen] = useState(false);

  const [openImageAndVideo, setOpenImageAndVideo] = useState(false);

  const [videoURL, setVideoURL] = useState(null);
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      long: "",
      description: "",
      timeFrames: [],
      analisysType: 1,
      marketCycle: 1,
      webinarFile: null,
      downloadable: true,
      subTitleLanguage: "",
      subTitleFile: null,
      excerpt: "",
      featuredImage: null,
      format: 1,
      privateNote: "",
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
        Add New Forum Post
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
          <NewCourceCard title="Post Content">
            <div className="w-full flex flex-col relative space-y-4">
              {/* long and short */}
              <div className="flex p-4 flex-col space-y-3 justify-between">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Long And Short
                  <span className="text-red-600">*</span>
                </h5>

                <div className="my-2 flex flex-col space-y-2">
                  <CustomRadioButton
                    onChange={(e) => {
                      formik.setFieldValue(
                        "isTopCategory",
                        e.target.value === "Yes"
                      );
                    }}
                    label="Long"
                    name="isTopCategory"
                    checked={formik.values.isTopCategory === true}
                  />
                  <CustomRadioButton
                    onChange={(e) => {
                      formik.setFieldValue(
                        "isTopCategory",
                        e.target.value === "Yes"
                      );
                    }}
                    label="Short"
                    name="isTopCategory"
                    checked={formik.values.isTopCategory === false}
                  />
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />
              {/* time frame */}
              <div className="p-4 mb-10">
                <TimeFrames formik={formik} />
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Analysis type */}
              <div className="flex p-4 flex-col space-y-3 justify-between">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Analysis Type
                  <span className="text-red-600">*</span>
                </h5>

                <select
                  name="analisysType"
                  value={formik.values.analisysType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent py-2 pl-2 rounded-md border border-gray-300 text-gray-600 outline-blue-600 text-sm"
                >
                  <option value="1">#Fundamental</option>
                  <option value="1">#Technical</option>
                  <option value="1">#Market Sentimental</option>
                </select>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Market Cycle */}
              <div className="flex p-4 flex-col space-y-3 justify-between">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Market Cycle
                  <span className="text-red-600">*</span>
                </h5>

                <select
                  name="marketCycle"
                  value={formik.values.marketCycle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent py-2 pl-2 rounded-md border border-gray-300 text-gray-600 outline-blue-600 text-sm"
                >
                  <option value="1">#Bulish</option>
                  <option value="1">#Bearish</option>
                  <option value="1">#Consolidation</option>
                  <option value="1">#Reversal</option>
                </select>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Select Pattern */}
              <div className="flex p-4 flex-col space-y-3 justify-between">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Select Pattern
                  <span className="text-red-600">*</span>
                </h5>

                <select
                  name="analisysType"
                  value={formik.values.analisysType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-transparent py-2 pl-2 rounded-md border border-gray-300 text-gray-600 outline-blue-600 text-sm"
                >
                  <option>Select</option>
                </select>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Range */}
              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Range
                  <span className="text-red-600">*</span>
                </h5>
                <table className="w-full mt-1">
                  <thead>
                    <tr className="text-sm">
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Support 3
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Support 2
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Support 1
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Price
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Resistance 1
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Resistance 2
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Resistance 3
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Trade Setup */}
              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Trade Setup
                  <span className="text-red-600">*</span>
                </h5>
                <table className="w-full mt-1">
                  <thead>
                    <tr className="text-sm">
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        TP1
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        TP2
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        TP3
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        Price
                        <span className="text-red-600">*</span>
                      </th>
                      <th className="text-[#333333] font-normal text-[13px] border border-gray-300 px-1 py-2">
                        SL1
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <input
                          type="text"
                          className="border w-full border-gray-400 rounded-md px-1 py-[6px] text-center text-sm text-gray-600 outline-blue-600"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Description */}
              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Description
                  <span className="text-red-600">*</span>
                </h5>
                <PostDescription formik={formik} />
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Image and video */}
              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Image and Video
                  <span className="text-red-600">*</span>
                </h5>

                <div className="w-full mt-4 border border-gray-300">
                  <div className="w-full h-[300px] bg-gray-200 border-b border-gray-300">
                    {videoURL ? (
                      <video
                        className="w-full h-full overflow-hidden rounded-lg object-contain"
                        autoPlay
                        playsInline
                        controls
                      >
                        <source src={videoURL} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
                  <div className="p-3">
                    <CustomButton
                      type="button"
                      onClick={() => setOpenImageAndVideo(true)}
                      size="sm"
                    >
                      Add to Gallery
                    </CustomButton>
                  </div>
                  <LibraryModal
                    file={formik?.values?.videoFile}
                    set_file={(file) => {
                      formik.setFieldValue("videoFile", file);
                    }}
                    error={formik.errors?.videoFile}
                    onBlur={formik.handleBlur}
                    has_side_bar_action={false}
                    title="Add Media"
                    open={openImageAndVideo}
                    set_open={setOpenImageAndVideo}
                    onSave={() => setOpenImageAndVideo(false)}
                  />
                </div>
              </div>

              {/* voice note */}
              <div className="w-full h-[1px] bg-gray-300" />

              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Voice Notes
                </h5>
                <VoiceNote formik={formik} />
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              <div className="mb-4 p-4">
                <label className="space-y-2">
                  <h5 className="font-medium text-[14px] text-gray-700">
                    Private Note
                  </h5>
                  <CustomTextArea
                    name="privateNote"
                    value={formik.values?.privateNote}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-[140px]"
                    placeholder="Please put your temporary text here."
                    error={
                      formik.touched.privateNote
                        ? formik.errors.privateNote
                        : null
                    }
                  />
                </label>
              </div>

              {/* private note */}
            </div>
          </NewCourceCard>

          {/* excerpt */}
          <ExcerptComponent name="excerpt" formik={formik} />

          <div className="lg:hidden space-y-4">
            <PostFormat formik={formik} />
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>

          <div className="lg:hidden space-y-4">
            <TagsComponent name="courseTags" formik={formik} />
          </div>

          {/* categories */}
          <CategoriesComponent />

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <PostFormat formik={formik} />
          <TagsComponent name="courseTags" formik={formik} />{" "}
          <FeaturedImageComponent name="featuredImage" formik={formik} />
          <PublishComponent isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddNewForumPost;
