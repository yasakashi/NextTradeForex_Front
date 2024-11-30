import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomRadioButton from "./customRadioButton";
import DraftEditor from "../../../../components/editor/draft_editor";
import CustomTextArea from "../../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../../components/ui/CustomTextInput";
import LibraryModal from "../../../../../pages/profile/new_course_components/library_modal";
import { CustomButton } from "../../../../../components/ui/CustomButton";
import {
  useAddNewCategoryMutation,
  useGetCategoryInfoMutation,
  useUpdateCategoryMutation,
} from "../../../../../redux/features/categories/categoriesApi";
import { useFormik } from "formik";
import { EditorState } from "draft-js";

import * as Yup from "yup";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/web"];

const FILE_SIZE = 500 * 1024; // 500KB

const EditCategoryComponent = () => {
  const { id } = useParams();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [customImgOpen, setCustomImgOpen] = useState(false);
  const [categoryFileOpen, setCategoryFileOpen] = useState(false);

  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();

  const [
    getCategoryInfo,
    { data: categoryInfo, error, isLoading: getCategoriesLoading },
  ] = useGetCategoryInfoMutation();

  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  const formik = useFormik({
    initialValues: {
      id: "",
      parentId: 770,
      name: "",
      slug: "",
      description: "",
      customDescription: "",
      customFile: null,
      chartImage: "",
      isVisible: true,
      isVisibleDropdown: true,
      categoryImage: null,
      isTopCategory: false,
      coursesOfCategory: false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required."),
      description: Yup.string().required("Description is required."),
      categoryImage: Yup.mixed()
        .optional()
        .nullable()
        .test("fileSize", "File must be less than 500 KB", (value) => {
          return typeof value === "string" || !value
            ? true
            : value.size < FILE_SIZE;
        })
        .test(
          "fileFormat",
          "File must be in JPG, PNG, JPEG, or WEBP format",
          (value) => {
            return typeof value === "string" || !value
              ? true
              : SUPPORTED_FORMATS.includes(value?.type);
          }
        ),

      customFile: Yup.mixed()
        .optional()
        .nullable()
        .test("fileSize", "File must be less than 500 KB", (value) => {
          return typeof value === "string" || !value
            ? true
            : value.size < FILE_SIZE;
        })
        .test(
          "fileFormat",
          "File must be in JPG, PNG, JPEG, or WEBP format",
          (value) => {
            return typeof value === "string" || !value
              ? true
              : SUPPORTED_FORMATS.includes(value?.type);
          }
        ),
    }),

    onSubmit: async (values, { rsetForm }) => {
      const formData = new FormData();

      formData.append("parentId", values?.parentId);
      formData.append("Id", values?.id);
      formData.append("name", values?.name);
      formData.append("Slug", values?.slug);
      formData.append("Description", values?.description);
      formData.append("customDescription", values?.customDescription);
      formData.append("chartImage", values?.chartImage);
      formData.append("IsVisible", values?.isVisible);
      formData.append("IsVisibleDropdown", values?.isVisibleDropdown);
      formData.append("IsThisTopCategory", values?.isTopCategory);
      formData.append("CoursesOfCategory", values?.coursesOfCategory);
      formData.append("categorytypeid_old", 1);
      formData.append("categorytypeid", 14);

      if (values?.customFile instanceof File) {
        formData.append("customFile", values?.customFile);
      }

      if (values?.categoryImage instanceof File) {
        formData.append("categoryImage", values?.categoryImage);
      }

      try {
        const res = await updateCategory({ data: formData }).unwrap();
        if (res?.messageCode === 200) {
          toast.success("Category Updated.");
        }
      } catch (err) {
        console.log("Creating new category", err);
      }
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("customDescription", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await getCategoryInfo({
          data: {
            Id: id,
          },
        }).unwrap();
        console.log({ res });
        if (res?.messageCode === 200) {
          const {
            parentId,
            name,
            slug,
            description,
            customfileurl,
            isVisible,
            isVisibleDropdown,
            categoryimagefileurl,
            isThisTopCategory,
            coursesOfCategory,
            id,
          } = res?.messageData[0] || {};

          formik.setValues({
            parentId,
            name,
            slug,
            description,
            customDescription: "",
            customFile: customfileurl,
            chartImage: "",
            isVisible,
            isVisibleDropdown,
            categoryImage: categoryimagefileurl,
            isTopCategory: isThisTopCategory,
            coursesOfCategory,
            id,
          });
        }
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchCategory();
  }, []);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="pb-16 wrapper w-full max-w-[800px] mx-auto"
    >
      {console.log(formik.values)}
      <h4 className="mb-6 text-lg text-white">Add new Category</h4>

      <div className="mt-4">
        <h4 className="text-sm text-white mb-1">Name</h4>
        <CustomTextInput
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Category name"
          className="text-gray-700"
          error={formik.touched?.name ? formik.errors.name : null}
        />
      </div>

      <div className="mt-4">
        <div className="mt-4">
          <h4 className="text-sm text-white mb-1">Slug</h4>
          <CustomTextInput
            name="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-gray-700"
            placeholder="Slug"
          />
        </div>
        <h6 className="text-xs text-white mt-2">
          The “slug” is the URL-friendly version of the name. It is usually all
          lowercase and contains only letters, numbers, and hyphens.
        </h6>
      </div>
      <div style={{ color: "black" }}>
        <h5 className="mt-4 text-white">Parent Category</h5>

        {/* <div className="w-full md:w-full mt-8 mb-4">
          <select
            name="parentId"
            value={formik.values?.parentId}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 pl-2 py-[6px] rounded-md shadow-sm bg-white outline-blue-500"
          >
            <option value="">Select Category</option>
            {maincategories?.length > 0 ? (
              maincategories?.map((mainCategory, index) => (
                <option value={mainCategory?.id} key={index}>
                  {mainCategory?.name}
                </option>
              ))
            ) : getCategoriesLoading ? (
              <option>Loading ...</option>
            ) : (
              <option>Categories not found!</option>
            )}
          </select>
        </div> */}
        <h6 className="text-xs text-white mt-1">
          Assign a parent term to create a hierarchy. The term Jazz, for
          example, would be the parent of Bebop and Big Band.
        </h6>
      </div>
      <div>
        <h5 className="mt-4 text-white">Description</h5>
        <CustomTextArea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-[100px] text-gray-700"
          placeholder="Description"
          error={formik.touched?.description ? formik.errors.description : null}
        />
        <h6 className="text-xs text-white mt-1">
          The description is not prominent by default; however, some themes may
          show it.
        </h6>
        <div className="my-4">
          <CustomButton
            type="button"
            size="sm"
            variant="outlined"
            onClick={() => {
              setCustomImgOpen(true);
            }}
          >
            Add Media
          </CustomButton>
        </div>
        {formik?.touched?.customFile && formik.errors?.customFile ? (
          <span className="text-red-600 text-sm p-1">
            {formik.errors.customFile}
          </span>
        ) : null}

        <LibraryModal
          file={formik?.values?.customFile}
          set_file={(file) => {
            formik.setFieldValue("customFile", file);
          }}
          error={formik.errors?.customFile}
          onBlur={formik.handleBlur}
          accept_file="Image"
          title="Add Media"
          open={customImgOpen}
          set_open={setCustomImgOpen}
          onSave={() => setCustomImgOpen(false)}
        />
        <DraftEditor
          placeholder="Custom Description ..."
          editorState={editorState}
          onChange={handleEditorChange}
        />
        {/* <EditorComponent /> */}
        <div>
          <h5 className="mt-4 text-white">Chart Image</h5>
          <CustomTextArea
            name="chartImage"
            value={formik.values.chartImage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] text-gray-700"
            placeholder="Chart Image"
          />
        </div>
        <div className="mt-4 text-white">
          <h5>Is Visible</h5>

          <div className="my-2 space-y-2">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isVisible", e.target.value === "Yes");
              }}
              type="button"
              label="Yes"
              label_color="white"
              name="isVisible"
              checked={formik.values.isVisible === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isVisible", e.target.value === "Yes");
              }}
              label="No"
              label_color="white"
              name="isVisible"
              checked={formik.values.isVisible === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Is Visible Dropdown</h5>
          <div className="my-2 space-y-2">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "isVisibleDropdown",
                  e.target.value === "Yes"
                );
              }}
              label="Yes"
              label_color="white"
              name="isVisibleDropdown"
              checked={formik.values.isVisibleDropdown === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "isVisibleDropdown",
                  e.target.value === "Yes"
                );
              }}
              label="No"
              label_color="white"
              name="isVisibleDropdown"
              checked={formik.values.isVisibleDropdown === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Is This Top Category?</h5>
          <div className="my-2 flex items-center space-x-4">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isTopCategory", e.target.value === "Yes");
              }}
              label="Yes"
              label_color="white"
              name="isTopCategory"
              checked={formik.values.isTopCategory === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isTopCategory", e.target.value === "Yes");
              }}
              label="No"
              label_color="white"
              name="isTopCategory"
              checked={formik.values.isTopCategory === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Category Image</h5>
          <div className="flex items-center">
            {formik.values?.categoryImage ? (
              <div className="size-[150px] flex items-center justify-center mx-10 my-4 border border-gray-300 p-2 rounded-md relative">
                <img
                  src={URL.createObjectURL(formik.values?.categoryImage)}
                  alt=""
                  className="object-contain w-full h-full"
                />

                <div
                  onClick={() => formik.setFieldValue("categoryImage", null)}
                  className="absolute text-red-500 top-2 right-2 bg-gray-300 rounded-full p-1 shadow-md cursor-pointer"
                >
                  <MdClose size={20} />
                </div>
              </div>
            ) : (
              <h5 className="mr-6 text-white">No file Selected</h5>
            )}

            <CustomButton
              type="button"
              size="sm"
              variant="outlined"
              onClick={() => {
                setCategoryFileOpen(true);
              }}
            >
              Add Image
            </CustomButton>
          </div>
          {formik?.touched?.categoryImage && formik.errors?.categoryImage ? (
            <span className="text-red-600 text-sm p-1">
              {formik.errors.categoryImage}
            </span>
          ) : null}

          <LibraryModal
            file={formik?.values?.categoryImage}
            set_file={(file) => {
              formik.setFieldValue("categoryImage", file);
            }}
            error={formik.errors?.categoryImage}
            onBlur={formik.handleBlur}
            accept_file="Image"
            title="Add Media"
            open={categoryFileOpen}
            set_open={setCategoryFileOpen}
            onSave={() => setCategoryFileOpen(false)}
          />
        </div>
        <div className="mt-4">
          <h5 className="text-white">Courses Of Category</h5>
          <div className="my-2 flex items-center space-x-4">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "coursesOfCategory",
                  e.target.value === "Yes"
                );
              }}
              label="Yes"
              label_color="white"
              name="coursesOfCategory"
              checked={formik.values.coursesOfCategory === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "coursesOfCategory",
                  e.target.value === "Yes"
                );
              }}
              label="No"
              label_color="white"
              name="coursesOfCategory"
              checked={formik.values.coursesOfCategory === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <CustomButton
            disabled={updateCategoryLoading}
            type="submit"
            size="sm"
          >
            {updateCategoryLoading ? "Sending ..." : "Edit Category"}
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default EditCategoryComponent;
