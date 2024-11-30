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

const dropdownOptions = [
  { label: "Text Only", value: "TextOnly" },
  { label: "Image Only", value: "ImageOnly" },
  { label: "Image with File", value: "ImageWithFile" },
  { label: "Gallery Video", value: "GalleryVideo" },
  { label: "YouTube Video", value: "YoutubeVideo" },
  { label: "Other Video Source", value: "OtherVideo" },
  { label: "PDF Document", value: "PdfDocument" },
  { label: "Read Only PDF", value: "ReadOnlyPdf" },
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
        return { description: "", file: null };
      case "ImageOnly":
        return { imageFile: null };
      case "ImageWithFile":
        return { imageFile: null, text: "", file: null };
      case "GalleryVideo":
        return { videoFile: null };
      case "YoutubeVideo":
        return { videoId: "" };
      case "OtherVideo":
        return { videoId: "" };
      case "PdfDocument":
        return { pdfShortcodeId: "" };
      case "ReadOnlyPdf":
        return {
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
                    className="bg-blue-accent w-full text-nowrap text-sm text-white px-4 py-2 rounded-md cursor-pointer"
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

              <div>
                {formik.values.components.map((comp, index) => {
                  const type = Object.keys(comp)[0]; // Get the type from component object

                  return (
                    <div key={index} className="mb-4">
                      <h4 className="font-medium text-gray-700">{type}</h4>

                      {/* Render fields dynamically */}
                      {type === "TextOnly" && (
                        <div>
                          <CustomTextArea
                            name={`components[${index}].description`}
                            value={formik.values.components[index].description}
                            onChange={formik.handleChange}
                            placeholder="Enter text description"
                          />
                          <input
                            type="file"
                            name={`components[${index}].file`}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `components[${index}].file`,
                                e.target.files[0]
                              )
                            }
                          />
                        </div>
                      )}

                      {type === "ImageOnly" && (
                        <input
                          type="file"
                          name={`components[${index}].imageFile`}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `components[${index}].imageFile`,
                              e.target.files[0]
                            )
                          }
                        />
                      )}

                      {/* Add other cases for different component types */}
                    </div>
                  );
                })}
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
