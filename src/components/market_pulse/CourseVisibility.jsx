function CourseVisibility({ isVisible, onVisibilityChange }) {
  const handleVisibilityChange = (value) => {
    onVisibilityChange(value);
  };

  return (
    <div className="rounded-sm bg-white p-[30px]">
      <h1 className="font-bold text-sm">Visibility</h1>

      <label>
        <input
          type="radio"
          name="visibilityRadioGroup"
          checked={isVisible}
          onChange={() => handleVisibilityChange(true)}
        />
        Visible
      </label>

      <label className="ml-[20px]">
        <input
          type="radio"
          name="visibilityRadioGroup"
          checked={!isVisible}
          onChange={() => handleVisibilityChange(false)}
        />
        Invisible
      </label>
    </div>
  );
}

export default CourseVisibility;
