import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { useState } from "react";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";
import CourseAuthor from "../../../../pages/profile/new_course_components/CourseAuthor";
import TagsComponent from "../../../../pages/profile/new_course_components/tags_component";
import LTRCategory from "../../../components/LTRCategory";
import LessonTextOnly from "./LessonTextOnly";
import LessonImageOnly from "./LessonImageOnly";
import LessonImageWithText from "./LessonImageWithText";
import LessonGalleryVideo from "./LessonGalleryVideo";
import LessonYoutubeVideo from "./LessonYoutubeVideo";
import LessonVideoFromAnyOtherSources from "./LessonVideoFromAnyOtherSources";
import LessonPdfDocument from "./LessonPdfDocument";
import LessonReadOnlyPdf from "./LessonReadOnlyPdf";
import LessonTable from "./LessonTable";
import LessonWidgetScript from "./LessonWidgetScript";
import LessonAudioBook from "./LessonAudioBook";

const dropdownOptions = [
  { label: "Text Only", value: "TextOnly" },
  { label: "Image Only", value: "ImageOnly" },
  { label: "Image with File", value: "ImageWithText" },
  { label: "Gallery Video", value: "GalleryVideo" },
  { label: "YouTube Video", value: "YoutubeVideo" },
  { label: "Other Video Source", value: "OtherVideo" },
  { label: "PDF Document", value: "PdfDocument" },
  { label: "Read Only PDF", value: "ReadOnlyPdf" },
  { label: "Table", value: "Table" },
  { label: "Widget Script", value: "WidgetScript" },
  { label: "Images", value: "Images" },
  { label: "Audio Book", value: "Audio Book" },
];

const AddNewLesson = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [videoURL, setVideoURL] = useState(null);
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      privateNote: "",
      excerpt: "",
      featuredImage: null,
      lessonCategoryId: "1",
      categoryIds: "",
      components: [],
    },

    onSubmit: (values) => {
      const filteredComponents = values?.components?.filter((com) =>
        Object.values(com).som((val) => val !== null && val !== "")
      );

      console.log(filteredComponents);
    },
  });

  const addComponent = (type) => {
    const newComponent = getefaultComponentValeus(type);
    formik.setFieldValue("components", [
      ...formik.values.components,
      newComponent,
    ]);
  };

  const getefaultComponentValeus = (type) => {
    switch (type) {
      case "TextOnly":
        return { type, description: "", file: null };
      case "ImageOnly":
        return { type, imageFile: null };
      case "ImageWithText":
        return { type, imageFile: null, text: "", file: null };
      case "GalleryVideo":
        return { type, videoFile: null };
      case "YoutubeVideo":
        return { type, videoId: "" };
      case "OtherVideo":
        return { type, videoId: "" };
      case "PdfDocument":
        return { type, pdfShortcodeId: "" };
      case "ReadOnlyPdf":
        return {
          type,
          pdfTitle: "",
          pdfShortCodeId: "",
          authorId: "",
          shortDescription: "",
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">Add New Lesson</h1>

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
          <NewCourceCard title="Lesson Content">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              {/* lesson conent type */}
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-[14px] text-gray-700 capitalize">
                  Main lesson content
                </h5>

                <div className="relative w-[200px]">
                  {/* Trigger Button */}
                  <span
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="bg-blue-accent w-full text-nowrap text-[13px] text-white px-3 py-[6px] border border-[#2271b1] rounded-[3px] cursor-pointer font-medium"
                  >
                    Add lesson component
                  </span>

                  {/* Dropdown Menu */}
                  {dropdownVisible && (
                    <div className="absolute z-10 mt-2 bg-[#1D2939] text-[#D0D5DD] w-[280px] rounded-[6px] text-[13px] shadow-md">
                      {dropdownOptions.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 cursor-pointer hover:bg-[#293B4D] transition"
                          onClick={() => {
                            addComponent(option.value);
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

              {/* content */}

              {/* <LessonTextOnly formik={formik} /> */}
              {/* <LessonTextOnly formik={formik} />
              
             
           
            
            
          
         
              <LessonTable formik={formik} />
              <LessonWidgetScript formik={formik} />
              <LessonAudioBook formik={formik} /> */}

              <div>
                {formik.values.components.map((comp, index) => (
                  <div key={index} className="mb-4">
                    {comp?.type === "TextOnly" ? (
                      <LessonTextOnly formik={formik} />
                    ) : comp?.type === "ImageOnly" ? (
                      <LessonImageWithText formik={formik} />
                    ) : comp?.type === "ImageWithText" ? (
                      <LessonImageWithText formik={formik} />
                    ) : comp?.type === "GalleryVideo" ? (
                      <LessonGalleryVideo formik={formik} />
                    ) : comp?.type === "YoutubeVideo" ? (
                      <LessonYoutubeVideo formik={formik} />
                    ) : comp?.type === "OtherVideo" ? (
                      <LessonVideoFromAnyOtherSources formik={formik} />
                    ) : comp?.type === "PdfDocument" ? (
                      <LessonPdfDocument formik={formik} />
                    ) : comp?.type === "ReadOnlyPdf" ? (
                      <LessonReadOnlyPdf formik={formik} />
                    ) : null}
                  </div>
                ))}
              </div>

              {/* private note */}
              <div className="border-t border-t-gray-300">
                <label className="space-y-2">
                  <h5 className="font-medium text-[14px] pt-10 text-gray-700">
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
            </div>
          </NewCourceCard>

          {/* excerpt */}
          <ExcerptComponent name="excerpt" formik={formik} />

          <div className="lg:hidden space-y-4">
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>

          <CourseAuthor formik={formik} />

          <div className="lg:hidden space-y-4">
            <LTRCategory formik={formik} />
            <TagsComponent formik={formik} />
          </div>

          {/* categories */}
          <CategoriesComponent />

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <PublishComponent isLoading={isLoading} />

          <LTRCategory formik={formik} />
          <TagsComponent formik={formik} />

          <FeaturedImageComponent name="featuredImage" formik={formik} />
        </div>
      </form>
    </div>
  );
};
export default AddNewLesson;
