import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useFormik } from "formik";
import * as Yup from "yup";

import ModalLayout from "../../../../common/modal_layout";
import QuizInfo from "./QuizInfo";
import AddQuestion from "./AddQuestion";
import QuizSettings from "./QuizSettings";
import QuizSteps from "./QuizSteps";
import { useAddTopicQuizMutation } from "../../../../redux/features/course/courseBuilderApi";
import { useParams } from "react-router-dom";

const AddNewQuiz = ({ setShowQuizModal, showQuizModal, courseId, topicId }) => {
  const [quizOrder, setQuizOrder] = useState(1);
  const [addQuestionMode, setAddQuestionMode] = useState(false);

  const [addTopicQuiz , {isLoading: addQuizLoading}] = useAddTopicQuizMutation();

  const quizValidationSchema = Yup.object({
    quizTitle: Yup.string().required("Title is required."),
  });

  const quizInitialValues = {
    quizTitle: "",
    quizDescription: "",
    questions: [],
    timeLimit: 0,
    displayQuizTime: false,
    quizFeedbackModeId: 1,
    attemptsAllowed: 3,
    passingGrade: 80,
    maxQuestionsAllowedToAnswer: 10,
    quizAutoStart: true,
    quizLayoutId: 1,
    questionsOrderId: 1,
    hideQuestionNumber: false,
    shortAnswerCharactersLimit: 200,
    openEndedEssayQuestionsAnswerCharactersLimit: 500,
  };

  const formik = useFormik({
    initialValues: quizInitialValues,
    validationSchema: quizValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const addQuizRes = await addTopicQuiz({
        data: { ...values, courseId, topicId },
      });
      console.log({ addQuizRes });
    },
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (quizOrder < 3) {
      if (!formik.errors.quizTitle && formik.touched.quizTitle) {
        setQuizOrder(quizOrder + 1);
      }
    }
  };

  const handleBack = () => {
    if (quizOrder > 1) {
      setQuizOrder(quizOrder - 1);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalLayout
        className="w-full sm:w-[800px] xl:w-[900px] max-w-[1200px] h-[90vh] overflow-hidden flex flex-col justify-between"
        onClose={setShowQuizModal}
        open={showQuizModal}
      >
        <div className="flex w-full flex-col border-b border-gray-300">
          <div className="flex justify-between items-center py-4 px-8 w-full">
            <h4 className="font-semibold">Add Lesson</h4>
            <button onClick={() => setShowQuizModal(false)}>
              <CgClose />
            </button>
          </div>

          <QuizSteps quizOrder={quizOrder} />
        </div>

        {/* main */}
        <div className="px-10 py-6 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
          {quizOrder === 1 ? (
            <QuizInfo formik={formik} />
          ) : quizOrder === 2 ? (
            <AddQuestion
              formik={formik}
              setAddQuestionMode={setAddQuestionMode}
            />
          ) : quizOrder === 3 ? (
            <QuizSettings formik={formik} />
          ) : null}
        </div>

        <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
          <button
            type="button"
            disabled={addQuizLoading}
            onClick={() => setShowQuizModal(false)}
            className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {quizOrder > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="text-blue-accent px-4 py-[6px] hover:bg-blue-acckent hover:text-white border border-blue-accent rounded-md"
              >
                Back
              </button>
            )}
            {quizOrder < 3 ? (
              <button
                type="button"
                disabled={!formik.dirty || addQuestionMode}
                onClick={handleNext}
                className="bg-blue-accent disabled:bg-blue-accent/50 px-4 py-[6px] text-white border border-blue-accent disabled:border-blue-accent/50 rounded-md shadow-sm"
              >
                Save & Next
              </button>
            ) : (
              <button
                disabled={addQuizLoading}
                type="submit"
                className="bg-blue-accent px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm"
              >
                {addQuizLoading ? "Sending ..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </ModalLayout>
    </form>
  );
};

export default AddNewQuiz;
