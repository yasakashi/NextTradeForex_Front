import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const QuestionModal = ({ setShowUserDetail, userDetail, setUserDetail }) => {
  const [userType, setUserType] = useState();
  const dispatch = useDispatch();

  const changeDateToFarse = (currentDate) => {
    const date = new Date(currentDate);

    const farsiYear = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
    }).format(date);
    const farsiMonth = new Intl.DateTimeFormat("fa-IR", {
      month: "2-digit",
    }).format(date);
    const farsiDay = new Intl.DateTimeFormat("fa-IR", {
      day: "2-digit",
    }).format(date);

    const farsiDate = `${farsiYear}/${farsiMonth}/${farsiDay}`;
    return farsiDate;
  };

  useEffect(() => {
    switch (userDetail?.userTypeId) {
      case 1:
        setUserType("Super Admin");
        break;
      case 2:
        setUserType("Admin");
        break;
      case 3:
        setUserType("Master");
        break;
      case 4:
        setUserType("Student");
        break;
      default:
        setUserType("UnKnown");
    }
  }, []);

  // تعداد تایید لازم-تعداد تایید شده - نظر کاربر - نظز نهایی
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-10 z-50"></div>
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[100] w-full lg:w-[calc(100%-14rem)] h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl p-4 md:p-8 rounded-xl w-[90%] h-[90%] my-auto md:w-[90%] mx-auto ml-auto overflow-y-auto scrollbar-none">
          <div className="mt-1 mr-3 ">
            <IoCloseSharp
              size={30}
              className=" bg-gray-100 rounded-full text-gray-500 transition-all duration-300 cursor-pointer p-1 hover:text-red-300"
              onClick={() => {
                setShowUserDetail(false);
                setUserDetail(null);
              }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-10 border-b-2 border-blue-light pb-4 text-blue-light">
            User Detail
          </h2>

          <div className="flex justify-start text-left">
            <div className="flex justify-start w-full flex-col gap-y-4  gap-x-2 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
                <label className="flex gap-2">
                  <span className="labelSpan">First Name: </span>
                  <p>{userDetail?.fname || "---"}</p>
                </label>

                <label className="flex gap-2">
                  <span className="labelSpan"> Last Name : </span>
                  <p>{userDetail?.lname || "---"}</p>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-y-4 my-6">
                <label>
                  <span className="labelSpan">Is Kyc : </span>
                  <span>No</span>
                </label>
                <label>
                  <span className="labelSpan">Is Paid : </span>
                  <span>{userDetail?.ispaid === true ? "Yes" : "No"}</span>
                </label>

                <label>
                  <span className="labelSpan">User Type : </span>
                  <span>{userType}</span>
                </label>

                <label>
                  <span className="labelSpan">Username : </span>
                  <span>{userDetail?.username}</span>
                </label>

                <label className="flex items-center gap-2">
                  <span className="labelSpan">User Status : </span>
                  <div className="flex items-center gap-2">
                    {userDetail?.isActive === false ? (
                      <div className="group flex items-center justify-center relative">
                        <button className="outline-none border-none flex items-center gap-2">
                          DeActive
                          <BsToggle2On className="text-blue-500" size={25} />
                        </button>
                        <span className="bg-gray-800 text-white px-2 py-1 rounded-lg absolute -top-6 left-1/2 -translate-x-1/2 w-max transition-all hidden group-hover:block">
                          Activate
                        </span>
                      </div>
                    ) : (
                      <div className="group flex items-center justify-center relative">
                        <button className="outline-none border-none flex items-center gap-2">
                          Active
                          <BsToggle2Off className="text-gray-600" size={25} />
                        </button>
                        <span className="bg-gray-800 text-white px-2 py-1 rounded-lg absolute -top-6 left-1/2 -translate-x-1/2 w-max transition-all hidden group-hover:block">
                          deActive
                        </span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionModal;
