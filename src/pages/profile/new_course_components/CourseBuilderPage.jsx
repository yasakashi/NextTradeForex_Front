import { motion } from "framer-motion";
import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import ModalLayout from "../../../common/modal_layout";

import { CgClose } from "react-icons/cg";
import { FaBars, FaPlus } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { CiWarning } from "react-icons/ci";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import NewLesson from "./NewLesson";
import AddNewQuiz from "./AddNewQuiz";

const CourseBuilderPage = () => {
  const [is_open, set_is_open] = useState(false);
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const [topics, setTopics] = useState([]); // State for storing topics
  const [newTopic, setNewTopic] = useState({ name: "", summary: "" });

  const addNewTopicHandler = () => {
    setTopics([...topics, { ...newTopic, lessons: [] }]);
    setNewTopic({ naem: "", summary: "" });
    set_is_open(false);
  };

  return (
    <>
      <div className="w-full bg-[#f0f0f1] top-0 p-0 m-0 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="wrapper mx-auto flex w-full flex-col max-h-fit "
        >
          <h4 className="text-3xl text-gray-700 font-bold mb-4 mt-4">
            Add New Course
          </h4>
          <NewCourceCard title={"Course Builder"}>
            <div className="p-4">
              {topics.length > 0 && (
                <div className="my-6">
                  {topics.map((topic, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-md min-h-[180px] flex flex-col"
                    >
                      <div className="flex items-center justify-between border bg-[#f4f6f9] px-8 py-3">
                        <div className="flex items-center gap-2">
                          <button className="border-none outline-none">
                            <FaBars size={20} className="text-gray-500" />
                          </button>
                          <h5>{topic?.name}</h5>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center gap-6">
                            <button className="border-none outline-none">
                              <BiSolidEdit
                                size={20}
                                className="text-gray-500"
                              />
                            </button>
                            <button className="border-none outline-none">
                              <FaRegTrashAlt
                                size={18}
                                className="text-gray-500"
                              />
                            </button>
                          </div>
                          <button className="border-none outline-none">
                            <IoIosArrowDown
                              size={20}
                              className="text-blue-accent"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="relative mt-4  h-full flex-grow">
                        {/* lessons */}
                        <div className="mb-2 px-2">
                          {/* single lesson */}
                          <div className="flex items-center justify-between border border-gray-300 rounded-md px-8 py-3 w-[90%] ml-auto">
                            <div className="flex items-center gap-2">
                              <button className="border-none outline-none">
                                <FaBars size={20} className="text-gray-500" />
                              </button>
                              <h5>Lesson 1 </h5> :{" "}
                              <p className="text-gray-400 text-sm">
                                Lesson 1 description
                              </p>
                            </div>

                            <div className="flex items-center gap-6">
                              <button className="border-none outline-none">
                                <BiSolidEdit
                                  size={20}
                                  className="text-gray-500"
                                />
                              </button>
                              <button className="border-none outline-none">
                                <FaRegTrashAlt
                                  size={18}
                                  className="text-gray-500"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* buttons */}
                        <div className="flex items-center gap-3 absolute bottom-3 left-3">
                          <button
                            onClick={() => setShowNewLessonModal(true)}
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
                            onClick={() => setShowQuizModal(true)}
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
                    </div>
                  ))}
                </div>
              )}
              <ContainedButtonPrimary
                // icon={<PlusCircleIcon className="size-6 text-blue-500"/>}
                title={"Add new topic"}
                onClick={(e) => set_is_open((pre) => !pre)}
              />
              <ModalLayout
                className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[60vw] max-w-[100vh] h-[80vh]"
                onClose={set_is_open}
                open={is_open}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center py-4 px-8 w-full border-b border-b-gray-300">
                    <h4 style={{ fontWeight: 600 }}>Add Topic</h4>
                    <button onClick={() => set_is_open(false)}>
                      <CgClose style={{}} />
                    </button>
                  </div>

                  <div className="flex w-full flex-col justify-between flex-grow">
                    <div className="bg-[#eff1f7] px-8 py-4 ">
                      <p className="text-sm font-semibold pb-2">Topic Name</p>
                      <input
                        value={newTopic.name}
                        onChange={(e) =>
                          setNewTopic({ ...newTopic, name: e.target.value })
                        }
                        type="text"
                        className="border w-full border-gray-300 rounded-md px-3 py-2 lg:py-[6px] outline-blue-400 outline-[1px] text-gray-700 placeholder:text-gray-400 placeholder:text-sm"
                      />
                      <div className="flex items-start mt-4">
                        <CiWarning style={{ color: "black" }} />

                        <p className="text-xs opacity-70 ml-1">
                          Topic titles are displayed publicly wherever required.
                          Each topic may contain one or more lessons, quiz and
                          assignments.
                        </p>
                      </div>
                      <h3 className="text-sm font-semibold my-4 mx-0 mt-10">
                        Topic Summery
                      </h3>
                      <textarea
                        value={newTopic.summary}
                        onChange={(e) =>
                          setNewTopic({ ...newTopic, summary: e.target.value })
                        }
                        className="resize px-3 py-2 text-sm text-gray-600 w-full border border-gray-300 rounded-md outline-blue-400"
                      ></textarea>
                      <div className="flex items-start justify-center mb-4">
                        <CiWarning style={{ color: "black" }} />
                        <p className="text-xs opacity-70 ml-1">
                          Topic titles are displayed publicly wherever required.
                          Each topic may contain one or more lessons, quiz and
                          assignments.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border-t border-t-gray-300">
                    <BorderedButtonPrimary
                      title={"Cancel"}
                      onClick={(e) => {
                        set_is_open(false);
                      }}
                    />
                    <ContainedButtonPrimary
                      title={"Add Topic"}
                      // onClick={() => set_is_open(false)}
                      onClick={addNewTopicHandler}
                    />
                  </div>
                </div>
              </ModalLayout>
            </div>
          </NewCourceCard>
        </motion.div>
      </div>

      <NewLesson
        showNewLessonModal={showNewLessonModal}
        setShowNewLessonModal={setShowNewLessonModal}
      />

      <AddNewQuiz
        showQuizModal={showQuizModal}
        setShowQuizModal={setShowQuizModal}
      />
    </>
  );
};

export default CourseBuilderPage;
