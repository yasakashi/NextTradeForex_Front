import { useFormik } from "formik";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { useEffect, useState } from "react";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";

import PostDescription from "../Forum/PostDescription";
import TagsComponent from "../../../../pages/profile/new_course_components/tags_component";
import CourseAuthor from "../../../../pages/profile/new_course_components/CourseAuthor";


const AddNewBlogPost = () => {


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
        Add New Blog Post
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
              {/* Description */}
              <div className="mb-4 p-4">
                <h5 className="font-medium text-[13px] text-gray-700">
                  Description
                  <span className="text-red-600">*</span>
                </h5>
                <PostDescription formik={formik} />
              </div>
            </div>
          </NewCourceCard>

          <div className="lg:hidden space-y-4">
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>

          <div className="lg:hidden space-y-4">
            <TagsComponent name="courseTags" formik={formik} />
          </div>

          <CourseAuthor formik={formik} />

          {/* categories */}
          <CategoriesComponent />

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <TagsComponent name="courseTags" formik={formik} />{" "}
          <FeaturedImageComponent name="featuredImage" formik={formik} />
          <PublishComponent isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddNewBlogPost;
