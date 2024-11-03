import { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiSettings5Fill,
} from "react-icons/ri";
import { motion } from "framer-motion";

import CustomCheckbox from "../../../../components/ui/CustomCheckbox";
import CustomTextInput from "../../../../components/ui/CustomTextInput";

const QuizSettings = ({ formik }) => {
  const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);

  return (
    <div className="space-y-10">
      {/* time limit */}
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
      <div className="">
        <h4 className="text-gray-700 text-sm font-semibold mb-3">
          Quiz Feedback Mode
        </h4>
        <p className="mt-3 text-sm text-gray-500 mb-2">
          Pick the quiz system"s behaviour on choice based questions.
        </p>

        <div className="flex flex-col items-center gap-2 w-full">
          <label
            htmlFor="defaultMode"
            className="flex items-center space-x-4 bg-white w-full border border-gray-400 px-2 py-3 rounded-md cursor-pointer text-gray-600"
          >
            <input
              name="quizFeedbackModeId"
              id="defaultMode"
              checked={Number(formik.values.quizFeedbackModeId) === 1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="1"
              type="radio"
              className="scale-110"
            />
            <div className="flex flex-col leading-6">
              <span>Default</span>
              <p className="text-xs text-gray-600">
                Answers shown after quiz is finished
              </p>
            </div>
          </label>
          <label
            htmlFor="revealMode"
            className="flex items-center space-x-4 bg-white w-full gap-1 border border-gray-400 px-2 py-3 rounded-md cursor-pointer text-gray-600"
          >
            <input
              name="quizFeedbackModeId"
              id="revealMode"
              checked={Number(formik.values.quizFeedbackModeId) === 2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="2"
              type="radio"
              className="scale-110"
            />
            <div className="flex flex-col leading-6">
              <span>Reveal Mode</span>
              <p className="text-xs text-gray-600">
                Show result after the attempt.
              </p>
            </div>
          </label>

          <label
            htmlFor="retryMode"
            className="flex items-center space-x-4 bg-white w-full gap-1 border border-gray-400 px-2 py-3 rounded-md cursor-pointer text-gray-600"
          >
            <input
              name="quizFeedbackModeId"
              id="retryMode"
              checked={Number(formik.values.quizFeedbackModeId) === 3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="3"
              type="radio"
              className="scale-110"
            />
            <div className="flex flex-col leading-6">
              <span>Retry Mode</span>
              <p className="text-xs text-gray-600">
                Reattempt quiz any number of times. Define Attempts Allowed
                below.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* attempts allow */}
      <div className="">
        <h4 className="text-gray-700 text-sm font-semibold mb-3">
          Attempts Allowed
        </h4>
        <div className="mt-2 bg-white py-3 px-3 border border-gray-300 rounded-lg flex items-center gap-5 justify-between">
          <input
            id="minmax-range"
            type="range"
            min="0"
            max="20"
            value={formik.values?.attemptsAllowed}
            onChange={(e) =>
              formik.setFieldValue("attemptsAllowed", e.target.value)
            }
            class="h-2 w-[90%] rounded-lg appearance-none cursor-pointer bg-blue-accent"
          />
          <div className="w-[35px] h-[30px] relative bg-blue-accent rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {formik.values?.attemptsAllowed}
            </span>
            <div className="absolute size-[12px] bg-blue-accent top-1/2 -translate-y-1/2 -left-[6px] rotate-45"></div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500 mb-2">
          Restriction on the number of attempts a student is allowed to take for
          this quiz. 0 for no limit.
        </p>
      </div>

      {/* passing grade */}

      <div className="">
        <h4 className="text-gray-700 text-sm font-semibold mb-3">
          Passing Grade (%)
        </h4>
        <div className="mt-2 bg-white py-3 px-3 border border-gray-300 rounded-lg flex items-center gap-5 justify-between">
          <input
            name="passingGrade"
            type="number"
            value={formik.values?.passingGrade}
            onChange={formik.handleChange}
            className="w-full border-none outline-none"
          />
        </div>
        <p className="mt-3 text-sm text-gray-500 mb-2">
          Set the passing percentage for this quiz
        </p>
      </div>

      {/* max questions allowed to answer */}
      <div className="">
        <h4 className="text-gray-700 text-sm font-semibold mb-3">
          Max Question Allowed to Answer
        </h4>
        <div className="mt-2 bg-white py-3 px-3 border border-gray-300 rounded-lg flex items-center gap-5 justify-between">
          <input
            name="maxQuestionsAllowedToAnswer"
            type="number"
            value={formik.values?.maxQuestionsAllowedToAnswer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-none outline-none"
          />
        </div>
        <p className="mt-3 text-sm text-gray-500 mb-2">
          This amount of question will be available for students to answer, and
          question will comes randomly from all available questions belongs with
          a quiz, if this amount is greater than available question, then all
          questions will be available for a student to answer.
        </p>
      </div>

      {/* advanced setting */}
      <div className="">
        <div
          onClick={() => setShowAdvancedSetting((prev) => !prev)}
          className="flex cursor-pointer items-center justify-between bg-white px-6 py-3 rounded-md shadow-sm"
        >
          <div className="flex items-center gap-5 text-gray-600 text-lg font-semibold">
            <span className="bg-[rgba(0,124,186,0.15)] p-1 rounded-full">
              <RiSettings5Fill size={24} className="text-blue-accent" />
            </span>
            Advance Settings
          </div>
          <div className="cursor-pointer">
            {showAdvancedSetting ? (
              <RiArrowUpSLine size={29} className="text-blue-accent" />
            ) : (
              <RiArrowDownSLine size={29} className="text-blue-accent" />
            )}
          </div>
        </div>

        {/* drop down */}
        {showAdvancedSetting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.1,
           
            }}
            className="space-y-10 bg-white p-5 border-t border-gray-300"
          >
            {/* quiz auto start */}
            <div>
              <div className="flex items-center gap-3">
                <CustomCheckbox
                  name="quizAutoStart"
                  checked={formik?.values?.quizAutoStart}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "quizAutoStart",
                      e.target.checked === "on"
                    );
                  }}
                />

                <span className="text-[13px] text-gray-600">
                  Quiz Auto Start
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-500 mb-2">
                If you enable this option, the quiz will start automatically
                after the page is loaded.
              </p>
            </div>

            {/* question layout && question order */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="">
                <h4 className="text-gray-700 text-sm font-semibold mb-3">
                  Question Layout
                </h4>
                <select
                  name="quizLayoutId"
                  value={formik.value?.quizLayoutId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2 w-full sm:w-[300px] hover:border-blue-accent hover:text-blue-accent focus:border-blue-accent transition-all hover:cursor-pointer pl-2 border border-gray-300 rounded-lg bg-white outline-blue-500"
                >
                  <option value="1">Set question layout view</option>
                  <option value="2">Single question</option>
                  <option value="3">Question Pagination</option>
                  <option value="4">Question below each other</option>
                </select>
              </div>

              <div>
                <h4 className="text-gray-700 text-sm font-semibold mb-3">
                  Questions Order
                </h4>
                <select
                  name="questionsOrderId"
                  value={formik.value?.questionsOrderId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-2 w-full sm:w-[300px] hover:border-blue-accent hover:text-blue-accent focus:border-blue-accent transition-all hover:cursor-pointer pl-2 border border-gray-300 rounded-lg bg-white outline-blue-500"
                >
                  <option value="1">Random</option>
                  <option value="2">Sorting</option>
                  <option value="3">Ascending</option>
                  <option value="4">Descending</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <CustomCheckbox
                  name="hideQuestionNumber"
                  checked={formik?.values?.hideQuestionNumber}
                  onChange={(e) =>
                    formik.setFieldValue("hideQuestionNumber", e.target.checked)
                  }
                />
                <span className="text-[13px] text-gray-600">
                  Hide question number
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-500 mb-2">
                Show/hide question number during attempt.
              </p>
            </div>

            <div className="">
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Short answer characters limit
              </h4>
              <div className="w-full sm:w-[300px] mt-2 bg-white py-3 px-3 border border-gray-300 rounded-lg flex items-center gap-5 justify-between">
                <input
                  name="shortAnswerCharactersLimit"
                  type="number"
                  value={formik.values?.shortAnswerCharactersLimit}
                  onChange={formik.handleChange}
                  className="w-full border-none outline-none"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500 mb-2">
                Student will place answer in short answer question type within
                this characters limit.
              </p>
            </div>

            <div className="">
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Open-Ended/Essay questions answer character limit
              </h4>
              <div className="w-full sm:w-[300px] mt-2 bg-white py-3 px-3 border border-gray-300 rounded-lg flex items-center gap-5 justify-between">
                <input
                  name="openEndedEssayQuestionsAnswerCharactersLimit"
                  type="number"
                  value={
                    formik.values?.openEndedEssayQuestionsAnswerCharactersLimit
                  }
                  onChange={formik.handleChange}
                  className="w-full border-none outline-none"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500 mb-2">
                Students will place the answer in the Open-Ended/Essay question
                type within this character limit.
              </p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default QuizSettings;
