import { useRef } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";

const DFlipSource = () => {

  const selectPDFRef = useRef(null);

  return (
    <div className="space-y-8 mb-8">
      {/* book source type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Book Source Type
          </h5>

          <p className="text-[#999] text-xs">
            choose the source of this book. "PDF" for pdf files. "Image" for
            image files.
          </p>
        </div>
        <div>
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>PDF File</option>
            <option>Images</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* PDF File */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">PDF File</h5>

          <p className="text-[#999] text-xs">
            Choose a PDF File to use as source for the book.
          </p>
        </div>
        <div>
          <div className="flex items-center text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
            <div className="w-full border border-gray-600 py-[6px] px-2">
              <span className="text-gray-500 text-sm">Select a Pdf File</span>
            </div>
            <CustomButton className="text-nowrap rounded-l-none">
              Select PDF
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* PDF Thumbnail Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            PDF Thumbnail Image
          </h5>

          <p className="text-[#999] text-xs">
            Choose an image file for PDF thumb.
          </p>
        </div>
        <div>
          <div className="flex items-center text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
            <div className="w-full border border-gray-600 py-[6px] px-2">
              <span className="text-gray-500 text-sm">Select an image</span>
            </div>
            <CustomButton className="text-nowrap rounded-l-none">
              Select PDF
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DFlipSource;
