import { useEffect, useRef, useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { MdClose } from "react-icons/md";

const DFlipSource = ({ formik }) => {
  const [openPdfFile, setOPenPdfFile] = useState(false);
  const [openPdfThumb, setOpenPdfThumb] = useState(false);

  const pageImagesInput = useRef(null);

  const handleAddFiles = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    const currentImages = [...formik.values?.pageimages, ...fileArray];

    formik.setFieldValue("pageimages", currentImages);
  };

  const removePageImageHandler = (imageUrl) => {
     const newarray = formik.values?.pageimages?.filter(
      (file) => file?.name !== imageUrl?.name
    );
    formik.setFieldValue("pageimages", newarray);
  };

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
          <select
            name="bookSourceTypeId"
            value={formik.values.bookSourceTypeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>PDF File</option>
            <option value={2}>Images</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>
      {Number(formik.values?.bookSourceTypeId) === 1 ? (
        <div>
          {/* PDF File */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <div className="flex flex-col">
              <h5 className="text-[14px] text-[#33373a] font-semibold">
                PDF File
              </h5>

              <p className="text-[#999] text-xs">
                Choose a PDF File to use as source for the book.
              </p>
            </div>
            <div>
              <div className="flex items-center text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
                <div className="w-full border border-gray-600 py-[6px] px-2 overflow-hidden text-nowrap">
                  {formik.values?.pdffile ? (
                    <input
                      type="text"
                      readOnly
                      value={formik.values?.pdffile?.name}
                      className="border-0 outline-none w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Select a Pdf File
                    </span>
                  )}
                </div>
                <CustomButton
                  type="button"
                  onClick={() => setOPenPdfFile(true)}
                  className="text-nowrap rounded-l-none"
                >
                  Select PDF
                </CustomButton>
              </div>

              {formik.errors?.pdffile && formik.touched?.pdffile ? (
                <span className="text-sm text-red-600 p-1">
                  {formik.errors.pdffile}
                </span>
              ) : null}
            </div>

            <LibraryModal
              file={formik?.values?.pdffile}
              set_file={(file) => {
                formik.setFieldValue("pdffile", file);
              }}
              error={formik.errors?.pdffile}
              onBlur={formik.handleBlur}
              accept_file="PDF"
              has_side_bar_action={false}
              title="Add Media"
              open={openPdfFile}
              set_open={setOPenPdfFile}
              onSave={() => setOPenPdfFile(false)}
            />
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-8"></div>

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
                <div className="w-full border border-gray-600 py-[6px] px-2 text-nowrap overflow-hidden">
                  {formik.values?.pdfthumbnailimage ? (
                    <input
                      type="text"
                      readOnly
                      value={formik.values?.pdfthumbnailimage?.name}
                      className="border-0 outline-none w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Select an Image
                    </span>
                  )}
                </div>
                <CustomButton
                  type="button"
                  onClick={() => setOpenPdfThumb(true)}
                  className="text-nowrap rounded-l-none"
                >
                  Select Image
                </CustomButton>
              </div>
              {formik.errors?.pdfthumbnailimage &&
              formik.touched?.pdfthumbnailimage ? (
                <span className="text-sm text-red-600 p-1">
                  {formik.errors.pdfthumbnailimage}
                </span>
              ) : null}
            </div>

            <LibraryModal
              file={formik?.values?.pdfthumbnailimage}
              set_file={(file) => {
                formik.setFieldValue("pdfthumbnailimage", file);
              }}
              error={formik.errors?.pdfthumbnailimage}
              onBlur={formik.handleBlur}
              accept_file="Image"
              has_side_bar_action={false}
              title="Add Media"
              open={openPdfThumb}
              set_open={setOpenPdfThumb}
              onSave={() => setOpenPdfThumb(false)}
            />
          </div>
        </div>
      ) : Number(formik.values?.bookSourceTypeId) === 2 ? (
        <div>
          {/* Custom Pages */}
          {/* <div className="flex flex-col items-start gap-y-3">
            <div className="flex flex-col">
              <h5 className="text-[14px] text-[#33373a] font-semibold">
                Custom Pages
              </h5>

              <p className="text-[#999] text-xs">
                Add or remove pages as per your requirement. Plus reorder them
                in the order needed.
              </p>
            </div>
            <div>
              <div className="flex flex-col text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
                <div className="w-full flex items-center gap-2">
                  {viewImages?.length > 0 ? (
                    <>
                      {" "}
                      {viewImages.map((imageUrl, index) => (
                        <img
                          src={imageUrl}
                          key={index}
                          alt="Page Image"
                          className="mb-2 w-[200px] aspect-video"
                        />
                      ))}{" "}
                    </>
                  ) : null}
                </div>
                <CustomButton
                  type="button"
                  onClick={() => setCustomPages(true)}
                  className="text-nowrap rounded-l-none"
                  size="sm"
                >
                  Add New Page
                </CustomButton>
              </div>
              {formik.errors?.pdfthumbnailimage &&
              formik.touched?.pdfthumbnailimage ? (
                <span className="text-sm text-red-600 p-1">
                  {formik.errors.pdfthumbnailimage}
                </span>
              ) : null}
            </div>

            <LibraryModal
              file={formik.values.pageimages[0]}
              set_files={(files) => handleAddFiles(files)}
              error={formik.errors.pageimages}
              onBlur={formik.handleBlur}
              accept_file="Image"
              has_side_bar_action={false}
              title="Add Media"
              open={openCustomPages}
              set_open={setCustomPages}
              onSave={() => setCustomPages(false)}
            />
          </div> */}
          <div className="flex flex-col items-start gap-y-3">
            <div className="flex flex-col">
              <h5 className="text-[14px] text-[#33373a] font-semibold">
                Custom Pages
              </h5>
              <p className="text-[#999] text-xs">
                Add or remove pages as per your requirement. Plus reorder them
                in the order needed.
              </p>
            </div>

            <div className="w-full">
              <div className="flex flex-col w-full text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
                <div className="w-full flex items-center gap-2 flex-wrap max-h-[300px] overflow-y-scroll scrollbar-thin">
                  {formik?.values?.pageimages?.length > 0
                    ? formik?.values?.pageimages?.map((imageUrl, index) => (
                        <div className="relative w-[180px] aspect-video bg-contain">
                          <img
                            src={URL.createObjectURL(imageUrl)}
                            key={index}
                            alt="Page Image"
                            className="mb-2 w-full h-full object-fill bg-cover"
                          />
                          <div
                            onClick={() => removePageImageHandler(imageUrl)}
                            className="absolute top-1 right-1 bg-red-400/70 hover:bg-red-400/100 transition-all text-gray-100 size-[25px] flex items-center justify-center rounded-full shadow-sm cursor-pointer"
                          >
                            <MdClose size={18} />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
                <CustomButton
                  type="button"
                  onClick={() =>
                    // document.getElementById("pageImagesInput").click()
                    pageImagesInput.current.click()
                  }
                  className="text-nowrap w-max mt-4 mx-3"
                  size="sm"
                >
                  Add New Page
                </CustomButton>
                <input
                  id="pageImagesInput"
                  ref={pageImagesInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddFiles}
                  style={{ display: "none" }}
                />
              </div>
              {formik.errors?.pageimages && formik.touched?.pageimages ? (
                <span className="text-sm text-red-600 p-1">
                  {formik.errors.pageimages}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DFlipSource;
