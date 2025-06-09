import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetTicketsReportsQuery } from "../../../redux/features/api/admin-panel/adminTicketsApi";

const FluentSupportDashboard = () => {
  const {
    data: { messageData: [data = {}] = [] } = { messageData: [] },
    isLoading,
  } = useGetTicketsReportsQuery();
  return (
    <div className="flex flex-col px-8 py-10">
      {console.log({ data })}
      <div className="flex items-center flex-col sm:flex-row gap-2 sm:justify-between">
        <h1 className="text-[#1d2327] text-3xl font-semibold leading-6">
          Good afternoon Next trade !!!
        </h1>
        <div className="flex items-start gap-4">
          <button
            type="button"
            className="bg-[#409eff] outline-none px-3 py-2 rounded"
          >
            <IoSettingsOutline size={18} className="text-white" />
          </button>

          <button
            type="button"
            className="bg-[#909399] outline-none px-3 text-sm py-2 rounded text-white"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Your bookmarked tickets */}
          <SectionTemp label="Your bookmarked Tickets"></SectionTemp>

          {/* Your Overview for today */}
          <SectionTemp label="Your Overview For Today">
            <ul>
              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  New Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.newticketsCount || 0}
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Active Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.activeticketsCount || 0}
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Closed Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.closedticketsCount || 0}
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Responses :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.responsesCount || 0}
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Interactions :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.interactionsCount || 0}
                </span>
              </li>

              <li className="pt-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Unssigned Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  {data?.unassignedTickets || 0}
                </span>
              </li>
            </ul>
            <div className="pb-4 pt-8">
              <p className="text-sm text-gray-700">
                <span className="text-[#ff7c7c]">1 tickets</span> are waiting
                for reply with{" "}
                <span className="text-[#88c379]">avarage 0 wait time</span> &
                max wait time
                <span className="text-[#7280ff]"> 0 </span>
              </p>
            </div>
          </SectionTemp>
        </div>

        <div>
          {/* tickets for look at */}
          <SectionTemp label="Here Are A Few Tickets You May Want To Take A Look At">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="size-[40px] bg-cover border border-gray-400 rounded-full"
                  src="/assets/bp-avatar.png"
                  alt="User"
                />
                <Link className="text-[15px] text-gray-700 underline" to="#">
                  new ticket text
                </Link>
              </div>

              <div className="text-[#f06060] bg-[#fcd7d8] font-medium text-sm px-3 py-[4px] rounded">
                New
              </div>
            </div>

            <div className="pb-4 pt-8">
              <p className="text-sm text-gray-700">
                <span className="text-[#ff7c7c]">1 tickets</span> are waiting
                for reply with{" "}
                <span className="text-[#88c379]">
                  avarage 7 months wait time
                </span>{" "}
                & max wait time
                <span className="text-[#7280ff]"> 7 months</span>
              </p>
            </div>
          </SectionTemp>

          {/* today's activity */}
          <SectionTemp label="Today's Active Tickets By Products"></SectionTemp>

          {/* agent performance */}
          <SectionTemp label="Agent Performance (Today)">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 pb-4">
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Agent
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Waiting
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Responses
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Closed
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-500 text-base py-2"
                  >
                    No Data
                  </td>
                </tr>
              </tbody>
            </table>
          </SectionTemp>
        </div>
      </div>
    </div>
  );
};

export default FluentSupportDashboard;

const SectionTemp = ({ label, children }) => {
  return (
    <div className="rounded-[10px] shadow-md mb-5 max-w-2xl">
      <div className="flex justify-between items-center rounded-t-[10px] bg-[#f5f5f5] hover:bg-[#edf8f2] transition-all cursor-pointer p-4">
        <h4 className="text-sm text-black font-medium">{label}</h4>
        <button type="button">
          <IoIosArrowDown size={14} />
        </button>
      </div>

      <div className="bg-white p-3 rounded-b-[10px]">{children}</div>
    </div>
  );
};
