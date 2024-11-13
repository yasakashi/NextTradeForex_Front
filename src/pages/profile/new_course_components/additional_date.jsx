import React, { useEffect, useState } from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField from "../../../common/custom_text_field";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../components/ui/CustomTextInput";

const AdditionalDate = ({ formik }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    formik.setFieldValue("courseDuration", totalMinutes);
  }, [hours, minutes]);

  return (
    <NewCourceCard title="Additional Data">
      <div className="flex w-full flex-col p-4 space-y-8">
        {/* What Will I learn */}
        <div>
          <label className="">What will I learn ?</label>
          <CustomTextArea
            name="whatWillILearn"
            value={formik?.values?.whatWillILearn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched?.whatWillILearn && formik.errors.whatWillILearn
                ? formik?.errors?.whatWillILearn
                : ""
            }
            className="mt-2 resize-none h-[100px] placeholder:text-sm"
            placeholder="Write here the course benefits (One per line)"
          />
        </div>

        {/* Target Audiences */}
        <div>
          <label className="">Targeted Audience</label>
          <CustomTextArea
            name="targetedAudience"
            value={formik?.values?.targetedAudience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched?.targetedAudience
                ? formik?.errors?.targetedAudience
                : ""
            }
            className="mt-2 resize-none h-[100px] placeholder:text-sm"
            placeholder="Write here the course benefits (One per line)"
          />
        </div>

        {/* total course duration */}
        <div>
          <label>Total Course Duration</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <CustomTextInput
                type="number"
                placeholder="00"
                style={{ width: 250, marginRight: 24 }}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <span className="text-gray-600 text-sm mt-2 font-medium">
                Hour
              </span>
            </div>
            <div className="flex flex-col w-full">
              <CustomTextInput
                type="number"
                placeholder="00"
                style={{ width: 250, marginRight: 24 }}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <span className="text-gray-600 text-sm mt-2 font-medium">
                Minute
              </span>
            </div>
          </div>
        </div>

        {/* Material included */}
        <div>
          <label className="">Materials Included</label>
          <CustomTextArea
            name="materialsIncluded"
            value={formik?.values?.materialsIncluded}
            onChange={formik.handleChange}
            error={formik?.errors?.materialsIncluded}
            className="mt-2 resize-none h-[100px] placeholder:text-sm"
            placeholder="Write here the course benefits (One per line)"
          />
        </div>

        {/* Requirements/Instructions*/}
        <div>
          <label className="">Requirements/Instructions</label>
          <CustomTextArea
            name="requirementsInstructions"
            value={formik?.values?.requirementsInstructions}
            onChange={formik.handleChange}
            error={formik?.errors?.requirementsInstructions}
            className="mt-2 resize-none h-[100px] placeholder:text-sm"
            placeholder="Write here the course benefits (One per line)"
          />
        </div>

        {/* <p style={{ fontWeight: 600, fontSize: 16 }}>Course Date Range</p>

        <div className="flex w-full flex-row mt-3">
          <CustomTextField
            helper_text="Start Date"
            placeHolder=""
            style={{ width: 250, marginRight: 24 }}
          />
          <CustomTextField
            helper_text="End Date"
            type="date"
            placeHolder=""
            style={{ width: 250, marginRight: 24 }}
          />
        </div> */}

        {/* <div className="flex justify-between w-64 mb-3">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Allow Download :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between w-64 mb-3">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Is Admin Accepted :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex justify-between w-64">
          <p style={{ fontWeight: 600, fontSize: 16, marginRight: 16 }}>
            Is Pre Lesson :
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div> */}
      </div>
    </NewCourceCard>
  );
};

export default AdditionalDate;
