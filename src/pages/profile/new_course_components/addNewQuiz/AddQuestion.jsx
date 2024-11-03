import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import CustomTextInput from "../../../../components/ui/CustomTextInput";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import QuestionTypes from "./QuestionTypes";
import CustomCheckbox from "../../../../components/ui/CustomCheckbox";
import { CustomButton } from "../../../../components/ui/CustomButton";
import Question from "./Question";

const AddQuestion = ({ formik, setAddQuestionMode }) => {
  const [showQuestionDetails, setShowQuestionDetails] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    // id: Math.random() * 10000,
    questionTitle: "",
    questionType: 1,
    isAnswerRequired: false,
    isRandomized: true,
    points: 0,
    displayPoints: true,
    questionDescription: "",
    qoptions: [
      {
        option: "",
        isAnswer: false,
      },
    ],
  });

  const [questionError, setQuestionError] = useState({
    questionTitle: "",
    points: "",
  });

  const [addQuestions, setAddQuestions] = useState([]);

  const addQuestionHandler = () => {
    formik.setFieldValue("questions", [
      ...formik.values?.questions,
      {
        questionTitle: "",
        questionType: 1,
        isAnswerRequired: false,
        isRandomized: true,
        points: 0,
        displayPoints: true,
        questionDescription: "",
        qoptions: [
          {
            option: "",
            isAnswer: false,
          },
        ],
      },
    ]);
  };

  const handleAddQuestion = () => {
    if (newQuestion.questionTitle === "") {
      setQuestionError({
        ...questionError,
        questionTitle: "Question Title is required.",
      });
    } else if (newQuestion.points === "") {
      setQuestionError({
        ...questionError,
        points: "Question Point/s is required.",
      });
    } else {
      formik.setFieldValue("questions", [
        ...formik.values.questions,
        newQuestion,
      ]);
      setShowQuestionDetails(false);
      setAddQuestionMode(false);
      setNewQuestion({
        id: Math.random() * 10000,
        questionTitle: "",
        questionType: 1,
        isAnswerRequired: false,
        isRandomized: true,
        points: 0,
        displayPoints: true,
        questionDescription: "",
        qoptions: [
          {
            option: "",
            isAnswer: false,
          },
        ],
      });
    }
  };

  const questionHandleChange = (field, value) => {
    setNewQuestion({ ...newQuestion, [field]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formik.values.questions];
    updatedQuestions[index][field] = value;
    formik.setFieldValue("questions", updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, field, value) => {
    const updatedQuestions = [...formik.values.questions];
    updatedQuestions[qIndex].qoptions[optIndex][field] = value;
    formik.setFieldValue("questions", updatedQuestions);
  };

  const removeSingleQuestionHandler = (id) => {
    const currentQuestions = [...formik.values?.questions];
    const newQuestions = currentQuestions.filter(
      (question) => question?.id !== id
    );

    formik.setFieldValue("questions", newQuestions);
  };

  return (
    <div>
      {/* Question */}
      <div>
        {!showQuestionDetails ? (
          <>
            {/* questions list */}
            <div className="my-5">
              {formik.values.questions.map((question, index) => (
                <Question
                  removeSingleQuestionHandler={removeSingleQuestionHandler}
                  key={index}
                  question={question}
                />
              ))}
            </div>

            {/* add question button */}
            <div className="my-6">
              <CustomButton
                onClick={() => {
                  setShowQuestionDetails(true);
                  setAddQuestionMode(true);
                }}
                variant="outlined"
                type="button"
              >
                Add question
              </CustomButton>
            </div>
          </>
        ) : (
          <div>
            {/* back button */}
            <div className="mb-6 flex justify-start">
              <div
                onClick={() => {
                  setShowQuestionDetails(false);
                  setAddQuestionMode(false);
                }}
                className="text-gray-600 flex items-center gap-2 cursor-pointer hover:text-gray-700 transition-colors"
              >
                <FaArrowLeftLong size={16} />
                Back
              </div>
            </div>
            {/* question title */}
            <div>
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Write your question here
              </h4>
              <CustomTextInput
                name="questionTitle"
                placeholder="question"
                value={newQuestion.questionTitle}
                onChange={(e) => {
                  questionHandleChange("questionTitle", e.target.value);
                }}
                onBlur={formik.handleBlur}
                error={
                  questionError.questionTitle ? questionError.questionTitle : ""
                }
                onInput={() =>
                  setQuestionError({
                    ...questionError,
                    questionTitle: "",
                  })
                }
              />
            </div>

       
            {/* question type */}
            <div className="mt-6">
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Select your question type
              </h4>
              <QuestionTypes
                questionHandleChange={questionHandleChange}
                name="questionType"
                formik={formik}
              />
            </div>

            {/*  -------Points , Answer required and rendomize-----------*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-7 mt-10">
              <div className="flex items-center gap-3">
                <CustomCheckbox
                  name="isAnswerRequired"
                  checked={newQuestion?.isAnswerRequired.isAnswerRequired}
                  onChange={(e) =>
                    questionHandleChange("isAnswerRequired", e.target.checked)
                  }
                />
                <span className="text-[13px] text-gray-600">
                  Answer Required
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CustomCheckbox
                  name="isRandomized"
                  checked={newQuestion?.isRandomized.isRandomized}
                  onChange={(e) =>
                    questionHandleChange("isRandomized", e.target.checked)
                  }
                />
                <span className="text-[13px] text-gray-600">Randomize</span>
              </div>

              <label>
                <h4 className="text-gray-700 text-sm font-semibold mb-3">
                  Point(s) for this answer
                </h4>
                <CustomTextInput
                  name="points"
                  value={newQuestion.points}
                  onChange={(e) =>
                    questionHandleChange("points", e.target.value)
                  }
                  error={questionError.points ? questionError.points : ""}
                  onInput={() =>
                    setQuestionError({
                      ...questionError,
                      points: "",
                    })
                  }
                  placeholder="1.00"
                />
     
              </label>
              <div className="flex items-center gap-3">
                <CustomCheckbox
                  name="displayPoints"
                  checked={formik?.values?.displayPoints}
                  onChange={(e) =>
                    questionHandleChange("displayPoints", e.target.checked)
                  }
                />
                <span className="text-[13px] text-gray-600">
                  Display Points
                </span>
              </div>
            </div>

            {/* Descripton  */}
            <div className="mt-10">
              <h4 className="text-gray-700 text-sm font-semibold mb-3">
                Description (Optional)
              </h4>
              <CustomTextArea
                name="questionDescription"
                value={newQuestion.questionDescription}
                onChange={(e) => {
                  questionHandleChange("questionDescription", e.target.value);
                }}
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
                  className="flex justify-between items-center bg-white w-full gap-1 border border-gray-300 px-6 py-3 rounded-md cursor-pointer text-gray-600"
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
                  className="flex items-center justify-between bg-white w-full gap-1 border border-gray-300 px-6 py-3 rounded-md cursor-pointer text-gray-600"
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

            {/* add question button */}
            <div className="mt-10 mb-6 w-full flex justify-end">
              <CustomButton
                type="button"
                onClick={handleAddQuestion}
                variant="outlined"
                size="sm"
              >
                Add question
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
