import { useState } from "react";
import { useGetCoursesQuery } from "../../../../redux/features/api/course/courseApii";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { IoIosArrowDown, IoMdRefresh } from "react-icons/io";
import DatePicker from "react-multi-date-picker";

const SearchFilters = ({
  selectedOption,
  setSelectedOption,
  dateValue,
  setDateValue,
  searchValue,
  setSearchValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const { data: { messageData: courses } = { messageData: [] }, isLoading } =
    useGetCoursesQuery({
      data: {
        Id: null,
        authorId: null,
        allowQA: null,
        isPublicCourse: null,
        difficultyLevelId: null,
        courseTags: "",
        courseName: "",
        pageindex: 1,
        rowcount: 21,
      },
    });

  const filteredOptions = courses.filter((course) =>
    course.courseName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-4 flex flex-col md:flex-row items-end justify-start gap-4">
      {/* bulk action */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select className="border-gray-400 rounded-md bg-white border text-sm outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-[6px] pr-[2px]">
            <option>Bulk actions</option>
            <option>Delete Permanently</option>
          </select>
          <CustomButton variant="outlined" size="sm">
            Apply
          </CustomButton>
        </div>

        <CustomButton
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2 gap-[6px] max-w-[100px]"
        >
          <IoMdRefresh size={16} />
          Reset
        </CustomButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* course name filter */}
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-gray-600 font-medium">Course</h4>
          <div>
            <div className="relative my">
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full relative bg-white border border-gray-400 rounded-md px-3 py-[6px] hover:cursor-pointer text-gray-600"
              >
                <span className="text-[13px] line-clamp-1">
                  {selectedOption?.courseName
                    ? selectedOption?.courseName
                    : "Select Course"}
                </span>
                <IoIosArrowDown
                  size={18}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 font-bold"
                />
              </div>
              {isOpen && (
                <ul className="absolute text-[13px] z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto overflow-x-hidden overscroll-y-scroll scrollbar-thin px-2 text-gray-700">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-400 rounded-md py-2 px-4 focus:outline-none my-1 mx-1 focus:border-blue-600"
                    placeholder="Search ..."
                  />
                  <li
                    onMouseDown={() => {
                      setSelectedOption("All Courses");
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    All Courses
                  </li>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onMouseDown={() => {
                          setSelectedOption(option);
                          setIsOpen(false);
                        }}
                      >
                        {option?.courseName}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      No results found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* sort by */}
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-600 font-medium">Sort By</h4>
          <select className="border-gray-400 bg-white border text-sm outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-[6px] rounded-md pr-[2px]">
            <option>DESC</option>
            <option>ASC</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-[14px] text-gray-700 ">Date</h5>
          <div className="w-full">
            <DatePicker
              format="MM/DD/YYYY"
              calendarPosition="top-right"
              inputClass="w-full block py-[6px] text-[15px] tracking-wider text-gray-600 px-3 border border-gray-400 rounded-md"
              containerClassName="w-full"
              placeholder="Y-M-d"
              value={dateValue}
              onChange={(date) => setDateValue(date.format())}
            />
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-2">
          <h5 className="font-medium text-[14px] text-gray-700 ">Search</h5>

          <div className="w-full">
            <input
              type="text"
              className="border border-gray-400 rounded-md outline-[#2271b1] active:border-[#2271b1] px-3 py-[6px] text-gray-600 w-full"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
