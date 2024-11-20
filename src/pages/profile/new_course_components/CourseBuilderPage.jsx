import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NewCourceCard from "./new_cource_card";
import ModalLayout from "../../../common/modal_layout";

import { CgClose } from "react-icons/cg";
import { FaBars, FaPlus } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as Yup from "yup";

import { CiWarning } from "react-icons/ci";
import NewLesson from "./NewLesson";
import AddNewQuiz from "./addNewQuiz/AddNewQuiz";
import { useFormik } from "formik";
import { CustomButton } from "../../../components/ui/CustomButton";
import {
  useAddCourseTopicMutation,
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
  useRemoveCourseTopicMutation,
  useRemoveTopicLessonMutation,
} from "../../../redux/features/course/courseBuilderApi";
import { Link, useParams } from "react-router-dom";
import RemoveConfirmModal from "./RemoveConfirmModal";
import toast from "react-hot-toast";

const CourseBuilderPage = ({ page }) => {
  const { courseId } = useParams();

  const [is_open, set_is_open] = useState(false);
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [lessons, setLessons] = useState({});
  const [topics, setTopics] = useState([]);
  const [updateTopicMode, setUpdateTopicMode] = useState(false);

  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);

  const [removingTopicId, setRemovingTopicId] = useState(null);

  const [openTopicIndex, setOpenTopicIndex] = useState(null);

  const [
    getCourseTopics,
    { error, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();

  const [removeCourseTopic, { isLoading: removeTopicLoading }] =
    useRemoveCourseTopicMutation();

  const [removeTopicLesson, { isLoading: removeLessonLoading }] =
    useRemoveTopicLessonMutation();

  const [addCourseTopic, { isLoading: addTopicLoading }] =
    useAddCourseTopicMutation();

  const [getTopicLessons] = useGetTopicLessonsMutation();


  const handleToggleTopic = async (index, topicId) => {
    setOpenTopicIndex(null);
    if (openTopicIndex === index) {
      setOpenTopicIndex(null);
    } else {
      setOpenTopicIndex(index);

      if (!lessons[topicId]) {
        const lessonsRes = await getTopicLessons({
          data: {
            Id: null,
            courseId: courseId,
            topicId: topicId,
            lessonName: "",
            pageindex: 1,
            rowcount: 50,
          },
        });
        if (lessonsRes?.data?.messageCode === 200) {
          setLessons((prev) => ({
            ...prev,
            [topicId]: lessonsRes?.data?.messageData,
          }));
        }
      }
    }
  };
  const handleNewLessonAdded = (topicId, newLesson) => {
    setLessons((prev) => ({
      ...prev,
      [topicId]: [...(prev[topicId] || []), newLesson],
    }));
  };

  const addTopicValidationShema = Yup.object().shape({
    topicName: Yup.string().required("Topic name is required."),
    topicSummary: Yup.string().required("Topic summary is reqired."),
  });

  useEffect(() => {
    async function courseTopics() {
      const topicsRes = await getCourseTopics({
        data: {
          courseId: courseId,
          Id: null,
          topicName: "",
          pageindex: 1,
          rowcount: 50,
        },
      });

      if (topicsRes?.data?.messageCode === 200) {
        setTopics(topicsRes?.data?.messageData);
      }
    }
    courseTopics();
  }, []);

  const formik = useFormik({
    initialValues: {
      topicName: "",
      topicSummary: "",
    },
    validationSchema: addTopicValidationShema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form submitted:", values);
      const res = await addCourseTopic({
        data: { ...values, courseId: courseId },
      });

      if (res?.data?.messageCode === 200) {
        set_is_open(false);
        resetForm();

        const topicsRes = await getCourseTopics({
          data: {
            courseId: courseId,
            Id: null,
            topicName: "",
            pageindex: 1,
            rowcount: 50,
          },
        });

        if (topicsRes?.data?.messageCode === 200) {
          setTopics(topicsRes?.data?.messageData);
        }
      }
    },
  });

  const handleDelete = async () => {
    // Topic
    if (removingItem?.type === "topic" && removingItem?.id) {
      const removeRes = await removeCourseTopic({
        data: { Id: removingItem.id },
      });
      if (removeRes?.data?.messageCode === 200) {
        toast.success("Topic removed.");
        setTopics((prev) =>
          prev.filter((topic) => topic?.id !== removingItem.id)
        );
        setOpenRemoveModal(false);
        setRemovingItem(null);
      }
    }

    //lesson
    if (removingItem?.type === "lesson" && removingItem?.id) {
      const removeRes = await removeTopicLesson({
        data: { Id: removingItem.id },
      });
      if (removeRes?.data?.messageCode === 200) {
        toast.success("Topic lesson removed.");

        setOpenRemoveModal(false);
        setRemovingItem(null);
      }
    }
  };

  const confirmRemoveHandler = (id, type) => {
    setRemovingItem({ id, type });
    setOpenRemoveModal(true);
  };

  const cancellRemoveTopicHandler = () => {
    setRemovingTopicId(null);
    setOpenRemoveModal(false);
  };

  // =================================handle Update
  const handleUpdateTopic = (topic) => {
    setUpdateTopicMode(true);
    set_is_open(true);
    formik.setValues({
      topicName: topic?.topicName,
      topicSummary: topic?.topicSummary,
    });
    console.log(topic);
  };

  return (
    <>
      <div
        className={`w-full ${
          page === "admin" ? "" : "bg-[#f0f0f1]"
        } top-0 p-0 m-0 min-h-screen`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="wrapper mx-auto flex w-full flex-col max-h-fit "
        >
          <h4
            className={`text-3xl ${
              page === "admin" ? "text-gray-100" : "text-gray-700"
            } font-bold mb-4 mt-4`}
          >
            Add Course Details
          </h4>
          <NewCourceCard title={"Course Builder"}>
            <div className="p-4">
              <div className="my-4 text-gray-700 text-lg">
                {getCourseTopicsLoading ? "Loading ..." : ""}
              </div>
              {topics.length > 0 && (
                <div className="my-6 space-y-2">
                  {topics.map((topic, index) => (
                    <div
                      key={index}
                      className={`border border-gray-300 rounded-md ${
                        openTopicIndex === index ? "min-h-[180px]" : ""
                      } flex flex-col`}
                    >
                      <div className="flex items-center justify-between border bg-[#f4f6f9] px-8 py-3">
                        <div className="flex items-center gap-2">
                          <button className="border-none outline-none">
                            <FaBars size={20} className="text-gray-500" />
                          </button>
                          <div>
                            <h5>{topic?.topicName} </h5>
                          </div>
                          <h5>{topic?.name}</h5>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center gap-6">
                            <button
                              type="button"
                              onClick={() => handleUpdateTopic(topic)}
                              className="border-none outline-none"
                            >
                              <BiSolidEdit
                                size={20}
                                className="text-gray-500"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                confirmRemoveHandler(topic?.id, "topic")
                              }
                              className="border-none outline-none"
                            >
                              <FaRegTrashAlt
                                size={18}
                                className="text-gray-500"
                              />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleToggleTopic(index, topic?.id);
                            }}
                            className="border-none outline-none cursor-pointer px-3 py-1"
                          >
                            {openTopicIndex === index ? (
                              <IoIosArrowUp
                                size={20}
                                className="text-blue-accent"
                              />
                            ) : (
                              <IoIosArrowDown
                                size={20}
                                className="text-blue-accent"
                              />
                            )}
                          </button>
                        </div>
                      </div>

                      {openTopicIndex === index ? (
                        <div className="relative mt-4  h-full flex-grow pb-14">
                          {/* lessons */}
                          <div className="mb-2 px-2 space-y-2">
                            {/* single lesson */}
                            {lessons[topic?.id]?.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between border border-gray-300 rounded-md px-8 py-3 w-[90%] ml-auto"
                              >
                                <div className="flex items-center gap-2">
                                  <button className="border-none outline-none">
                                    <FaBars
                                      size={20}
                                      className="text-gray-500"
                                    />
                                  </button>
                                  <h5>{lesson?.lessonName} : </h5>
                                  <p className="text-gray-400 text-sm">
                                    {lesson?.lessonDescription.slice(0, 16) + " . . ."}
                                  </p>
                                </div>

                                <div className="flex items-center gap-6">
                                  <button className="border-none outline-none">
                                    <BiSolidEdit
                                      size={20}
                                      className="text-gray-500"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="border-none outline-none"
                                    onClick={() =>
                                      confirmRemoveHandler(lesson?.id, "lesson")
                                    }
                                  >
                                    <FaRegTrashAlt
                                      size={18}
                                      className="text-gray-500"
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* buttons */}
                          <div className="flex items-center gap-3 absolute bottom-3 left-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                setShowNewLessonModal(true);
                                e.preventDefault();
                                setTopicId(topic?.id);
                              }}
                              className="group text-blue-accent px-2 py-1 rounded-md border border-blue-accent text-[13px] w-max font-semibold flex items-center gap-1 hover:bg-blue-accent hover:text-white transition-all"
                            >
                              <span className="bg-blue-accent rounded-sm group-hover:bg-white transition-all">
                                <FaPlus
                                  size={14}
                                  className="text-white group-hover:text-blue-accent transition-colors"
                                />
                              </span>
                              Lesson
                            </button>

                            <button
                              onClick={() => {
                                setShowQuizModal(true);
                                setTopicId(topic?.id);
                              }}
                              className="group text-blue-accent px-4 py-1 rounded-md border border-blue-accent text-[13px] w-max font-semibold flex items-center gap-1 hover:bg-blue-accent hover:text-white transition-all"
                            >
                              <span className="bg-blue-accent rounded-sm group-hover:bg-white transition-all">
                                <FaPlus
                                  size={14}
                                  className="text-white group-hover:text-blue-accent transition-colors"
                                />
                              </span>
                              Quiz
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}

              <div className="my-4">
                <CustomButton
                  type="button"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    set_is_open(true);
                  }}
                >
                  Add new topic
                </CustomButton>
              </div>
              <ModalLayout
                className="w-full z-[9999] sm:w-[70vw] md:w-[50vw] lg:w-[60vw] max-w-[100vh] h-[90vh]"
                onClose={set_is_open}
                open={is_open}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col h-full"
                >
                  <div className="flex justify-between items-center py-4 px-8 w-full border-b border-b-gray-300">
                    <h4 style={{ fontWeight: 600 }}>
                      {updateTopicMode ? "Update Topic" : "Add Topic"}
                    </h4>
                    <button type="button" onClick={() => set_is_open(false)}>
                      <CgClose style={{}} />
                    </button>
                  </div>
                  <div className="flex w-full flex-col justify-between flex-grow bg-[#eff1f7]">
                    <div className=" px-8 py-4 ">
                      <p className="text-sm font-semibold pb-2">Topic Name</p>
                      <input
                        name="topicName"
                        value={formik.values.topicName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="border w-full border-gray-300 rounded-md px-3 py-2 lg:py-[6px] outline-blue-400 outline-[1px] text-gray-700 placeholder:text-gray-400 placeholder:text-sm"
                      />
                      {formik.touched?.topicName && formik.errors?.topicName ? (
                        <span className="text-xs text-red-600 p-1">
                          {formik.errors?.topicName}
                        </span>
                      ) : null}
                      <div className="flex items-start mt-4">
                        <CiWarning style={{ color: "black" }} />

                        <p className="text-xs opacity-70 ml-1">
                          Topic titles are displayed publicly wherever required.
                          Each topic may contain one or more lessons, quiz and
                          assignments.
                        </p>
                      </div>
                      <label className="w-full">
                        <h3 className="text-sm font-semibold my-4 mx-0 mt-10">
                          Topic Summery
                        </h3>
                        <textarea
                          name="topicSummary"
                          value={formik.values.topicSummary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="resize h-[90px] px-3 py-2 text-sm text-gray-600 w-full border border-gray-300 rounded-md outline-blue-400"
                        ></textarea>

                        {formik.touched.topicSummary &&
                        formik.errors?.topicSummary ? (
                          <span className="text-xs text-red-600 p-1">
                            {formik.errors?.topicSummary}
                          </span>
                        ) : null}
                        <div className="flex items-start justify-center mb-4">
                          <CiWarning style={{ color: "black" }} />
                          <p className="text-xs opacity-70 ml-1">
                            Topic titles are displayed publicly wherever
                            required. Each topic may contain one or more
                            lessons, quiz and assignments.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between z-[1000] items-center p-4 border-t border-t-gray-300">
                    <CustomButton
                      type="button"
                      onClick={() => set_is_open(false)}
                      size="sm"
                      variant="outlined"
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton type="submit" size="sm">
                      {addTopicLoading ? (
                        "sending ..."
                      ) : (
                        <>{updateTopicMode ? "Update" : "Add Topic"}</>
                      )}
                    </CustomButton>
                  </div>
                </form>
              </ModalLayout>
            </div>
          </NewCourceCard>
        </motion.div>

        <div className="flex py-10 px-4">
          <Link
            className="text-[#1976d2] hover:text-[#1565c0] hover:underline px-3 py-[6px] rounded-md shadow-sm text-base font-medium"
            // to={`/user-profile/myCourses/new-course/add-meeting-pdf/${courseId}`}
            to={
              page === "admin"
                ? `/admin-panel/tutor/Courses/create-new-course/add-meeting-pdf/${courseId}`
                : `/user-profile/myCourses/new-course/add-meeting-pdf/${courseId}`
            }
          >
            Add meeting and video pdf ?
          </Link>
        </div>
      </div>

      {showNewLessonModal ? (
        <NewLesson
          courseId={courseId}
          topicId={topicId}
          showNewLessonModal={showNewLessonModal}
          setShowNewLessonModal={setShowNewLessonModal}
          onNewLessonAdded={handleNewLessonAdded}
        />
      ) : null}

      {showQuizModal ? (
        <AddNewQuiz
          courseId={courseId}
          topicId={topicId}
          showQuizModal={showQuizModal}
          setShowQuizModal={setShowQuizModal}
        />
      ) : null}

      {openRemoveModal ? (
        <RemoveConfirmModal
          subTitle="Are you sure you want to delete this topic from the course ?"
          warning="By deleteing this topic, all the lessons and topic will also be permanently deleted."
          open={openRemoveModal}
          setOpen={cancellRemoveTopicHandler}
          removeHandler={handleDelete}
          isLoading={
            removingItem?.type === "topic"
              ? removeTopicLoading
              : removingItem?.type === "lesson"
              ? removeLessonLoading
              : false
          }
          itemType={removingItem?.type}
        />
      ) : null}
    </>
  );
};

export default CourseBuilderPage;
