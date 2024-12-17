import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  add,
  compareAsc,
  format,
  isWeekend,
  setYear,
  setMonth,
  sub,
} from "date-fns";

// react-calendar CSS and overrides
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import ModalLayout from "../../common/modal_layout";
import { CustomDivider } from "../../pages/profile/new_course_components/new_cource_card";

import { LinearProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ImFilesEmpty } from "react-icons/im";
import { MdClose } from "react-icons/md";
import { useGetLTRWebinarsQuery } from "../../redux/features/learnToTrade/LearnToTradeApi";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-7 h-7 p-1 flex items-center justify-center bg-blue-dark text-gold-light_300 rounded-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const leftArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-7 h-7 p-1 justify-center items-center bg-blue-dark text-gold-light_300 rounded-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const NavButton = ({ label, onClick }) => (
  <button
    className="!border-none"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {label}
  </button>
);

const CustomCalendaar = ({ closingDate }) => {
  const [value, onChange] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(
    closingDate || new Date()
  );

  const [selectedDate, setSelectedData] = useState(null);
  const [is_open, set_is_open] = React.useState({ open: false, value: null });

  const {
    data: { messageData: webinars } = { messageData: [] },

    isLoading,
  } = useGetLTRWebinarsQuery({
    data: {
      id: null,
      fromdateAndTime: "2020-08-25T01:03:00",
      todateAndTime: "2020-08-25T01:03:00",
      title: null,
      categoryid: null,
      pageindex: 1,
      rowcount: 21,
    },
    skip: !selectedDate,
  });

  // 2020-08-25T01:03:00
  return (
    <div className="wrapper mt-16">
      {console.log({ selectedDate })}
      <ModalLayout
        open={is_open.open}
        onClose={(val) => {
          set_is_open({ open: false, value: null });
        }}
      >
        <div
          className="flex flex-col min-w-96 py-6 px-8"
          style={{ minWidth: 600 }}
        >
          <div className="flex items-center justify-between px-8 py-2">
            <h3 className="font-semibold">Meeting Schedule</h3>
            <span
              onClick={() => set_is_open({ open: false, value: null })}
              className="cursor-pointer hover:text-red-500 text-gray-700 transition-colors"
            >
              <MdClose size={20} />
            </span>
          </div>
          <div className="w-full my-2">
            <CustomDivider />
          </div>
          {isLoading && (
            <LinearProgress
              style={{ backgroundColor: "transparent" }}
              color="primary"
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {!isLoading && webinars.length && (
              <motion.div
                initial={{ height: 0 }}
                key={webinars.length}
                exit={{ height: 0 }}
                animate={{ height: "fit-content" }}
                style={{ overflow: "hidden" }}
              >
                <ul className="mt-3">
                  {webinars.map((webinar) => (
                    <li key={webinar.id} className="mb-4">
                      <div className="flex items-center space-x-6">
                        <img
                          src={webinar.featuredimageurl}
                          alt={webinar.title}
                          className="w-32 h-32 object-cover rounded"
                        />{" "}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">
                            {webinar.title}
                          </h3>{" "}
                          <p className="text-gray-600">
                            {new Date(webinar.dateAndTime).toLocaleString()}
                          </p>{" "}
                          <p className="text-gray-700">{webinar.description}</p>{" "}
                          {webinar.videofileurl && (
                            <a
                              href={webinar.videofileurl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Watch Video
                            </a>
                          )}
                          {webinar.meetingLink && (
                            <a
                              href={webinar.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Join Meeting
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {!isLoading && !webinars.length && (
              <motion.div
                key={webinars.length}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "fit-content" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full justify-center flex items-center overflow-hidden"
              >
                <ImFilesEmpty />
                <h4 className="text-black font-semibold ml-2">
                  No meetings Scheduled
                </h4>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ModalLayout>
      <div>
        <div className="bg-gold-light_400 flex flex-col text-center">
          <h3 className="text-4xl text-blue-dark font-semibold pt-3">
            Live Training Days
          </h3>
          <div className="flex items-center mx-auto py-2 space-x-3">
            <div className="text-3xl text-blue-dark ">
              {format(activeStartDate, "MMMM")},{" "}
              {format(activeStartDate, "yyyy")}
            </div>
            <div className=" flex items-center space-x-1">
              <NavButton
                label={leftArrow}
                onClick={() =>
                  setActiveStartDate(sub(activeStartDate, { months: 1 }))
                }
              />
              <NavButton
                label={rightArrow}
                onClick={() =>
                  setActiveStartDate(add(activeStartDate, { months: 1 }))
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Calendar
            className="!w-full !bg-blue-light"
            activeStartDate={activeStartDate}
            calendarType="gregory"
            showNavigation={false}
            onChange={(val) => {
              onChange(val);
              set_is_open({ open: true, value: val });
              let localDate = new Date(val);
              localDate.setHours(24, 0, 0, 0);
              let IsosString = localDate.toISOString();
              const [datePart, timePart] = IsosString.split("T");
              console.log({ datePart, timePart });
              setSelectedData(`${datePart}T00:00:00`);

              // get_course_meetings_api({
              //   search: {
              //     duedatetime: `${datePart}T00:00:00`,
              //   },
              // })
              // .then((res) => {
              //   // set_meethins(res);
              // })
              // .catch((err) => {
              //   console.log(err);
              //   toast.error("Something went wrong! please try again.");
              // });
            }}
            value={value}
            tileClassName={({ date }) =>
              closingDate?.toDateString() === date.toDateString()
                ? "initial-closing-date"
                : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendaar;
