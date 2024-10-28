import NewCourceCard from "./new_cource_card";

const authors = [
  { id: 1, name: "amir" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "user" },
  { id: 4, name: "author" },
];

const CourseAuthor = ({formik}) => {
  return (
    <NewCourceCard title="Author">
      <div className="p-4 w-full ">
        <select
          name="authorId"
          value={formik.values?.authorId}
          onChange={formik.handleChange}
          className="w-full sm:w-[50%] bg-transparent border border-gray-400 py-[2px] rounded-sm pl-2 outline-blue-500"
        >
          {authors?.map((author, index) => (
            <option key={index} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
    </NewCourceCard>
  );
};

export default CourseAuthor;
