import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { useEffect, useState } from "react";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";
import LTRCategory from "../../../components/LTRCategory";
import DflipSettings from "./DFlipSettings";

import * as Yup from "yup";
import { useAddNewLTREBookMutation } from "../../../../redux/features/learnToTrade/LearnToTradeApi";
import toast from "react-hot-toast";
import AdminPanelTitle from "../../../components/AdminPanelTitle";
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  ,
  "image/web",
];

const FILE_SIZE = 500 * 1024;
const SUPPORTED_PDF_FORMATS = ["application/pdf"];

const ebookInitialValues = {
  title: "",
  author: "",
  description: "",
  bgColor: "",
  flipDuration: "",
  containerHeight: "",
  autoplayDuration: "",
  forcePageFit: true,
  autoEnableOutline: false,
  autoEnableThumbnail: false,
  overwritePdfOutline: false,
  bookSourceTypeId: 1,
  displayMode: 1,
  hardPageId: 1,
  pdfPageRenderSize: 1,
  autoEnableSound: 1,
  enableDownload: 1,
  pageMode: 1,
  singlePageMode: 1,
  controlsPosition: 1,
  direction: 1,
  enableAutoplay: 1,
  enableAutoplayAutomatically: 1,
  pageSize: 1,
  lessonCategoryId: 1,
  featuredImage: null,
  bgimage: null,
  pdffile: null,
  pdfthumbnailimage: null,
  categoryIds: [],
  pageimages: [],
};

const ebookValidationSchema = Yup.object().shape({
  author: Yup.string().required("Author is required."),
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  pdffile: Yup.mixed()
    .required("PDF file is required.")
    .test("fileSize", "File must be less than 500 KB", (value) => {
      return !value || (value && value.size <= FILE_SIZE);
    })
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_PDF_FORMATS.includes(value.type));
    }),
  categoryIds: Yup.array()
    .of(Yup.number().required("Category ID is required."))
    .min(1, "At least one category ID is required."),

  bgColor: Yup.string()
    .matches(
      /^#([0-9A-F]{3}){1,2}$/i,
      "Must be a valid hex color ( Example: #FFFFFF)"
    )
    .nullable(),
});

const AddNewEBook = () => {
  const [openVideoFile, setOpenVideoFile] = useState(false);
  const [openSubFile, setOpenSubFile] = useState(false);

  const [videoURL, setVideoURL] = useState(null);

  const [addNewLTREBook, { isLoading }] = useAddNewLTREBookMutation();

  const formik = useFormik({
    initialValues: ebookInitialValues,
    validationSchema: ebookValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("author", values?.author);
      formData.append("description", values?.description);

      formData.append("autoplayDuration", values?.autoplayDuration);
      formData.append("forcePageFit", values?.forcePageFit);
      formData.append("autoEnableOutline", values?.autoEnableOutline);
      formData.append("autoEnableThumbnail", values?.autoEnableThumbnail);
      formData.append("overwritePdfOutline", values?.overwritePdfOutline);
      formData.append("bookSourceTypeId", values?.bookSourceTypeId);
      formData.append("displayMode", values?.displayMode);
      formData.append("hardPageId", values?.hardPageId);
      formData.append("pdfPageRenderSize", values?.pdfPageRenderSize);
      formData.append("autoEnableSound", values?.autoEnableSound);
      formData.append("enableDownload", values?.enableDownload);
      formData.append("pageMode", values?.pageMode);
      formData.append("singlePageMode", values?.singlePageMode);
      formData.append("controlsPosition", values?.controlsPosition);
      formData.append("direction", values?.direction);
      formData.append("enableAutoplay", values?.enableAutoplay);
      formData.append("pageSize", values?.pageSize);
      formData.append("lessonCategoryLevelId", formik.values?.lessonCategoryId);
      formData.append(
        "enableAutoplayAutomatically",
        values?.enableAutoplayAutomatically
      );

      if (values?.bgColor) {
        formData.append("bgColor", values?.bgColor);
      }

      if (values?.flipDuration) {
        formData.append("flipDuration", values?.flipDuration);
      }
      if (values?.containerHeight) {
        formData.append("containerHeight", values?.containerHeight);
      }
      if (values?.featuredImage instanceof File) {
        formData.append("featuredimage", values?.featuredImage);
      }

      if (values?.bgimage instanceof File) {
        formData.append("bgimage", values?.bgimage);
      }

      if (values?.pdffile instanceof File) {
        formData.append("pdffile", values?.pdffile);
      }

      if (values?.pdfthumbnailimage instanceof File) {
        formData.append("pdfthumbnailimage", values?.pdfthumbnailimage);
      }

      values?.categoryIds.forEach((categoryId) =>
        formData.append("categoryIds[]", categoryId)
      );

      values?.pageimages.forEach((pageImage) =>
        formData.append("pageimages[]", pageImage)
      );

      try {
        const res = await addNewLTREBook({ data: formData }).unwrap();

        if (res?.messageCode === 200) {
          toast.success("New Book Created.");
          resetForm();
        }
        console.log({ res });
      } catch (error) {
        toast.error("Something went wrong! please try again.");
        console.log(error);
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
      {/* <h1 className="font-semibold text-2xl text-white mb-4">Add New Book</h1> */}

      <AdminPanelTitle title="Add New Book" />
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

          <DflipSettings formik={formik} />

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
            errorMsg={
              formik.errors?.categoryIds ? formik.errors?.categoryIds : null
            }
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
          <PublishComponent isLoading={isLoading} />
          <FeaturedImageComponent name="featuredImage" formik={formik} />
        </div>
      </form>
    </div>
  );
};
export default AddNewEBook;
