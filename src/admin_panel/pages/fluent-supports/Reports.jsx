import TicketChartReport from "../../components/fluent-support/TicketChartReport";

const TicketReports = () => {
  return (
    <div className="flex flex-col px-8 py-10">
      <h3 className="text-xl font-medium text-gray-700 py-3">
        Personal Reports
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-3">
          <div className="w-full bg-white p-4 rounded-md shadow-md">
            <TicketChartReport />
          </div>

          <div className="col-span-1 md:col-span-3 bg-white mt-10 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-medium text-gray-800 py-3">
              Individual Performance
            </h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 pb-4">
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Agent
                  </td>

                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Responses
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Interactions
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Open Tickets
                  </td>
                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    Closed
                  </td>

                  <td className=" px-2 py-2 font-medium text-sm text-gray-500">
                    current Overlall
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-gray-500 p-2">Next trade</td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2"></td>
                  <td className="text-gray-500 p-2">
                    <ul className="">
                      <li className="py-1">
                        <span className="font-medium text-[13px] text-gray-600">
                          Waiting Tickets :
                        </span>
                        <span className="text-[12px] text-gray-700 font-medium px-1">
                          0
                        </span>
                      </li>

                      <li className="py-1">
                        <span className="font-medium text-[13px] text-gray-600">
                          Average Waiting :
                        </span>
                        <span className="text-[12px] text-gray-700 font-medium px-1">
                          0
                        </span>
                      </li>

                      <li className="py-1">
                        <span className="font-medium text-[13px] text-gray-600">
                          Max Waiting :
                        </span>
                        <span className="text-[12px] text-gray-700 font-medium px-1">
                          0
                        </span>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          {/* your overall stats */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-medium text-gray-700">
              Your Overall Stats
            </h3>
            <ul className="">
              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Total Replies :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Total Interactions :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>

              <li className="pt-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Total Closed :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>
            </ul>
          </div>

          {/* Today stats */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-medium text-gray-700">Today Stats</h3>
            <ul className="">
              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  New Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>

              <li className="border-b border-b-gray-300 py-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Closed Tickets :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>

              <li className="pt-3">
                <span className="font-semibold text-[13px] text-gray-700">
                  Responses :
                </span>
                <span className="text-[12px] text-gray-700 font-medium px-1">
                  0
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketReports;
