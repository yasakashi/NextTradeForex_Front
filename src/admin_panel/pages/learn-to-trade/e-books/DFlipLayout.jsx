import { useRef } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";

const DFlipLayout = () => {
  const selectPDFRef = useRef(null);

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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>WebGL 3D</option>
            <option>CSS 3D/2D</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
            placeholder="Example : #FFFFFF"
            type="text"
            className="w-full placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
          />
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
              <span className="text-gray-500 text-sm">Select a Pdf File</span>
            </div>
            <CustomButton className="text-nowrap rounded-l-none">
              Select Image
            </CustomButton>
          </div>
        </div>
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
            placeholder="Example : 1000"
            type="text"
            className="w-full placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
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
            placeholder="Example : 500"
            type="text"
            className="w-full placeholder:text-sm text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]"
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
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
          <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
            <option>Global Setting</option>
            <option>Cover Pages</option>
            <option>All Pages</option>
            <option>None</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DFlipLayout;
