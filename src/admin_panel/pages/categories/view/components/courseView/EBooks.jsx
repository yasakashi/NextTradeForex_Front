import { FaRegFilePdf } from "react-icons/fa6";

const EBooks = () => {
  return (
    <div className="w-full wrapper">
      <div className="border border-gold-light_400 bg-blue-light w-full mx-4 rounded-lg shadow-lg">
        <div className="flex items-start justify-between px-4 py-3">
          <h4 className="text-xl font-semibold capitalize hover:underline hover:cursor-pointer">Forex survival manual </h4>
          <span className="w-max bg-white p-2 rounded-full shadow-sm flex items-center justify-center">
            <FaRegFilePdf size={18} className="text-blue-dark" />
          </span>
        </div>
        <div className="bg-white w-[200px] rounded-r-full mb-3 py-1">
          <span className="text-sm font-bold text-gold-light_400 pl-2">by : </span>
          <span className="text-sm font-normal text-blue-dark px-2">Next trade forex</span>
        </div>
      </div>
    </div>
  );
};

export default EBooks;
