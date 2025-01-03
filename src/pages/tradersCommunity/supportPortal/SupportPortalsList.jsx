import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getMyTickets, getTickets } from "../../../redux/features/tickeSlice";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";

const SupportPortalsList = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [ticketCategory, setTicketCategory] = useState("all");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { tickets, getTicketsLoading, myTickets, errorMsg } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    dispatch(
      getMyTickets({
        axiosPrivate,
        data: {
          priorityId: null,
          creatoruserId: user?.userid || null,
          isanswerd: false,
        },
      })
    );
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className="my-20">
      {console.log({ myTickets })}
      <div className="bg-link-water rounded-md w-[90%] mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center border border-[#dcdfe6] rounded-md mb-3">
            <button
              onClick={() => setTicketCategory("all")}
              className={`cursor-pointer text-base px-6 py-[6px]  ${
                ticketCategory === "all"
                  ? "text-white bg-gold-light_400"
                  : "text-gray-600 bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTicketCategory("open")}
              className={`cursor-pointer text-base  px-6 py-[6px] border-l border-r ${
                ticketCategory === "open"
                  ? "text-white bg-gold-light_400"
                  : "text-gray-600 bg-white"
              }`}
            >
              open
            </button>
            <button
              onClick={() => setTicketCategory("close")}
              className={`cursor-pointer text-base text-gray-600 px-6 py-[6px] ${
                ticketCategory === "close"
                  ? "text-white bg-gold-light_400"
                  : "text-gray-600 bg-white"
              }`}
            >
              closed
            </button>
          </div>

          <Link
            to="/traders-community/support-portal/ticket/create"
            className="bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-lg text-blue-dark px-4 py-2 rounded-md text-sm font-semibold"
          >
            Create a New Ticket
          </Link>
        </div>

        <div className="mt-6 overflow-y-scroll max-h-[60vh] h-auto pb-10 overflow-x-scroll scrollbar-none text-[#5a5c69] mx-auto">
          <table className="bg-gray-100 text-gray-900 w-full">
            <thead className="bg-gray-100 sticky top-0 text-gray-900">
              <tr className="bg-blue-light text-white text-sm">
                <th className="p-3 w-[30px]"> select</th>
                <th className="p-3 w-[30px]"> row</th>
                <th className="p-3 px-6">Subject</th>
                <th className="p-3"> Status </th>
                <th className="p-3"> Date </th>
              </tr>
            </thead>

            <tbody className="bg-gray-100 text-[#5a5c69] text-sm">
              {myTickets?.length ? (
                myTickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="bg-link-water shadow-sm hover:bg-[#e0ebf9] cursor-pointer transition-all"
                  >
                    <td className="p-3 border border-gray-300 text-center ">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3 border border-gray-300 text-center ">
                      {index + 1}
                    </td>
                    <td className="p-3 border border-gray-300 text-center ">
                      {ticket?.subject || "unknown"}
                    </td>
                    {/* <td className="p-3 border border-gray-300 text-center ">
                      <div
                        className="my-2"
                        dangerouslySetInnerHTML={{ __html: ticket?.textbody }}
                      />
                    </td> */}

                    <td className="p-3 border border-gray-300 text-center ">
                      {ticket?.isanswerd ? (
                        <span className="">Answered</span>
                      ) : (
                        <span className="bg-blue-light text-sm px-2 py-1 rounded-md text-white">
                          New
                        </span>
                      )}
                    </td>

                    <td className="p-3 border border-gray-300 text-center ">
                      {formatDate(ticket?.registerdatetime) || "-"}
                    </td>

                    {/* <td
                      onClick={() => {
                        setShowUserDetail(true);
                        setUserDetail(user);
                      }}
                      className="p-3 border border-gray-300 text-center "
                    >
                      <LiaEditSolid className="cursor-pointer" size={20} />
                      {showUserDetail && (
                        <UserDetailModal
                          userDetail={userDetail}
                          setShowUserDetail={setShowUserDetail}
                          setUserDetail={setUserDetail}
                        />
                      )}
                    </td> */}
                  </tr>
                ))
              ) : getTicketsLoading === true ? (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10 "
                  >
                    <div className="flex items-center justify-center w-full gap-3">
                      <span className="text-blue-light text-lg">
                        Fetching data ...{" "}
                      </span>
                      <CustomBeatLoader />
                    </div>
                  </td>
                </tr>
              ) : errorMsg ? (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span className="text-sm text-red-600">
                      Server not responded!. please try again later
                    </span>
                  </td>
                </tr>
              ) : (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span>Data Not Found!</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="bg-white">
          <div className="flex justify-between items-center border-b-2 text-gray-600 px-4 py-3">
            <span className="flex-[3]">Conversation</span>
            <span className="flex-1">Status</span>
            <span className="flex-1">Date</span>
          </div>

          <div className="bg-white px-4 py-4 flex justify-center items-center">
            {tickets?.length
              ? tickets.map((ticket, index) => (
                  <>
                    <span className="flex-[3]">Conversation</span>
                    <span className="flex-1">Status</span>
                    <span className="flex-1">Date</span>
                  </>
                ))
              : null}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SupportPortalsList;
