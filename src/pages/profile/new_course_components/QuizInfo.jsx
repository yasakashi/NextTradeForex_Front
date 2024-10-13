const QuizInfo = () => {
  return (
    <>
      <label className="w-full flex flex-col">
        <span className="text-gray-600 text-sm font-semibold mb-3">
          Quiz Title
        </span>
        <input
          type="text"
          placeholder="Type Your quiz title here"
          className="px-4 py-[6px] border border-gray-300 rounded-md bg-white placeholder:text-gray-600 outline-blue-400"
        />
      </label>

      <div>
        <span className="text-gray-600 text-sm font-semibold mb-3">
          Summary
        </span>

        <textarea className="border resize-none rounded-md text-gray-700 border-gray-300 p-4 text-sm h-[160px] w-full outline-blue-400 mt-3"></textarea>
      </div>
    </>
  );
};

export default QuizInfo;
