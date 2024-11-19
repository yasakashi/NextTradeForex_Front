import React, { useEffect, useRef, useState } from "react";
import MaterialTable from "../../../../components/table/material_table";

import temp from "../../../../../asset/img/play-button-arrow.svg";
import { MySelectBox } from "../../../../../pages/profile/new_course_components/custom_select_box";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../../../redux/store";
import { set_course_data_state } from "../../../../../redux/features/courseSlise";

import {
  useChangeCourseStatusMutation,
  useGetCoursesQuery,
  useRemoveCourseMutation,
} from "../../../../../redux/features/course/courseApii";
import { CustomButton } from "../../../../../components/ui/CustomButton";
import useClickOutside from "../../../../../hooks/useClickOutside";
import { HiDotsVertical } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { useGetCourseStatusListQuery } from "../../../../../redux/features/course/commonApi";
import toast from "react-hot-toast";

const statusStyle = {
  pending: "text-[#ed9700] bg-[#ed970026] border-[#ed97004d]",
  publish: "text-[#24a148] bg-[#24a14826] border-[#24a148]",
  trash: "text-[#f44337] bg-[#f4433726] border-[#f443374d]",
  draft: "text-[#41454fe6] bg-[#eff1f6] border-[#eff1f6]",
  private: "text-[#41454fe6] bg-[#eff1f6] border-[#eff1f6]",
};

const CoursesScreen = () => {
  const navigate = useNavigate();

  const [courses_type, set_courses_type] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeRowId, setActiveRowId] = useState("");

  const [searchCourses, setSearchCourses] = useState("");

  const [removeCourse, { isLoading: removeCourseLoading }] =
    useRemoveCourseMutation();

  const {
    data: { messageData: courseStatus } = { messageData: [] },
    isLoading: courseStatusLoading,
  } = useGetCourseStatusListQuery();

  const [changeCourseStatus] = useChangeCourseStatusMutation();

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    setShowModal(false);
  });

  const {
    data: { messageData: courses } = { messageData: [] },

    isLoading,
  } = useGetCoursesQuery({
    data: {
      Id: null,
      authorId: null,
      allowQA: null,
      isPublicCourse: null,
      difficultyLevelId: null,
      courseTags: "",
      courseName: searchCourses,
      pageindex: 1,
      rowcount: 21,
    },
  });

  const removeCourseHandler = async (id) => {
    const removeRes = await removeCourse({ data: { Id: id } });

    if (removeRes?.data?.messageCode === 200) {
      toast.success("Course removed.");
      setSearchCourses("");
    }
  };

  const changeCourseStatusHandler = async (statusId, id) => {
    const chagneStatusRes = await changeCourseStatus({
      data: { Id: id, coursestatusid: statusId },
    });

    console.log(chagneStatusRes);
  };

  return (
    <div className="flex flex-col px-8 py-8 scrollbar-thin">
      <h1 className="font-semibold text-2xl text-white mb-4">Courses</h1>
      <MaterialTable
        loading={isLoading}
        setSearchCourses={setSearchCourses}
        searchCourses={searchCourses}
        RenderTopCustom={({ table }) => {
          return (
            <MySelectBox
              style={{ position: "absolute", top: 24, left: 280 }}
              value={courses_type}
              fullWidth={false}
              onChange={(val) => {
                set_courses_type(val);
              }}
              options={[
                { title: "Draft", value: 0 },
                { title: "Pending", value: 1 },
                { title: "Published", value: 3 },
              ]}
            />
          );
        }}
        rows={courses}
        columns={[
          {
            header: "Title",
            accessorKey: "coursename",
            Cell: ({ row, table }) => {
              return (
                <div className="flex items-center">
                  {/* // @ts-ignore */}
                  <img src={temp} alt="" style={{ width: 50, height: 30 }} />
                  <div className="flex flex-col ml-3">
                    <p
                      style={{
                        color: "#2271b1",
                        fontWeight: "bold",
                        marginBottom: 8,
                      }}
                      className="capitalize"
                    >
                      {row.original?.courseName}
                    </p>
                    <div className="flex flex-row" style={{ minWidth: 290 }}>
                      {["Topic", "Lesson", "Quiz", "Assignment"].map(
                        (item, i) => {
                          return (
                            <p
                              key={item}
                              className="mr-2 font-semibold text-gray-500"
                            >
                              {item}:{" "}
                              <b className="text-black">
                                {i === 0
                                  ? row.original?.topiccount
                                  : i === 1
                                  ? row.original?.lessoncount
                                  : i === 2
                                  ? row.original?.quizcount
                                  : 0}
                              </b>
                            </p>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              );
            },
          },
          {
            header: "Category",
            accessorKey: "coursetgas",
            Cell: ({ row }) => {
              return (
                <div className="w-64 flex items-center flex-wrap gap-2">
                  {row.original?.courseCategorys?.map((item, index) => (
                    <div
                      className="bg-slate-200 px-2 py-[2px] rounded-xl shadow-md text-gray-600"
                      key={index}
                    >
                      {item?.categoryname}
                    </div>
                  ))}
                </div>
              );
            },
          },
          {
            header: "Author",
            accessorKey: "ownerusername",
            Cell: ({ row }) => {
              return (
                <div className="flex items-center">
                  <p
                    style={{
                      backgroundColor: "#007cba",
                      borderRadius: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    {String(row.original?.authorname).slice(0, 2)}
                  </p>
                  <div className="ml-2">
                    <p className="font-semibold">
                      {row.original?.authorname
                        ? row.original?.authorname
                        : "user"}
                    </p>
                    <p className="font-semibold"></p>
                  </div>
                </div>
              );
            },
          },
          {
            header: "Price",
            accessorKey: "courseprice",
            Cell: ({ row }) => {
              return (
                <p className="font-semibold">
                  {row.original?.coursePrice !== 0
                    ? row.original?.coursePrice
                    : "Free"}
                </p>
              );
            },
          },
          {
            header: "Date",
            accessorKey: "registerdatetime",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col">
                  {new Date(
                    row.original?.registerdatetime || ""
                  ).toLocaleDateString()}
                </div>
              );
            },
          },
          {
            header: " ",
            Cell: ({ row }) => {
              return (
                <div className="flex items-center">
                  {/* publish */}
                  <select
                    value={row?.original?.coursestatusid}
                    onChange={(e) =>
                      changeCourseStatusHandler(
                        e.target.value,
                        row?.original?.id
                      )
                    }
                    className={`
                      text-[13px] cursor-pointer w-[130px] rounded-full py-2 px-2 outline-none border
                      ${
                        row?.original?.coursestatusid === 3
                          ? statusStyle?.publish
                          : row?.original?.coursestatusid === 2
                          ? statusStyle?.pending
                          : row?.original?.coursestatusid === 4
                          ? statusStyle?.trash
                          : row?.original?.coursestatusid === 5
                          ? statusStyle?.private
                          : row?.original?.coursestatusid === 1
                          ? statusStyle?.draft
                          : "text-[#41454fe6] bg-[#eff1f6] border-[#eff1f6]"
                      }
                      `}
                  >
                    {courseStatus?.length > 0 &&
                      courseStatus?.map((status, index) => (
                        <option key={index} value={status.id}>
                          {status?.name}
                        </option>
                      ))}
                  </select>

                  {/* course attachemetns */}
                  <CustomButton
                    onClick={() => {
                      navigate(
                        `/admin-panel/tutor/Courses/create-new-course/course-builder/${row.original?.id}`
                      );
                    }}
                    size="md"
                    className="mx-4 text-nowrap"
                  >
                    Course Atachments
                  </CustomButton>

                  {/* view course */}

                  <CustomButton
                    onClick={() => {
                      navigate(`/course/${row.original?.id}`);
                      store.dispatch(set_course_data_state(row.original));
                    }}
                    size="md"
                    variant="outlined"
                    className="mx-4"
                  >
                    View Course
                  </CustomButton>

                  <div
                    onClick={() => {
                      setShowModal((prev) => !prev);

                      setActiveRowId(row?.original?.id);
                    }}
                    className="relative group hover:bg-blue-100 p-[5px] rounded-full transition-colors"
                  >
                    <HiDotsVertical
                      className="text-gray-600 group-hover:text-blue-accent group-hover:cursor-pointer transition-colors"
                      size={20}
                    />

                    {showModal && row?.original?.id === activeRowId ? (
                      <div
                        ref={modalRef}
                        className="absolute -top-5 right-full z-[10000] rounded-md shadow-md w-[210px] h-auto py-2 bg-[#212327] border border-[#212327]"
                      >
                        <ul>
                          <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-white font-semibold">
                            <Link
                              to={`/user-profile/myCourses/edit-course/${row?.original?.id}`}
                              className="flex w-full gap-2"
                            >
                              <CiEdit size={20} />
                              Edit
                            </Link>
                          </li>
                          <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-red-500">
                            <button
                              onClick={() =>
                                removeCourseHandler(row?.original?.id)
                              }
                              disabled={removeCourseLoading}
                              type="button"
                              className="flex gap-2 disabled:cursor-not-allowed items-center border-none outline-none"
                            >
                              <IoTrashOutline size={14} />
                              Remove Permanently
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {/* <ContainedButtonPrimary
                    onClick={() => {
                      publish_course_api({
                        course_id: row.original?.id,
                        course_data: row.original,
                      });
                    }}
                    style={{ width: 100, margin: "0px 16px" }}
                    title={
                      row.original?.courseStatusId === 0
                        ? "Publish"
                        : "Published"
                    }
                  />
                  <ContainedButtonPrimary
                    onClick={() => {}}
                    style={{ width: 100 }}
                    title="Republish"
                  /> */}
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default CoursesScreen;
