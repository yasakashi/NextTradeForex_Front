import { useState } from "react";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import DFlipSource from "./DflipSource";
import DFlipLayout from "./DFlipLayout";

const activeClass = "bg-[#0085ba]";

const DflipSettings = () => {
  const [activeTab, setActiveTab] = useState("source");

  return (
    <NewCourceCard title="dFlip Settings">
      <div className="flex items-center gap-3 w-full bg-[#0295d0] text-gray-100 font-medium px-4">
        <div
          onClick={() => setActiveTab("source")}
          className={`px-2 pb-[6px] pt-3 text-sm cursor-pointer ${
            activeTab === "source" ? activeClass : ""
          }`}
        >
          Source
        </div>
        <div
          onClick={() => setActiveTab("layout")}
          className={`px-2 pb-[6px] pt-3 text-sm cursor-pointer ${
            activeTab === "layout" ? activeClass : ""
          }`}
        >
          Layout
        </div>
        <div
          onClick={() => setActiveTab("outline")}
          className={`px-2 pb-[6px] pt-3 text-sm cursor-pointer ${
            activeTab === "outline" ? activeClass : ""
          }`}
        >
          Outline
        </div>
      </div>
      <div className="w-full p-4 flex flex-col relative space-y-8">
        {activeTab === "source" ? (
          <DFlipSource />
        ) : activeTab === "layout" ? (
          <DFlipLayout />
        ) : null}
      </div>
    </NewCourceCard>
  );
};

export default DflipSettings;
