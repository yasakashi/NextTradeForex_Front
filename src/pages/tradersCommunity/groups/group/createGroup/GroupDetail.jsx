const GroupDetail = ({
  setTitle,
  setDescription,
  description,
  title,
  titleError,
  descriptionError,
  setErrors,
  errors,
}) => {
  return (
    <>
      <label className="flex flex-col justify-start w-full">
        <span className="text-sm mb-2 bg-blue-light text-white rounded-md w-max px-2 py-1">
          Group Name: (required)
        </span>
        <input
          value={title}
          onInput={(e) => setErrors({ ...errors, title: "" })}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 placeholder:text-sm py-2 text-gray-600 rounded-lg border w-full outline-blue-light"
          type="text"
          placeholder="Group name"
        />
        <span className="text-red-600 text-[13px] p-1">{titleError}</span>
      </label>

      <label className="flex flex-col justify-start w-full">
        <span className="text-sm mb-2 bg-blue-light text-white rounded-md w-max px-2 py-1">
          Description: (required)
        </span>
        <textarea
          value={description}
          onInput={(e) => setErrors({ ...errors, description: "" })}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Group Description"
          className="w-full mt-1 placeholder:text-sm text-gray-600 rounded-lg border p-2 outline-blue-light"
        />
        <span className="text-red-600 text-[13px] p-1">{descriptionError}</span>
      </label>
    </>
  );
};

export default GroupDetail;
