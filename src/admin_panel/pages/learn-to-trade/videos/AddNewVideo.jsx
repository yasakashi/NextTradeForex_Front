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
import LTRCategory from "../../../components/LTRCategory";
import {
  useAddNewLTRVideoMutation,
  useAddNewLTRVideoSubtitleMutation,
} from "../../../../redux/features/learnToTrade/LearnToTradeApi";
import toast from "react-hot-toast";

const AddNewVideo = () => {
  const [openVideoFile, setOpenVideoFile] = useState(false);
  const [openSubFile, setOpenSubFile] = useState(false);

  const [videoURL, setVideoURL] = useState(null);

  const [addNewLTRVideo, { isLoading }] = useAddNewLTRVideoMutation();
  const [addNewLTRVideoSubtitle, { isLoading: videoSubLoading }] =
    useAddNewLTRVideoSubtitleMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      videoFile: null,
      downloadable: true,
      subTitleLanguage: "",
      subTitleFile: null,
      excerpt: "",
      featuredImage: null,
      lessonCategoryId: 1,
      categoryIds: [],
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      const subData = new FormData();

      subData.append("lang", values?.subTitleLanguage);
      subData.append("subtitlefile", values?.subTitleFile);

      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("lessonCategoryLevelId", values?.lessonCategoryId);
      if (values?.excerpt) formData.append("excerpt", values?.excerpt);
      if (values.webinarFile) {
        formData.append("videofile", values.webinarFile);
      }
      if (values.liveMeetingLink) {
        formData.append("downloadable", values.downloadable);
      }
      if (values.featuredImage) {
        formData.append("featuredImage", values.featuredImage);
      }

      values?.categoryIds.forEach((categoryId) =>
        formData.append("categoriesIds[]", categoryId)
      );
      try {
        const res = await addNewLTRVideo({ data: formData }).unwrap();

        if (res?.messageCode === 200) {
          subData.append("videoid", res?.messageData?.id);

          const subRes = await addNewLTRVideoSubtitle({
            data: subData,
          }).unwrap();
          if (subRes?.messageCode === 200) {
            toast.success("New Video Created.");
            resetForm();
            setVideoURL(null);
          }
          console.log({ subRes });
        }
        console.log({ res });
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

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">Add New Video</h1>
      {console.log(formik.values)}
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
          <NewCourceCard title="Video">
            <div className="w-full p-4 flex flex-col relative space-y-8">
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

              {/* upload video */}
              <div>
                <h5 className="font-medium text-[14px] text-gray-700">
                  Video
                  <span className="text-red-600">*</span>
                </h5>
                <div className="w-full border border-gray-300">
                  <div className="w-full h-[300px] bg-gray-200 border-b border-gray-300">
                    {videoURL ? (
                      <video
                        className="w-full h-full overflow-hidden rounded-lg object-contain"
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
                      onClick={() => setOpenVideoFile(true)}
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
                    open={openVideoFile}
                    set_open={setOpenVideoFile}
                    onSave={() => setOpenVideoFile(false)}
                  />
                </div>

                {/* downloadable */}
                <div className="my-4">
                  <h5 className="font-medium text-[14px] text-gray-700">
                    Downloadable
                    <span className="text-red-600">*</span>
                  </h5>

                  <div className="my-2 space-y-2 text-gray-700">
                    <CustomRadioButton
                      onChange={(e) => {
                        formik.setFieldValue(
                          "downloadable",
                          e.target.value === "Yes"
                        );
                      }}
                      label="Yes"
                      name="downloadable"
                      checked={formik.values.downloadable === true}
                    />
                    <CustomRadioButton
                      onChange={(e) => {
                        formik.setFieldValue(
                          "downloadable",
                          e.target.value === "Yes"
                        );
                      }}
                      label="No"
                      name="downloadable"
                      checked={formik.values.downloadable === false}
                    />
                  </div>
                </div>

                {/* subtitle */}
                <div>
                  <h5 className="font-medium text-[14px] text-gray-700">
                    Subtitles
                  </h5>

                  <div>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <td className="border border-collapse border-gray-300 px-2 py-1"></td>
                          <td className="border border-collapse border-gray-300 px-2 py-1">
                            <h5 className="font-medium text-xs text-gray-700">
                              Language
                              <span className="text-red-600">*</span>
                            </h5>
                          </td>
                          <td className="border border-collapse border-gray-300 px-2 py-1">
                            <h5 className="font-medium text-xs text-gray-700">
                              Subtitle File
                              <span className="text-red-600">*</span>
                            </h5>
                          </td>
                          <td className="border border-collapse border-gray-300 px-2 py-1"></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-collapse border-gray-300 text-gray-500 p-2 text-center">
                            1
                          </td>
                          <td className="border border-collapse w-[45%] border-gray-300 p-2">
                            <CustomTextInput
                              name="subTitleLanguage"
                              value={formik.values.subTitleLanguage}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched?.subTitleLanguage
                                  ? formik.errors?.subTitleLanguage
                                  : null
                              }
                              type="text"
                            />
                          </td>
                          <td className="border border-collapse border-gray-300 p-2">
                            <div className="flex items-center gap-2">
                              <div>
                                {formik.values?.subTitleFile ? (
                                  <input
                                    type="text"
                                    className="text-[13px] font-normal text-gray-600 text-nowrap overflow-hidden border-none outline-none w-full h-full"
                                    value={formik.values?.subTitleFile?.name}
                                    readOnly
                                  />
                                ) : (
                                  <span className="text-[13px] font-normal text-gray-600">
                                    No file selected
                                  </span>
                                )}
                              </div>
                              <CustomButton
                                type="button"
                                onClick={() => setOpenSubFile(true)}
                                size="sm"
                                variant="outlined"
                              >
                                Add File
                              </CustomButton>
                            </div>
                            <LibraryModal
                              file={formik?.values?.subTitleFile}
                              set_file={(file) => {
                                formik.setFieldValue("subTitleFile", file);
                              }}
                              error={formik.errors?.subTitleFile}
                              onBlur={formik.handleBlur}
                              has_side_bar_action={false}
                              accept_file="Subtitle"
                              title="Add Media"
                              open={openSubFile}
                              set_open={setOpenSubFile}
                              onSave={() => setOpenSubFile(false)}
                            />
                          </td>
                          <td className="border border-collapse border-gray-300"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
          <CategoriesComponent
            categoryids={formik.values.categoryIds}
            onChange={(updatedCategoryIds) =>
              formik.setFieldValue("categoryIds", updatedCategoryIds)
            }
          />

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
export default AddNewVideo;

// const videoConfig = {
//     file: {
//       tracks: [
//         {
//           kind: "subtitles",
//           src: "./videos/test_captions.srt",
//           srcLang: "en",
//           label: "English",
//           default: true,
//         },
//       ],
//     },
//   };

// ...
// //component markup for styling, ReactPlayer is wrapped in a container
// <ReactPlayer
//     url={videoUrl}
//     controls={true}
//     width="100%"
//     height="100%"
//     playing={true}
//     muted={true} //temporary fix since videos with audio don't autoplay on most browsers
//     config={videoConfig}
// />
