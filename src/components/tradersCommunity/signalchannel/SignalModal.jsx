import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { getSignalImage } from "../../../redux/features/signals/SignalSlice";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SignalModal = ({ signal, alltime, setShowSignalDetailModal }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(getSignalImage({ axiosPrivate, id: signal?.id, toast }));
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[1001] w-full h-screen flex items-center justify-center">
      {/* modal overlay */}
      <div className="bg-black opacity-45 z-[100] absolute w-full h-full top-0 left-0"></div>

      <div className="bg-white p-4 z-[101] rounded-lg shadow-lg w-full sm:w-[90%] md:w-[80%] lg:w-[80%] xl:w-[80%] max-w-[120vh] overflow-y-scroll h-[80vh] scrollbar-none">
        <div className="flex justify-end mb-3">
          <IoCloseSharp
            size={24}
            className="text-red-300 hover:text-red-400 transition-all cursor-pointer"
            onClick={() => setShowSignalDetailModal(false)}
          />
        </div>

        <div
          className={`group cursor-pointer h-auto opacity-100 pr-5 flex flex-col items-center mb-3 p-0 max-w-full relative `}
          onClick={() => {
            setShowSignalDetailModal(true);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 relative justify-evenly w-full text-black rounded-[4px] text-left py-3 px-3">
            <div className="">
              <span className="text-sm font-semibold text-gray-700">
                Analysis
              </span>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <ul>
                    <li>{alltime(signal)}</li>
                  </ul>

                  {signal?.positiontypename === "Long" ? (
                    <div className="text-xs gap-1 bg-[#22ab94] text-white px-2 py-1 rounded-sm w-max flex items-center">
                      <GoArrowUpRight size={18} />
                      Long
                    </div>
                  ) : signal?.positiontypename === "Short" ? (
                    <div className="text-xs gap-1 bg-[#f7525f] text-white px-2 py-1 rounded-sm w-max flex items-center">
                      <GoArrowDownRight size={18} />
                      Short
                    </div>
                  ) : null}
                </div>
                <ul className="flex flex-wrap items-center gap-2 my-2">
                  <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                    #{signal?.analysistypename}
                  </li>
                  <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                    #{signal?.marketsyclename}
                  </li>
                  <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                    #{signal?.instrumenttypename}
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm font-semibold text-gray-700">
                Trading Setup
              </span>
              <div className="w-[80%] px-4 mt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Entry Point</span>
                  <span className="text-gray-700 text-sm">
                    {signal?.entrypoint}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 text-sm uppercase">SL</span>
                  <span className="text-red-600 text-sm">{signal?.sl}</span>
                </div>
                {signal?.tp1 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      TP1
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.tp1}
                    </span>
                  </div>
                )}

                {signal?.tp2 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      TP2
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.tp2}
                    </span>
                  </div>
                )}

                {signal?.tp3 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      TP3
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.tp3}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm font-semibold text-gray-700">Range</span>
              <div className="w-[80%] px-4 mt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 text-sm uppercase">
                    Resistance 1
                  </span>
                  <span className="text-red-600 text-sm">
                    {signal?.resistance1}
                  </span>
                </div>
                {signal?.resistance2 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      Resistance 2
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.resistance2}
                    </span>
                  </div>
                )}

                {signal?.resistance3 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      Resistance 3
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.resistance3}
                    </span>
                  </div>
                )}

                {signal?.support1 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      Support 1
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.support1}
                    </span>
                  </div>
                )}

                {signal?.support2 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      Support 2
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.support2}
                    </span>
                  </div>
                )}

                {signal?.support3 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm uppercase">
                      Support 3
                    </span>
                    <span className="text-green-600 text-sm">
                      {signal?.support3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* signal description  */}

          <div className="my-3">
            <span className="text-sm font-semibold text-gray-700">
              Description
            </span>
            <p className="text-base text-gray-600">{signal?.description}</p>
          </div>

          {/* imaage */}
          <div className="w-full mt-8 mb-6 flex justify-center border border-gray-300 rounded-md p-3 shadow-sm">
            <img
              className="w-[90%] max-h-[220px] object-contain"
              src="/assets/community/signalChannel/forex-signals.jpg"
              alt="Signal Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalModal;
