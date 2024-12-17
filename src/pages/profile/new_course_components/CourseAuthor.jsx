import { useGetAuthorsListQuery } from "../../../redux/features/course/courseApii";
import NewCourceCard from "./new_cource_card";

const CourseAuthor = ({ formik }) => {
  const { data } = useGetAuthorsListQuery();
  return (
    <NewCourceCard title="Author">
      <div className="p-4 w-full flex flex-col gap-4">
        {console.log({data})}
        <select
          name="authorId"
          value={formik.values?.authorId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full sm:w-[50%] bg-transparent border border-gray-400 py-[2px] rounded-sm pl-2 outline-blue-500"
        >
          <option value="" disabled></option>
          {data?.messageData?.map((author, index) => (
            <option key={index} value={author.userid}>
              {author.username}
              {author?.fname && author?.lname && (
                <> ({author?.fname + " " + author?.lname})</>
              )}
            </option>
          ))}
        </select>
        {formik.touched.authorId && formik.errors.authorId ? (
          <span className="text-red-600 p-1 text-sm">
            {formik.errors.authorId}
          </span>
        ) : null}
      </div>
    </NewCourceCard>
  );
};

export default CourseAuthor;
