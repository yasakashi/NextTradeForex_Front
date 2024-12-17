import { useRef, useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";

const DFlipLayout = ({ formik }) => {
  const [openBgImg, setOpenBgImg] = useState(false);

  return (
    <div className="space-y-8 mb-8">
      {/* 3D or 2D */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">3D or 2D</h5>

          <p className="text-[#999] text-xs">
            Choose the mode of display. WebGL for realistic 3d
          </p>
        </div>
        <div>
          <select
            name="displayMode"
            value={formik.values?.displayMode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>WebGL 3D</option>
            <option value={3}>CSS 3D/2D</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Hard Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Hard Pages
          </h5>

          <p className="text-[#999] text-xs">
            Choose which pages to act as hard.(Only in CSS mode)
          </p>
        </div>
        <div>
          <select
            name="hardPageId"
            value={formik.values?.hardPageId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>Cover Pages</option>
            <option value={3}>All Pages</option>
            <option value={4}>None</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Background color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Background Color
          </h5>

          <p className="text-[#999] text-xs">
            Background color in hexadecimal format eg:
            <code className="bg-gray-200 mx-1 px-1">#FFF</code> or{" "}
            <code className="bg-gray-200 mx-1 px-1">#666666</code>
          </p>
        </div>
        <div>
          <input
            name="bgColor"
            value={formik.values?.bgColor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Example : #FFFFFF"
            type="text"
            max="7"
            className="w-full tracking-wider placeholder:capitalize uppercase placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          />
          {formik.touched?.bgColor && formik.errors?.bgColor ? (
            <span className="text-red-600 text-[13px] p-1">
              {" "}
              {formik.errors?.bgColor}
            </span>
          ) : null}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Background Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Background Image
          </h5>

          <p className="text-[#999] text-xs">
            Background image JPEG or PNG format:
          </p>
        </div>
        <div>
          <div className="flex items-center text-base text-[#2c3338] py-[6px] pl-2 bg-transparent rounded-sm">
            <div className="w-full border border-gray-600 py-[6px] px-2">
              {formik.values?.bgimage ? (
                <input
                  type="text"
                  readOnly
                  value={formik.values?.bgimage?.name}
                  className="border-0 outline-none w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-sm">Select an Image</span>
              )}
            </div>
            <CustomButton
              type="button"
              onClick={() => setOpenBgImg(true)}
              className="text-nowrap rounded-l-none"
            >
              Select Image
            </CustomButton>
          </div>
        </div>

        <LibraryModal
          file={formik?.values?.bgimage}
          set_file={(file) => {
            formik.setFieldValue("bgimage", file);
          }}
          error={formik.errors?.bgimage}
          onBlur={formik.handleBlur}
          accept_file="Image"
          has_side_bar_action={false}
          title="Add Media"
          open={openBgImg}
          set_open={setOpenBgImg}
          onSave={() => setOpenBgImg(false)}
        />
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Flip Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Flip Duration
          </h5>

          <p className="text-[#999] text-xs">
            Time in milliseconds eg:
            <code className="bg-gray-200 mx-1 px-1">1000</code> for 1 second
          </p>
        </div>
        <div>
          <input
            name="flipDuration"
            value={formik.values?.flipDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Example : 1000"
            type="text"
            className="w-full tracking-wider placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Container Height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Container Height
          </h5>

          <p className="text-[#999] text-xs leading-5">
            Height of the flipbook container where in <br /> normal mode.
            <code className="bg-gray-200 mx-1 px-1">500</code> for 500px <br />
            <code className="bg-gray-200 mx-1 px-1">auto</code> for authofit
            height <br />
            <code className="bg-gray-200 mx-1 px-1">100%</code> for 100% height
            (of parcent element, <br /> else it will be 320px) <br />
          </p>
        </div>
        <div>
          <input
            name="containerHeight"
            value={formik.values?.containerHeight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Example : 500"
            type="text"
            className="w-full tracking-wider placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* PDF Page Render Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            PDF Page Render Size
          </h5>

          <p className="text-[#999] text-xs">
            Choose the size of image to be generated.
          </p>
        </div>
        <div>
          <select
            name="pdfPageRenderSize"
            value={formik.values?.pdfPageRenderSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>1024</option>
            <option value={3}>1400</option>
            <option value={4}>1600</option>
            <option value={5}>1800</option>
            <option value={6}>2048</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Auto Enable Sound */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Auto Enable Sound
          </h5>

          <p className="text-[#999] text-xs">Sound will play from the start.</p>
        </div>
        <div>
          <select
            name="autoEnableSound"
            value={formik.values?.autoEnableSound}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>True</option>
            <option value={3}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Enable Download */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Enable Download
          </h5>

          <p className="text-[#999] text-xs">Enable PDF download</p>
        </div>
        <div>
          <select
            name="enableDownload"
            value={formik.values?.enableDownload}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>True</option>
            <option value={3}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Page Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Page Mode
          </h5>

          <p className="text-[#999] text-xs">
            Choose whether you want single mode or double page mode. Recommended
            Auto.
          </p>
        </div>
        <div>
          <select
            name="pageMode"
            value={formik.values?.pageMode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>Auto</option>
            <option value={3}>Single Page</option>
            <option value={4}>Double Page</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Single Page Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Single Page Mode
          </h5>

          <p className="text-[#999] text-xs">
            Choose how the single page will behave. If set to Auto, then in
            mobiles single page mode will be in Booklet mode.
          </p>
        </div>
        <div>
          <select
            name="singlePageMode"
            value={formik.values?.singlePageMode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>Auto</option>
            <option value={3}>Normal Size</option>
            <option value={4}>Booklet Mode</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* controls Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            controls Position
          </h5>

          <p className="text-[#999] text-xs">
            Choose where you want to display the controls bar or not display at
            all.
          </p>
        </div>
        <div>
          <select
            name="controlsPosition"
            value={formik.values?.controlsPosition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>Bottom</option>
            <option value={3}>Top</option>
            <option value={4}>Hidden</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Direction
          </h5>

          <p className="text-[#999] text-xs">Left to Right or Right to Left.</p>
        </div>
        <div>
          <select
            name="direction"
            value={formik.values?.direction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Left to Right</option>
            <option value={2}>Right to Left</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Force Page Fit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Force Page Fit
          </h5>

          <p className="text-[#999] text-xs">
            Choose if you want to force the pages to stretch and fit the page
            size.
          </p>
        </div>
        <div>
          <select
            name="forcePageFit"
            value={formik.values?.forcePageFit}
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

      {/* Enable AutoPlay */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Enable AutoPlay
          </h5>

          <p className="text-[#999] text-xs">Enable AutoPlay in Flipbook</p>
        </div>
        <div>
          <select
            name="enableAutoplay"
            value={formik.values?.enableAutoplay}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>True</option>
            <option value={3}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* AutoPlay Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            AutoPlay Duration
          </h5>

          <p className="text-[#999] text-xs">
            Time in milliseconds eg:
            <code className="bg-gray-200 mx-1 px-1">1000</code> for 1 second
          </p>
        </div>
        <div>
          <input
            name="autoplayDuration"
            value={formik.values?.autoplayDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Example : 5000"
            type="text"
            className="w-full placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Enable AutoPlay Automatically */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Enable AutoPlay Automatically
          </h5>

          <p className="text-[#999] text-xs">
            Enable AutoPlay automatically when flipbook loads
          </p>
        </div>
        <div>
          <select
            name="enableAutoplayAutomatically"
            value={formik.values?.enableAutoplayAutomatically}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Global Setting</option>
            <option value={2}>True</option>
            <option value={3}>False</option>
          </select>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Page Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
        <div className="flex flex-col">
          <h5 className="text-[14px] text-[#33373a] font-semibold">
            Page Size
          </h5>

          <p className="text-[#999] text-xs">
            Choose whether Layout is single page mode or double internal.
            Recommended Auto if PDF file
          </p>
        </div>
        <div>
          <select
            name="pageSize"
            value={formik.values?.pageSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          >
            <option value={1}>Auto</option>
            <option value={2}>Single</option>
            <option value={3}>Double Internal Page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DFlipLayout;
