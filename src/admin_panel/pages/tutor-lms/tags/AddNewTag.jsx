import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useAddNewTutorTagMutation } from "../../../../redux/features/api/admin-panel/tutorLmsApi";

const AddNewTag = ({ refetchTags }) => {
  const [addNewTutorTag, { isLoading: addTagLoading }] =
    useAddNewTutorTagMutation();

  // const [
  //   getMainCategoriesByInfo,
  //   { data: maincategories, error, isLoading: getCategoriesLoading },
  // ] = useGetMainCategoriesByInfoMutation();

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       await getMainCategoriesByInfo({ parentId: 770 }).unwrap();
  //     } catch (err) {
  //       toast.error("Failed to fetch categories: ");
  //     }
  //   }
  //   fetchCategories();
  // }, []);

  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      description: Yup.string().required("Description is required."),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await addNewTutorTag({ data: values }).unwrap();
        if (res?.messageCode === 200) {
          toast.success("New Tag added.");
          resetForm();
          refetchTags();
        }
        console.log({ res });
      } catch (err) {
        console.log("add new tag", err);
      }
    },
  });

  return (
    <div className="relative">
      <h5 className="font-normal text-lg text-[#1d2327] pb-6 pt-2">
        Add New Tag
      </h5>

      <form onSubmit={formik.handleSubmit} className="pb-16 space-y-4">
        {/* name */}
        <FormItem
          formik={formik}
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          description="The name is how it appears on your site."
        />

        {/* slug */}
        <FormItem
          formik={formik}
          type="text"
          name="slug"
          label="Slug"
          placeholder="Slug"
          description="The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
        />

        {/* description */}
        <FormItemTextArea
          formik={formik}
          name="description"
          label="Description"
          placeholder="Description"
          description="The description is not prominent by default; however, some themes may show it."
        />

        <div className="mt-4">
          <CustomButton disabled={addTagLoading} type="submit" size="sm">
            {addTagLoading ? "Sending ..." : "Add New Tagg"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddNewTag;

const FormItem = ({
  formik,
  name,
  label,
  type = "text",
  description = "",
  placeholer = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[`${name}`]}
          type={type}
          placeholder={placeholer}
          className="text-sm placeholder:text-gray-600 placeholder:text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />

        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-sm font-normal">
            {formik.errors[`${name}`]}
          </span>
        ) : null}

        {description ? (
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm p-1 text-[#646970]"
          ></p>
        ) : null}
      </div>
    </label>
  );
};

const FormItemTextArea = ({
  formik,
  name,
  label,
  type = "text",
  description = "",
  placeholer = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <CustomTextArea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-[100px] text-gray-700 border-gray-700"
          placeholder="Description"
          error={formik.touched?.description ? formik.errors.description : null}
        />
        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-[13px] font-normal">
            {formik.errors[`${name}`]}
          </span>
        ) : null}
      </div>
    </label>
  );
};
