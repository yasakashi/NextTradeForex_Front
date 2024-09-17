import React, { memo } from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField, {
  CustomTextArea,
} from "../../../common/custom_text_field";

const AdditionalDate = ({
  what_will_learn,
  what_will_learn_change,
  targeted_audience,
  targeted_audience_change,
  total_course_duration_hours,
  total_course_duration_minutes,
  total_course_duration_hours_change,
  total_course_duration_minutes_change,
  materials_included,
  requirements,
  materials_included_change,
  requirements_change,
  allowdownload,
  course_discription,
  course_price,
  end_date,
  is_admin_accepted,
  is_pre_lesson,
  lesson_count,
  set_allow_download,
  set_course_discription,
  set_course_price,
  set_end_date,
  set_is_admin_accepted,
  set_is_pre_lesson,
  set_lesson_count,
  set_start_date,
  start_date,
}: {
  targeted_audience?: string;
  what_will_learn?: string;
  total_course_duration_hours?: string;
  total_course_duration_minutes?: string;
  materials_included?: string;
  requirements?: string;
  what_will_learn_change?: (val?: string) => void;
  total_course_duration_minutes_change?: (val?: string) => void;
  total_course_duration_hours_change?: (val?: string) => void;
  targeted_audience_change?: (val?: string) => void;
  materials_included_change?: (val?: string) => void;
  requirements_change?: (val?: string) => void;

  course_discription?: string;
  set_course_discription?: (val: string) => void;
  course_price?: number;
  set_course_price?: (val: any) => void;
  lesson_count?: number;
  set_lesson_count?: (val: any) => void;
  start_date?: Date | string;
  set_start_date?: (val: any) => void;
  end_date?: Date | string;
  set_end_date?: (val: any) => void;
  allowdownload?: boolean;
  set_allow_download?: (val: any) => void;
  is_admin_accepted?: boolean;
  set_is_admin_accepted?: (val: any) => void;
  is_pre_lesson?: boolean;
  set_is_pre_lesson?: (val: any) => void;
}) => {
  return (
    <NewCourceCard title="Additional Data">
      <div className="flex w-full flex-col p-4">
        <CustomTextArea
          value={what_will_learn}
          set_value={(val) => {
            what_will_learn_change?.(val);
          }}
          placeHolder="Write here the course benefits (One per line)"
          label="What will I learn ?"
        />
        <br />
        <CustomTextArea
          set_value={(val) => targeted_audience_change?.(val)}
          value={targeted_audience}
          placeHolder="Specify the target audience that will benefits from the course. (One line per target audience.)"
          label="Targeted Audience"
        />
        <br />
        <p style={{ fontWeight: 600, fontSize: 16 }}>Total Course Duration</p>

        <div className="flex w-full flex-row mt-3">
          <CustomTextField
            value={total_course_duration_hours}
            onChange={(val) => total_course_duration_hours_change?.(val)}
            type="number"
            helper_text="Hour"
            placeHolder="00"
            style={{ width: 250, marginRight: 24 }}
          />
          <CustomTextField
            value={total_course_duration_minutes}
            onChange={(val) => total_course_duration_minutes_change?.(val)}
            helper_text="Minutes"
            type="number"
            placeHolder="00"
            style={{ width: 250, marginRight: 24 }}
          />
        </div>
        <br />

        <CustomTextArea
          value={materials_included}
          set_value={(val) => materials_included_change?.(val)}
          placeHolder="A list of assets you will be providing for the students in the course (One per line)"
          label="Materials Included"
        />
        <br />
        <CustomTextArea
          value={course_discription}
          set_value={(val) => set_course_discription?.(val)}
          placeHolder="Course Description"
          label="Course Description"
        />
        <br />

        <p className="" style={{ fontWeight: 600, fontSize: 16 }}>
          Course Price / Lesson Count
        </p>
        <div className="flex w-full flex-row mt-3">
          <CustomTextField
            value={`${course_price || ""}`}
            onChange={(val) => set_course_price?.(val)}
            type="number"
            placeHolder="0"
            helper_text="Price"
            style={{ width: 250, marginRight: 24 }}
          />
          <CustomTextField
            value={`${lesson_count || ""}`}
            onChange={(val) => set_lesson_count?.(val)}
            type="number"
            placeHolder="0"
            helper_text="Lesson Count"
            style={{ width: 250, marginRight: 24 }}
          />
        </div>
        <br />
        <p style={{ fontWeight: 600, fontSize: 16 }}>Course Date Range</p>

        <div className="flex w-full flex-row mt-3">
          <CustomTextField
            value={`${start_date || new Date()}`}
            onChange={(val) => set_start_date?.(val)}
            type="date"
            helper_text="Start Date"
            placeHolder=""
            style={{ width: 250, marginRight: 24 }}
          />
          <CustomTextField
            value={`${end_date || new Date()}`}
            onChange={(val) => set_end_date?.(val)}
            helper_text="End Date"
            type="date"
            placeHolder=""
            style={{ width: 250, marginRight: 24 }}
          />
        </div>
        <br />
        <CustomTextArea
          value={requirements}
          set_value={(val) => requirements_change?.(val)}
          placeHolder="Additional requirements for special instructions for the students (One per line)"
          label="Requirements/Instructions"
        />
        <br />
        <div className="flex justify-between w-64 mb-3">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Allow Download :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allowdownload}
              value=""
              className="sr-only peer"
              onChange={(e) => {
                set_allow_download?.(e.target.checked);
                e.stopPropagation();
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between w-64 mb-3">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Is Admin Accepted :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={is_admin_accepted}
              value=""
              className="sr-only peer"
              onChange={(e) => {
                set_is_admin_accepted?.(e.target.checked);
                e.stopPropagation();
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between w-64">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Is Pre Lesson :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={is_pre_lesson}
              value=""
              className="sr-only peer"
              onChange={(e) => {
                set_is_pre_lesson?.(e.target.checked);
                e.stopPropagation();
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default memo(AdditionalDate);
