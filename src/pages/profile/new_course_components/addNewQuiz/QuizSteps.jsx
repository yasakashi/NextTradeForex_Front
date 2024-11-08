

const QuizSteps = ({quizOrder}) => {

  return (
    <div className="px-8 py-4 flex items-center justify-between relative">
      <div className="flex flex-col items-center justify-center">
        <div
          className={`rounded-full relative w-[30px] h-[30px] flex items-center justify-center text-sm font-semibold ${
            quizOrder >= 1
              ? "bg-blue-accent text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          1
          <span className="absolute -top-full text-gray-700 text-sm font-semibold text-nowrap">
            Quiz Info
          </span>
        </div>
      </div>

      <div
        className={`w-full h-[2px] ${
          quizOrder >= 2 ? "bg-blue-accent" : "bg-gray-300"
        } -z-10`}
      ></div>

      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative rounded-full w-[30px] h-[30px] flex items-center justify-center text-sm font-semibold ${
            quizOrder >= 2
              ? "bg-blue-accent text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          2
          <span className="absolute -top-full text-gray-700 text-sm font-semibold text-nowrap">
            Questions
          </span>
        </div>
      </div>

      <div
        className={`w-full h-[2px] ${
          quizOrder >= 3 ? "bg-blue-accent" : "bg-gray-300"
        } -z-10`}
      ></div>

      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative rounded-full w-[30px] h-[30px] flex items-center justify-center text-sm font-semibold ${
            quizOrder === 3
              ? "bg-blue-accent text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          3
          <span className="absolute -top-full text-gray-700 text-sm font-semibold text-nowrap">
            Settings
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuizSteps;