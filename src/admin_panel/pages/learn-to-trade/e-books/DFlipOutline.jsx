import { useEffect, useRef, useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";

const DFlipOutline = ({ formik }) => {
  const [openPdfFile, setOPenPdfFile] = useState(false);
  const [openPdfThumb, setOpenPdfThumb] = useState(false);
  const [openCustomPages, setCustomPages] = useState(false);

  const [viewImages, setViewImages] = useState([]);

  useEffect(() => {
    const imageUrls =
      formik.values?.pageimages?.map((file) =>
        window?.URL?.createObjectURL(file)
      ) || [];

    setViewImages(imageUrls);
  }, [formik.values?.pageimages?.length]);

  const handleAddFiles = (files) => {
    formik.setFieldValue("pageimages", [...formik.values.pageimages, ...files]);
  };

  return (
    <div className="space-y-8 mb-8">
      {/* book source type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Auto Enable Outline
          </h5>

          <p className="text-[#999] text-xs">
            Choose if outline will be auto enabled on start.
          </p>
        </div>
        <div>
          <select
            name="autoEnableOutline"
            value={formik.values.autoEnableOutline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>
      {/* auto enable thumbnail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Auto Enable Thumbnail
          </h5>

          <p className="text-[#999] text-xs">
            Choose if thumbnail will be auto enabled on start.Note : (Either
            thumbnail or outline will be active at a time.)
          </p>
        </div>
        <div>
          <select
            name="autoEnableThumbnail"
            value={formik.values.autoEnableThumbnail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>
      {/* overwrite PDF Outline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Overwrite PDF Outline
          </h5>

          <p className="text-[#999] text-xs">
            Choose if PDF Outline will overwritten.
          </p>
        </div>
        <div>
          <select
            name="overwritePdfOutline"
            value={formik.values.overwritePdfOutline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DFlipOutline;
