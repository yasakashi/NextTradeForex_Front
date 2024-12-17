import React, { useId, useRef, useState } from "react";
import place from "../../../asset/img/placeholder.svg";

import { BiEdit } from "react-icons/bi";

import { AnimatePresence, motion } from "framer-motion";
import { CgMoreVertical } from "react-icons/cg";

import { CircularProgress, IconButton, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillPlusSquare } from "react-icons/ai";
import { useGetCoursesQuery } from "../../../redux/features/course/courseApii";

const MyPosts = () => {
  const [publish_type, set_publish_type] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);

  const navigate = useNavigate();

  const isLoading = false;
  const posts = ["amir"];

  return (
    <div className="flex p-4 flex-col w-full h-full ">
      <div className="flex flex-wrap justify-end items-center gap-2">
        <div className="w-[220px] relative">
          <button
            onClick={() => setOpenAddModal((prev) => !prev)}
            type="button"
            className="flex w-full text-nowrap items-center gap-2 bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl text-blue-dark px-4 py-2 rounded-md text-base font-semibold"
          >
            <AiFillPlusSquare size={20} />
            Create a New post
          </button>

          {openAddModal ? (
            <div className="absolute w-full top-[105%] rounded-md p-2 bg-[#F0D785]">
              <ul className="text-sm text-blue-light space-y-3 cursor-pointer font-semibold">
                <li
                  onClick={() =>
                    navigate("/user-profile/my-posts/add-new-forum-post")
                  }
                  className="hover:underline border-b border-b-blue-dark pb-3"
                >
                  Add Forum Post
                </li>
                <li
                  onClick={() =>
                    navigate("/user-profile/my-posts/add-new-blog-post")
                  }
                  className="hover:underline "
                >
                  Add Blog Post
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>{" "}
      <p className="text-white text-2xl mb-3">My Posts</p>
      <div className="w-full">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-white">
          <ul className="flex flex-wrap -mb-px">
            {types.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`me-2 cursor-pointer inline-block p-4 border-b-2 text-white border-transparent rounded-t-lg  ${
                    item === publish_type
                      ? "text-yellow-500 border-yellow-500"
                      : ""
                  }`}
                  onClick={() => {
                    set_publish_type(item);
                  }}
                >
                  {item} ({i == 0 ? posts.length : 0})
                </li>
              );
            })}
          </ul>
        </div>
        {isLoading && (
          <div className="w-full">
            <LinearProgress
              style={{ backgroundColor: "transparent" }}
              color="primary"
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
          <AnimatePresence mode="sync" initial={false}>
            {posts?.map((item, i) => {
              return (
                <CourceCard
                  key={i}
                  props={{
                    ...item,
                    loading: isLoading,
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;

export const CourceCard = ({ props }) => {
  const [show_edit, set_show_edit] = React.useState(false);
  const [show_more, set_show_more] = React.useState(false);
  const { updater, loading } = props;
  const navigate = useNavigate();
  const ref = useOutsideClick(() => {
    set_show_more(false);
  });

  const id = useId();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      layout
      key={props.id}
      onMouseEnter={() => {
        set_show_edit(true);
      }}
      onMouseLeave={() => {
        set_show_edit(false);
      }}
      className="border border-white rounded-lg  max-w-[220px] flex flex-col p-4 mt-4 items-center bg-blue-950 "
    >
      {console.log({ props })}
      <div
        // style={{ width: 220, height: 200, overflow: "clip", borderRadius: 8 }}
        className="w-full h-[120px]"
      >
        <CourseImgTag id={props.id} />
      </div>
      <div className="mt-8 mb-3 flex flex-col items-start w-full leading-5">
        <p className="text-[15px] text-yellow-500 capitalize">
          {props.courseName}
        </p>
        <p className="text-gray-200 text-sm pl-1">{props?.courseDescription}</p>
      </div>
      {/* <CustomDivider /> */}
      <div className="flex w-full justify-between mt-4 relative items-center">
        <p className="text-white text-sm">
          Price :{" "}
          {props?.coursePrice === 0 ? (
            "Free"
          ) : (
            <span className="text-gray-200 font-bold text-base">
              $ {props?.coursePrice}
            </span>
          )}
        </p>
        <div className="flex w-fit relative">
          {show_edit && (
            <IconButton
              onClick={(e) => {
                store.dispatch(
                  set_course_data_state({
                    ...props,
                    updater: undefined,
                    coursetags: props.coursetgas,
                    lessoncount: props.lessencount,
                  })
                );
                e.stopPropagation();
                e.preventDefault();
                navigate(`/user-profile/myCourses/edit-course/${props.id}`);
              }}
            >
              <BiEdit color="white" size={16} />
            </IconButton>
          )}
          <button onClick={() => set_show_more(true)} className="p-3">
            <CgMoreVertical className="text-white" />
          </button>
          {show_more && (
            <motion.div
              ref={ref}
              // key={`${show_more} - ${props.id}`}
              // initial={{ opacity: 0, y: 8 }}
              // animate={{ opacity: 1, y: 1 }}
              // exit={{ opacity: 0, y: 8 }}
              className="absolute bg-slate-500 right-0 p-3 pt-1 pb-1 rounded-sm shadow-sm"
            >
              <button
                disabled={isLoading}
                className="text-sm text-white relative h-6 w-10 flex items-center justify-center"
                onClick={() => updater(props.id)}
              >
                {!isLoading && "Delete"}
                {isLoading && (
                  <CircularProgress
                    style={{ width: 16, height: 16, color: "white" }}
                  />
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export const CourseImgTag = ({ id, img }) => {
  const [cover, set_cover] = React.useState(null);
  React.useEffect(() => {
    if (img) return;
    if (!id) return;
    get_course_cover_image_api(id || "")
      .then((res) => {
        set_cover(res);
      })
      .catch((err) => {});
  }, []);
  let blob = new Blob([cover], { type: "image/png" });

  let url = URL.createObjectURL(blob);
  return (
    <motion.img
      whileHover={{ scale: 1.1 }}
      transition={{ ease: "linear" }}
      src={img ? img : cover ? url : place}
      alt=""
      style={{ width: "100%", height: "100%" }}
      className="rounded-t-lg"
    />
  );
};
// const DropDown = () => {
//   const id = useId();

//   return (
//     <>
//       <button
//         id={id}
//         data-dropdown-toggle="dropdownDots"
//         className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//         type="button"
//       >
//         <svg
//           className="w-5 h-5"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 4 15"
//         >
//           <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//         </svg>
//       </button>

//       <div
//         id="dropdownDots"
//         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
//       >
//         <ul
//           className="py-2 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby={id}
//         >
//           <li>
//             <a
//               href="#"
//               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Settings
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               Earnings
//             </a>
//           </li>
//         </ul>
//         <div className="py-2">
//           <a
//             href="#"
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//           >
//             Separated link
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

const types = ["publish", "pending", "draft"];

export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [callback]);

  return ref;
};
