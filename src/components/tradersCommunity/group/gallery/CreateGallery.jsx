import { useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { createGallery } from "../../../../redux/features/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";

//  [{id: 1, name: "video",},
//    {id: 2, name: "photo", },
//    { id: 3,name: "audio", }];

// [{ id: 1, name: "public" },
//   { id: 2, name: "login users" },
//   { id: 3, name: "group only" }];

const CreateGallery = () => {
  const groupId = localStorage.getItem("groupId");

  const { createGalleryLoading } = useSelector((state) => state.gallery);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const createGalleryValidation = Yup.object({
    galleryname: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
  });

  const formik = useFormik({
    initialValues: {
      galleryname: "",
      description: "",
      gallerytypeId: 2,
      galleryaccesslevelId: 1,
    },
    validationSchema: createGalleryValidation,
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(
        createGallery({
          axiosPrivate,
          data: { ...values, communitygroupId: groupId },
          toast,
        })
      );

      if (res?.payload?.messageCode === 200) {
        toast.success("Gallery created successfully.");
        resetForm();
      }
    },
  });

  // const createGalleryHandler = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     createGallery({
  //       axiosPrivate,
  //       data: {
  //         galleryname,
  //         description,
  //         gallerytypeId,
  //         galleryaccesslevelId,
  //         communitygroupId: groupId,
  //       },
  //     })
  //   );
  // };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-start justify-between">
        <div>
          <span className="label mx-1">Type : </span>
          <select
            value={formik.values.gallerytypeId}
            name="gallerytypeId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[200px] px-1 rounded-[3px] text-sm text-gray-600 outline-none"
          >
            <option value={2}>Photo</option>
            <option value={1}>Video</option>
            <option value={3}>Audio</option>
          </select>
        </div>

        <div>
          <span className="label mx-1">Status : </span>
          <select
            name="galleryaccesslevelId"
            value={formik.values.galleryaccesslevelId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[200px] px-1 rounded-[3px] text-sm text-gray-600 outline-none"
          >
            <option value={1}>Publick</option>
            <option value={2}>Logged in users only</option>
            <option value={3}>Group only</option>
          </select>
        </div>
      </div>

      <label>
        <span className="label mx-1 mb-2">Title</span>
        <input
          name="galleryname"
          value={formik.values.galleryname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border border-gray-200 outline-blue-400 rounded-[4px] text-gray-600 placeholder:text-gray-400"
          type="text"
          placeholder="Gallery Title (Required)"
        />
        {formik.touched.galleryname && formik.errors.galleryname ? (
          <span className="text-red-500 text-sm my-1">
            {formik.errors.galleryname}
          </span>
        ) : null}
      </label>

      <label>
        <span className="label mx-1 mb-2">Description</span>

        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Description"
          className="resize-none p-3 text-gray-600 placeholder:text-gray-500 h-[20vh] w-full outline-blue-400 border border-gray-200 rounded-[4px]"
        ></textarea>

        {formik.touched.description && formik.errors.description ? (
          <span className="text-red-500 text-sm my-1">
            {formik.errors.description}
          </span>
        ) : null}
      </label>

      <button
        className="bg-[#2d5be3] disabled:cursor-not-allowed text-white text-sm px-6 py-2 rounded-[4px] ml-auto mt-4"
        type="submit"
        disabled={createGalleryLoading}
      >
        {createGalleryLoading ? <CustomBeatLoader color="#fff" /> : "Create"}
      </button>
    </form>
  );
};

export default CreateGallery;
