import { useEffect, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../../../redux/features/tickeSlice";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const TicketsList = () => {
  const user = localStorage.getItem("user");

  const [active, setActive] = useState("open");

  const dispatch = useDispatch();
  const { tickets, getTicketsLoading, errorMsg } = useSelector(
    (state) => state.ticket
  );

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(
      getTickets({
        axiosPrivate,
        data: {
          priorityId: null,
          creatoruserId: user?.userid || null,
          isanswerd:
            active === "all"
              ? null
              : active === "new"
              ? false
              : active === "active"
              ? true
              : null,
        },
      })
    );
  }, [active]);

  function formatDateTime(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    }
  }
  return (
    <div className="pt-10 px-4 w-full min-h-screen bg-white">
      <div>
        {/* heading */}
        <div className="flex items-center space-x-4">
          <h4 className="text-xl text-gray-900 font-semibold">Tickets</h4>
          <div className="bg-gray-400 p-1 rounded-[4px] w-max aspect-square text-sm flex items-center justify-center min-w-[30px] text-white">
            {tickets?.length}
          </div>
        </div>

        {/* status */}
        <div className="mt-8">
          <div className="flex items-center border border-gray-300 rounded-md w-max text-gray-600 text-sm font-medium">
            <span
              onClick={() => setActive("open")}
              className={`py-2 w-[60px] md:w-[70px] hover:cursor-pointer hover:text-blue-accent transition-colors text-center border-r border-gray-300 ${
                active === "open"
                  ? "bg-blue-accent text-white hover:text-white"
                  : ""
              }`}
            >
              Open
            </span>
            <span
              onClick={() => setActive("active")}
              className={`py-2 w-[60px] md:w-[70px] hover:cursor-pointer hover:text-blue-accent transition-colors text-center border-r border-gray-300 ${
                active === "active"
                  ? "bg-blue-accent text-white hover:text-white"
                  : ""
              }`}
            >
              Active
            </span>
            <span
              onClick={() => setActive("closed")}
              className={`py-2 w-[60px] md:w-[70px] hover:cursor-pointer hover:text-blue-accent transition-colors text-center border-r border-gray-300 ${
                active === "closed"
                  ? "bg-blue-accent text-white hover:text-white"
                  : ""
              }`}
            >
              Closed
            </span>
            <span
              onClick={() => setActive("new")}
              className={`py-2 w-[60px] md:w-[70px] hover:cursor-pointer hover:text-blue-accent transition-colors text-center border-r border-gray-300 ${
                active === "new"
                  ? "bg-blue-accent text-white hover:text-white"
                  : ""
              }`}
            >
              New
            </span>
            <span
              onClick={() => setActive("all")}
              className={`py-2 w-[60px] md:w-[70px] hover:cursor-pointer hover:text-blue-accent transition-colors text-center ${
                active === "all"
                  ? "bg-blue-accent text-white hover:text-white"
                  : ""
              }`}
            >
              All
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-10" />

      <div>
        <MAterialTable
          loading={getTicketsLoading}
          // setSearchCourses={setSearchLesson}
          rows={tickets?.length > 0 ? tickets : []}
          columns={[
            {
              header: "Title",
              accessorKey: "title",
              Cell: ({ row, table }) => {
                return (
                  <div className="flex flex-col justify-center items-start w-48">
                    <div className="flex items-center space-x-3">
                      <img
                        className="rounded-full size-[40px] border border-gray-300"
                        src="/public/assets/bp-avatar.png"
                        alt="User Image"
                      />
                      <div className="flex flex-col leading-5">
                        <Link
                          to={`/admin-panel/fluent-support/tickets/${row?.original?.id}/view`}
                          className="text-base group hover:text-blue-accent hover:underline transition-colors cursor-pointer text-gray-800 font-semibold text-nowrap"
                        >
                          {row?.original?.subject}
                          <span className="text-xs text-gray-500 px-1 group-hover:text-blue-accent">
                            #by {row?.original?.creatorusername}
                          </span>
                        </Link>
                        <span className="text-sm font-normal text-gray-600">
                          new reply
                        </span>
                      </div>
                    </div>
                  </div>
                );
              },
            },
            {
              header: "Manager",

              Cell: ({ row }) => {
                return (
                  <p
                    className="text-blue-800 cursor-pointer"
                    style={{ color: "#2271b1" }}
                  >
                    n/a
                  </p>
                );
              },
            },
            {
              header: "Status",

              Cell: ({ row }) => {
                return (
                  <div className="" style={{ color: "#2271b1" }}>
                    {row?.original?.isanswerd ? (
                      <span className="bg-blue-200 text-blue-500 px-2 py-[2px] rounded-sm">
                        Answerd
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-500 px-2 py-[2px] rounded-sm">
                        New
                      </span>
                    )}
                  </div>
                );
              },
            },
            {
              header: "Date",
              Cell: ({ row }) => {
                return (
                  <div className="flex flex-col">
                    <p>Published</p>
                    <p>{formatDateTime(row?.original?.registerdatetime)}</p>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TicketsList;
