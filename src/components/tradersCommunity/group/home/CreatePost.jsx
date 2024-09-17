import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostMessageFile,
  createGroupPost,
  getGroupPost,
} from "../../../../redux/features/postSlice";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { getGroupCategory } from "../../../../redux/features/groupSlice";
import TreeChildCategory from "../../../TreeChildCategory";
import UploadPostFile from "./posts/UploadFile";
import EmojiPicker from "../../../EmojiPicker";
import InputError from "../../../InputError";

const CreatePost = React.forwardRef(({ page = "" }, ref) => {
  const postId = localStorage.getItem("postId");

  const [postFile, setPostFile] = useState(null);
  const [fileType, setFileType] = useState("img");
  const groupId = localStorage.getItem("groupId");

  const textRef = useRef(null);
  const formRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    messageBody: Yup.string().required("Message body is required"),
    categoryids: Yup.array().required("select category."),
  });

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { creatPostLoading, post } = useSelector((state) => state.posts);
  const { groupCategories, getCategoryLoading } = useSelector(
    (state) => state.group
  );

  useImperativeHandle(ref, () => ({
    scrollToPostForm: () => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
  }));

  useEffect(() => {
    dispatch(getGroupCategory({ axiosPrivate }));
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const createPostRes = await dispatch(
        createGroupPost({
          axiosPrivate,
          data: {
            ...values,
            categoryids: values?.categoryids,
            parentId: null,
            communitygroupId: groupId,
          },
          resetForm,
          setSelectedCategories,
          toast,
        })
      );

      if (createPostRes?.payload?.messageCode === 200) {
        const fieldName =
          fileType === "img"
            ? "photofile"
            : fileType === "video"
            ? "videofile"
            : fileType === "audio"
            ? "audiofile"
            : "file";

        const formData = await new FormData();
        formData.append("Id", createPostRes?.payload?.messageData?.id);
        formData.append(fieldName, postFile);

        const uploadPostFileRes = await dispatch(
          addPostMessageFile({
            axiosPrivate,
            formData,
            toast,
          })
        );
        if (uploadPostFileRes?.payload?.messageCode === 200) {
          toast.success("New post created.");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const formik = useFormik({
    initialValues: { title: "", messageBody: "", categoryids: [] },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const createPostRes = await dispatch(
          createGroupPost({
            axiosPrivate,
            data: {
              ...values,
              categoryids: values?.categoryids,
              parentId: null,
              communitygroupId: groupId,
            },
            resetForm,
            setSelectedCategories,
            toast,
          })
        );

        if (createPostRes?.payload?.messageCode === 200) {
          const fieldName =
            fileType === "img"
              ? "photofile"
              : fileType === "video"
              ? "videofile"
              : fileType === "audio"
              ? "audiofile"
              : "file";

          const formData = await new FormData();
          formData.append("Id", createPostRes?.payload?.messageData?.id);
          formData.append(fieldName, postFile);

          const uploadPostFileRes = await dispatch(
            addPostMessageFile({
              axiosPrivate,
              formData,
              toast,
            })
          );
          if (uploadPostFileRes?.payload?.messageCode === 200) {
            toast.success("New post created.");
          }
        }
      } catch (error) {
        console.log({ error });
      }
    },
  });

  // useEffect(() => {
  //   if (postId) {
  //     dispatch(
  //       getGroupPost({
  //         axiosPrivate,
  //         data: {
  //           id: postId,
  //         },
  //       })
  //     );
  //   }
  // }, [postId]);

  // useEffect(() => {
  //   if (postId && post) {
  //     const { title, messagebody, categories } = post || {};

  //     formik.setValues({
  //       title,
  //       messageBody: messagebody,
  //     });
  //     setSelectedCategories(categories);
  //   } else return null;
  // }, [postId]);

  const cancelUpdatePostHandler = () => {
    localStorage.removeItem("postId");
  };

  return (
    <div
      ref={formRef}
      className="bg-white rounded-lg shadow-md p-4 my-6 w-full"
    >
      <div className="flex justify-center items-center font-semibold text-xl py-1 pb-3 text-gray-700 w-full">
        <div>New Post</div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="editor mx-auto w-[90%] flex flex-col text-gray-800 border border-gray-300 p-4 "
      >
        {/* Title field */}
        <div className="mb-5 flex flex-col w-full">
          <input
            className="bg-slate-100 w-full text-sm text-gray-600 placeholder:text-sm p-2 mb-2 outline-none rounded-sm"
            placeholder="Title"
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <InputError title={formik.errors.title} />
          ) : null}
        </div>
        {/* Message body textarea */}
        <div className="w-full- h-20 relative">
          <textarea
            className="w-full bg-slate-100 sec p-3 h-20 overflow-x-hidden overflow-y-scroll scrollbar-none lg:scrollbar-thin outline-none resize-none text-sm text-gray-600 placeholder:text-sm rounded-sm"
            placeholder="Share what you are thinking ..."
            name="messageBody"
            value={formik.values.messageBody}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            innerRef={textRef}
          ></textarea>
          <span className="absolute right-6 bottom-1">
            {/* <EmojiPicker
              text={formik.values.messageBody}
              setText={formik.setFieldValue}
              textRef={textRef}
            /> */}
          </span>

          {formik.touched.messageBody && formik.errors.messageBody ? (
            <InputError title={formik.errors.messageBody} />
          ) : null}
        </div>

        <div className="mb-1 mt-8">
          <h3 className="text-base text-gray-700 mb-2 font-semibold">
            Select Category :
          </h3>
          {/* <TreeCategories data={groupCategories} /> */}
          <TreeChildCategory
            page="posts"
            loading={getCategoryLoading}
            data={groupCategories}
            setCategory={formik.setFieldValue}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {formik.touched.categoryids && formik.errors.categoryids ? (
            <InputError title={formik.errors.categoryids} />
          ) : null}
        </div>

        {/* upload file */}
        <UploadPostFile
          setPostFile={setPostFile}
          fileType={fileType}
          setFileType={setFileType}
        />

        {/* Submit and cancel buttons */}
        <div className="buttons flex items-center justify-end mt-4">
          <button
            type="submit"
            // disabled={isSubmitting}
            className={`rounded-mdd border disabled:cursor-not-allowed text-sm p-1 px-4 text-gray-200 ml-2 bg-blue-dark transition-all ${
              creatPostLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {creatPostLoading ? (
              <>
                <CustomBeatLoader color="#fff" />
              </>
            ) : (
              <>{postId ? "Update" : "Post"}</>
            )}
          </button>
          {postId ? (
            <button
              className="bg-red-600 px-3 py-1 text-sm rounded-md text-white mx-3"
              onClick={cancelUpdatePostHandler}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
});

export default CreatePost;
