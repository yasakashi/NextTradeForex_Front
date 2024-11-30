import { useFormik } from "formik";
import Expandable from "../../../../components/Expandable";
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
import DflipSettings from "./DFlipSettings";

const AddNewEBook = () => {
  const [openVideoFile, setOpenVideoFile] = useState(false);
  const [openSubFile, setOpenSubFile] = useState(false);

  const [videoURL, setVideoURL] = useState(null);
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      description: "",
      videoFile: null,
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
      <h1 className="font-semibold text-2xl text-white mb-4">Add New Book</h1>

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
          <NewCourceCard title="PDF details">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              <label className="space-y-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Author
                </h5>

                <CustomTextInput
                  name="author"
                  placeholder=""
                  className="border border-gray-300 py-[10px] placeholder:text-sm rounded-lg"
                  value={formik.values?.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik?.touched?.author ? formik.errors?.author : ""}
                />
              </label>
              <label className="space-y-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Description
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
            </div>
          </NewCourceCard>

          <DflipSettings formik={formik} />+

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
export default AddNewEBook;
