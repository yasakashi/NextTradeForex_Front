import React, { useEffect, useRef, useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPostComment } from "../../../../../redux/features/postSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../../utils/loaders/CustomBeatLoader";
import EmojiPicker from "../../../../EmojiPicker";

const CreateComment = ({
  postId,
  communitygroupId,
  showCommentBox,
  setShowCommentBox,
  setPostComments,
}) => {
  const { id } = useParams();

  const [postIdComment, setPostIdComment] = useState("");
  const textRef = useRef(null);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const {
    commentLoading,

    postComments,
    postCommentsLoading,
  } = useSelector((state) => state.posts);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    messageBody: Yup.string().required("Message body is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(
        createPostComment({
          axiosPrivate,
          data: {
            ...values,
            parentId: postId,
            communitygroupId,
            showpost: false,
            categoryids: [],
          },
          toast,
        })
      );

      console.log("comments from create post", response);
      if (response?.payload?.messageCode === 200) {
        setPostComments((prevComments) => [
          ...prevComments,
          response.payload.messageData,
        ]);
        resetForm(); // Clear the form after successful submission
        console.log("close comment box");
        setShowCommentBox(false);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="w-full my-2 border-t border-t-gray-200">
      <div className="flex justify-between items-start space-x-2 pt-2">
        <img
          src="/assets/bp-avatar.png"
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <div className="grow relative flex justify-between bg-gray-100 rounded-lg px-3 items-center">
          <Formik
            initialValues={{ title: "", messageBody: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form className="editor mx-auto w-full max-w-[60vw] flex flex-col text-gray-800 p-4">
                {/* Title field */}
                <Field
                  className="title bg-white text-sm p-2 mb-4 outline-none placeholder:text-sm"
                  placeholder="Title"
                  type="text"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mb-2"
                />

                {/* Message body textarea */}
                <div className="w-full- h-20 relative">
                  <Field
                    as="textarea"
                    className="w-full bg-white text-gray-600 p-3 h-20 overflow-x-hidden overflow-y-scroll scrollbar-none lg:scrollbar-thin text-sm outline-none placeholder:text-sm resize-none"
                    placeholder="Share what you are thinking ..."
                    name="messageBody"
                    innerRef={textRef}
                  />
                  <span className="absolute right-6 bottom-1 z-[1000]">
                    <EmojiPicker
                      text={values.messageBody}
                      setText={setFieldValue}
                      textRef={textRef}
                    />
                  </span>
                </div>
                <ErrorMessage
                  name="messageBody"
                  component="div"
                  className="text-red-500 text-xs mb-2"
                />

                {/* Submit and cancel buttons */}
                <div className="buttons flex items-center justify-between mt-4">
                  {/* <button className="opacity-85">
                    <IoImageOutline size={24} />
                  </button> */}
                  <div></div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPostIdComment(postId)}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn border rounded-sm border-indigo-500 py-1 px-2 cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-700 transition-all text-xs "
                    >
                      {commentLoading ? (
                        <>
                          <CustomBeatLoader />
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
