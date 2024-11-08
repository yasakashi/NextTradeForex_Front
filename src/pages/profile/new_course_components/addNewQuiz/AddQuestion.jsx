import { useFormik } from "formik";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import QuestionTypes from "./QuestionTypes";
import CustomCheckbox from "../../../../components/ui/CustomCheckbox";

const AddQuestion = ({ formik }) => {
  return (
    <div>
      {/* Question */}
      <div>
        <div>
          {/* question title */}
          <div>
            <h4 className="text-gray-700 text-sm font-semibold mb-3">
              Write your question here
            </h4>
            <CustomTextInput
              name="quizTitle"
              placeholder="question"
              value={formik.values?.quizTitle}
              onChange={(e) => {
                formik.setFieldValue("quizTitle", e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.quizTitle ? formik.errors.quizTitle : ""}
            />
          </div>

          {/* question type */}
          <div className="mt-6">
            <h4 className="text-gray-700 text-sm font-semibold mb-3">
              Select your question type
            </h4>
            <QuestionTypes name="questionType" formik={formik} />
          </div>

          {/*  -------Answer required and rendomize-----------*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7 mt-10">
            <div className="flex items-center gap-3">
              <CustomCheckbox
                name="isAnswerRequired"
                checked={formik?.values?.isAnswerRequired}
                onChange={(e) =>
                  formik.setFieldValue("isAnswerRequired", e.target.checked)
                }
              />
              <span className="text-[13px] text-gray-600">Answer Required</span>
            </div>

            <div className="flex items-center gap-3">
              <CustomCheckbox
                name="isRandomized"
                checked={formik?.values?.isRandomized}
                onChange={(e) =>
                  formik.setFieldValue("isRandomized", e.target.checked)
                }
              />
              <span className="text-[13px] text-gray-600">Randomize</span>
            </div>

            <label>
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Points(s) for this answer
              </h4>
              <CustomTextInput
                name="points"
                value={formik.values.points}
                onChange={formik.handleChange}
                placeholder="1.00"
              />
            </label>
            <div className="flex items-center gap-3">
              <CustomCheckbox
                name="displayPoints"
                checked={formik?.values?.displayPoints}
                onChange={(e) =>
                  formik.setFieldValue("displayPoints", e.target.checked)
                }
              />
              <span className="text-[13px] text-gray-600">Display Points</span>
            </div>
          </div>

          {/* Descripton  */}
          <div className="mt-10">
            <h4 className="text-gray-700 text-sm font-semibold mb-3">
              Description (Optional)
            </h4>
            <CustomTextArea
              name="questionDescription"
              value={formik.values?.questionDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-[80px]"
            />
          </div>

          {/* input options */}

          <div className="mt-10">
            <h4 className="text-gray-700 text-sm font-semibold mb-3">
              Input options for the question and select the correct answer.
            </h4>

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
      </div>
    </div>
  );
};

export default AddQuestion;
