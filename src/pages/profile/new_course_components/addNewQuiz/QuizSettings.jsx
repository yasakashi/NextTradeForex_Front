import CustomCheckbox from "../../../../components/ui/CustomCheckbox";
import CustomTextInput from "../../../../components/ui/CustomTextInput";

const QuizSettings = ({ formik }) => {
  return (
    <div>
      <div>
        <h4 className="text-gray-700 text-sm font-semibold mb-3">Time Limit</h4>
        <div className="flex items-center gap-6 flex-wrap">
          <label className="w-[120px]">
            <CustomTextInput
              name="timeLimit"
              value={formik.values.timeLimit}
              onChange={formik.handleChange}
              type="number"
              className="w-full"
            />
          </label>
          <select className="w-[120px] bg-white py-[6px] text-base font-medium pl-2 text-blue-800 rounded-md border border-gray-300 focus:border-blue-700 outline-none">
            <option>Seconds</option>
            <option>Minutes</option>
            <option>Hours</option>
            <option>Days</option>
            <option>Weeks</option>
          </select>
          <div className="flex items-center gap-3">
            <CustomCheckbox
              name="displayQuizTime"
              checked={formik?.values?.displayQuizTime}
              onChange={(e) =>
                formik.setFieldValue("displayQuizTime", e.target.checked)
              }
            />
            <span className="text-[13px] text-gray-600">
              Hide quiz time - display
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Time limit for this quiz. 0 means no time limit.
        </p>
      </div>

      {/* quiz feedback mode */}
      <div className="mt-10">
        <h4 className="text-gray-700 text-sm font-semibold mb-3">
          Quiz Feedback Mode
        </h4>
        <p className="mt-3 text-sm text-gray-500">
          Pick the quiz system"s behaviour on choice based questions.
        </p>

        <div className="flex flex-col items-center gap-4 w-full">
          <label
            htmlFor="student"
            className="flex justify-between items-center  w-full gap-1 border border-gray-400 px-2 py-3 rounded-md cursor-pointer text-gray-600"
          >
            True
            <input
              name="UserTypeId"
              id="student"
              checked={Number(formik.values.UserTypeId) === 4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="4"
              type="radio"
            />
          </label>
          <label
            htmlFor="indicator"
            className="flex items-center justify-between w-full gap-1 border border-gray-400 px-2 py-3 rounded-md cursor-pointer text-gray-600"
          >
            False
            <input
              name="UserTypeId"
              id="indicator"
              checked={Number(formik.values.UserTypeId) === 3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="3"
              type="radio"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuizSettings;
