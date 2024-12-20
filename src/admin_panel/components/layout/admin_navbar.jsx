import React, { useRef, useState } from "react";
import { TiMessage, TiPlus, TiRefresh } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { BiSolidMessage } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { logoutAction } from "../../../redux/features/loginSlice";

const AdminNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const msgRef = useRef(null);
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useClickOutside(modalRef, () => {
    setShowModal(false);
    setShowMsgModal(false);
  });

  useClickOutside(msgRef, () => {
    setShowModal(false);
    setShowMsgModal(false);
  });

  const logOutHandler = async () => {
    await dispatch(logoutAction({ axiosPrivate, toast, navigate }));

    navigate("/");
  };

  return (
    <div className="bg-blue-light z-[1000] w-[calc(100%-200px)] h-[43px] justify-between px-4 text-white fixed top-0 flex items-center ">
      <div className="flex items-center space-x-4">
        {/* <div className="flex items-center mr-2">
          <TiRefresh size={25} />
          <h5 className="font-bold text-sm">49</h5>
        </div> */}
        <div ref={msgRef} className="relative">
          <div
            onClick={() => setShowMsgModal((prev) => !prev)}
            className="flex items-center mr-2 gap-1 cursor-pointer"
          >
            <BiSolidMessage className="text-[#f0f6fcb3]" size={17} />
            <h5 className="font-bold text-sm">0</h5>
          </div>

          {showMsgModal ? (
            <div className="absolute z-[10000] top-full bg-blue-light p-4 rounded-md shadow-md w-[200px] left-0">
              <p className="text-[#f0f6fcb3] hover:text-white transition-colors text-sm text-center">
                No Record Found.
              </p>
            </div>
          ) : null}
        </div>
        <Link
          to="/admin-panel/tutor/Courses/create-new-course"
          className="flex items-center mr-2 space-x-1 text-white rounded-lg cursor-pointer px-2 py-1 hover:shadow-none"
        >
          <FaPlus size={15} className="text-[#f0f6fcb3]" />
          <h5 className="font-semibold text-[13px] mr-2">New</h5>
        </Link>
        {/* <h5 className="font-semibold text-[13px] mr-2">Caching</h5> */}
      </div>

      <div ref={modalRef} className="text-white relative">
        <div
          onClick={() => setShowModal((prev) => !prev)}
          className="flex items-center space-x-4 cursor-pointer"
        >
          <p className="text-[13px] font-semibold capitalize">
            amir
            <span className="text-gray-400 pl-1">(admin 1)</span>
          </p>
          <div className="size-[35px] rounded-full border border-gray-300 p-[1px]">
            <img
              className="h-full w-full bg-cover rounded-full"
              src="/assets/bp-avatar.png"
              alt="User"
            />
          </div>
        </div>

        {showModal ? (
          <div className="absolute z-[10000] top-full bg-blue-light p-4 rounded-md shadow-md w-[200px] right-0">
            <div className="size-[60px] mx-auto rounded-full border border-gray-300 p-[1px]">
              <img
                className="h-full w-full bg-cover rounded-full"
                src="/assets/bp-avatar.png"
                alt="User"
              />
            </div>

            <div className="w-full h-[1px] bg-[#ffffff0f] my-2" />

            <ul className="py-2 space-y-2 text-[13px]">
              <li className="text-[#f0f6fcb3] hover:text-white transition-colors">
                <Link to="#">Edit Profile</Link>
              </li>

              <li
                onClick={logOutHandler}
                className="text-[#f0f6fcb3] cursor-pointer hover:text-white transition-colors font-semibold"
              >
                <span>Log Out</span>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminNavbar;
