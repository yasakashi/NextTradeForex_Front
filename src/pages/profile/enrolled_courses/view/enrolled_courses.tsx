import React, { useId } from "react";
import place from "../../../../asset/img/placeholder.svg";
import { CustomDivider } from "../../new_course_components/new_cource_card";
import { BiEdit } from "react-icons/bi";
import useMyCourses from "../../my_courses/hook/use_my_courses";
import { CourceCard } from "../../my_courses/view/my_courses";
import {
  loading_selector,
  useAppSelector,
} from "../../../../redux/features/generalSlice";
import { LinearProgress } from "@mui/material";
const EnrolledCourses = () => {
  const { courses_list, publish_type, set_publish_type, remove_course_state } =
    useMyCourses({issitecourse:true});
  const loading = useAppSelector(loading_selector);
  return (
    <div className="flex p-4 flex-col w-full h-full ">
      <p className="text-white text-2xl mb-3">Enrolled Courses</p>
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
                  {item} (0)
                </li>
              );
            })}
          </ul>
        </div> 
        {loading && (
          <div className="w-full">
            <LinearProgress style={{ backgroundColor:"transparent" }} color="primary"/>
          </div>
        )}
        <div className="flex flex-wrap w-full justify-between">
          {courses_list?.map((item,i) => {
            return (
              <CourceCard 
              key={i}
                props={{ ...item, updater: remove_course_state, loading }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
// const CourceCard = () => {
//   const [show_edit, set_show_edit] = React.useState(false);

//   return (
//     <div
//       onMouseEnter={() => {
//         set_show_edit(true);
//       }}
//       onMouseLeave={() => {
//         set_show_edit(false);
//       }}
//       className="border border-white rounded-lg  flex flex-col p-4 mt-4 items-center bg-blue-950"
//     >
//       <img
//         src={place as unknown as string}
//         alt=""
//         width={220}
//         className="rounded-lg"
//       />
//       <p className="text-sm text-yellow-500 mt-6 mb-24">
//         Zloty vs Swedish Krona-PLNSEK
//       </p>

//       <CustomDivider />
//       <div className="flex w-full justify-between mt-4">
//         <p className="text-white text-sm">Price : Free</p>

//         <div className="flex w-fit">
//           {show_edit && (
//             <button>
//               <BiEdit color="white" />
//             </button>
//           )}
//           <DropDown />
//         </div>
//       </div>
//     </div>
//   );
// };

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

const types = ["Enrolled Courses", "Active Courses", "Completed Courses"];
