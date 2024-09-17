import CummunityNavbar from "../../../components/tradersCommunity/Navbar";

const SignalsList = () => {
  return (
    <div className="mt-6">
      <h3 className="flex justify-center items-center w-full text-gray-800 font-bold text-lg">
        Signals List
      </h3>

      <div className="mt-8 bg-white rounded-lg p-4 w-full overflow-x-auto scrollbar-thin">
        <table className="bg-gray-100 text-gray-900 w-full min-w-[800px]">
          <thead className="bg-gray-100 text-gray-900">
            <tr className="text-sm text-white">
              <th className="p-3 bg-blue-dark border border-white">
                Signal Details
              </th>
              <th className="p-3 bg-blue-dark border border-white">Analysis</th>
              <th className="p-3 bg-blue-dark border border-white">
                Trade Setup
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 text-[#5a5c69]">
            <tr className="bg-gray-200 shadow-sm">
              <td className="p-3 border border-gray-300 text-center ">
                <span>May 20, 2024 - 09:11</span>
                <ul>
                  <ol>Forex Signals</ol>
                  <ol>Gold Signals</ol>
                  <ol>XAuUSD Signals</ol>
                  <ol>Free Signals</ol>
                </ul>
              </td>
              <td className="p-3 border border-gray-300 text-center ">
                <span>1 hour</span>
                <span> long</span>
                <div className="flex flex-wrap items-start gap-2">
                  <span className="rounded-xl px-3 py-1 bg-gold-light_400 text-white text-xs">
                    #Technical
                  </span>
                  <span className="rounded-xl px-3 py-1 bg-gold-light_400 text-white text-xs">
                    #Bulish
                  </span>
                </div>
              </td>

              <td className="p-3 border border-gray-300 text-center ">
                <p>Entry Point 2442.0</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 text-sm">SL</span>
                  <span className="text-red-600 text-sm">2430.0</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-green-600 text-sm">TP1</span>
                  <span className="text-green-600 text-sm">2464.9999</span>
                </div>
              </td>
            </tr>

            <tr className="bg-gray-200 shadow-sm">
              <td className="p-3 border border-gray-300 text-center ">
                <span>May 20, 2024 - 09:11</span>
                <ul>
                  <ol>Forex Signals</ol>
                  <ol>Gold Signals</ol>
                  <ol>XAuUSD Signals</ol>
                  <ol>Free Signals</ol>
                </ul>
              </td>
              <td className="p-3 border border-gray-300 text-center ">
                <span>1 hour</span>
                <span> long</span>
                <div className="flex flex-wrap items-start gap-2">
                  <span className="rounded-xl px-3 py-1 bg-gold-light_400 text-white text-xs">
                    #Technical
                  </span>
                  <span className="rounded-xl px-3 py-1 bg-gold-light_400 text-white text-xs">
                    #Bulish
                  </span>
                </div>
              </td>

              <td className="p-3 border border-gray-300 text-center ">
                <p>Entry Point 2442.0</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 text-sm">SL</span>
                  <span className="text-red-600 text-sm">2430.0</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-green-600 text-sm">TP1</span>
                  <span className="text-green-600 text-sm">2464.9999</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignalsList;
