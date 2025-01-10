import { useState } from "react";
import { CustomButton } from "../../../components/ui/CustomButton";
import { CiViewTable } from "react-icons/ci";
import { MdOutlineGridView } from "react-icons/md";
import GridView from "../../components/media/GridView";
import TableView from "../../components/media/TableView";



const MediaLibrary = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="px-8 py-10">
      <div className="flex items-center gap-4">
        <h2 className="font-normal text-2xl text-[#1d2327]">Media Library</h2>
        <CustomButton variant="outlined" size="sm">
          Add New Media File
        </CustomButton>
      </div>

      {/* top bar */}
      <div className="bg-white border flex items-center justify-between border-gray-400 p-2 mt-20 mb-4">
        {/* left side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              onClick={() => setView("table")}
              className={`${
                view === "table" ? "text-[#2271b1]" : "text-[#c3c4c7]"
              } cursor-pointer font-semibold`}
            >
              <CiViewTable size={18} />
            </span>
            <span
              onClick={() => setView("grid")}
              className={`${
                view === "grid" ? "text-[#2271b1]" : "text-[#c3c4c7]"
              } cursor-pointer font-semibold`}
            >
              <MdOutlineGridView size={18} />
            </span>
          </div>

          {/* ========= */}
          <div className="flex items-center gap-4">
            <select className="border-[#8c8f94] bg-transparent border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>All media items</option>
              <option>Images</option>
              <option>Audio</option>
              <option>Video</option>
              <option>Documents</option>
              <option>SpreadSheets</option>
              <option>Archives</option>
              <option>Unattached</option>
              <option>Mine</option>
            </select>

            <select className="border-[#8c8f94] bg-transparent border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option value="all">All dates</option>
              <option value="0">December 2024</option>
              <option value="1">November 2024</option>
              <option value="2">September 2024</option>
              <option value="3">August 2024</option>
              <option value="4">April 2024</option>
              <option value="5">March 2024</option>
              <option value="6">February 2024</option>
              <option value="7">January 2024</option>
              <option value="8">December 2023</option>
              <option value="9">November 2023</option>
              <option value="10">October 2023</option>
              <option value="11">September 2023</option>
              <option value="12">August 2023</option>
              <option value="13">July 2023</option>
              <option value="14">June 2023</option>
              <option value="15">May 2023</option>
              <option value="16">April 2023</option>
              <option value="17">March 2023</option>
              <option value="18">February 2023</option>
              <option value="19">January 2023</option>
              <option value="20">December 2022</option>
              <option value="21">November 2022</option>
              <option value="22">October 2022</option>
              <option value="23">September 2022</option>
              <option value="24">August 2022</option>
            </select>
          </div>

          {/*  */}

          <CustomButton variant="outlined" size="sm" className="rounded-[3px]">
            Bulk Select
          </CustomButton>
        </div>

        {/* right side */}
        <div>
          <label className="flex items-center gap-2">
            <span className="text-[#50575e] text-[14px]">Search media</span>
            <input
              type="text"
              className="border border-gray-300 rounded-[3px] outline-[#2271b1] active:border-[#2271b1] px-3 py-[5px] text-gray-600"
            />
          </label>
        </div>
      </div>

      {/* view */}

      {view === "grid" ? <GridView /> : view === "table" ? <TableView /> : null}
    </div>
  );
};

export default MediaLibrary;
