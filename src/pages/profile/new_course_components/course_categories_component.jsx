import { useEffect, useState } from "react";
import NewCourceCard from "./new_cource_card";
// import RichTextExample from "./editor/editor_component";
import { motion } from "framer-motion";
import BootstrapTabs from "../../../common/bootstrap_tabs";
import TreeChildCategory from "../../../components/TreeChildCategory";
import { useDispatch, useSelector } from "react-redux";
import { getGroupCategory } from "../../../redux/features/groupSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CourseCategoriesComponent = ({ formik }) => {
  const [checked, setChecked] = useState(false);
  const [categoriesType, setCategoriesType] = useState("All Categories");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { groupCategories, getCategoryLoading } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(getGroupCategory({ axiosPrivate }));
  }, []);
  return (
    <NewCourceCard title={"Course Categories"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <BootstrapTabs
          current_tab={categoriesType}
          onClick={(item) => setCategoriesType(item)}
          items={[{ title: "All Categories" }, { title: "Most Used" }]}
        />
        <div className="flex flex-col gpa-2 py-6 px-4 rounded-none border border-[#c7c7c7] w-full">
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <input
              type="checkbox"
              value={`${checked}`}
              id={`${checked}`}
              name={`${checked}`}
              checked={checked}
              className="w-4 h-4 rounded-sm bg-white text-blue-500"
              onChange={() => setChecked((prev) => !prev)}
            />
            <label
              style={{ color: "black", marginLeft: 6, fontSize: 13 }}
              htmlFor={`${checked}`}
            >
              Top Courses
            </label>
          </div>
          <div className="pl-4 lg:pl-0  w-[80%] lg:w-full pb-8 mt-3">
            <TreeChildCategory
              page="posts"
              // loading={getCategoryLoading}
              data={groupCategories}
              setCategory={formik.setFieldValue}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>
        {/* <RichTextExample /> */}
      </div>
    </NewCourceCard>
  );
};

export default CourseCategoriesComponent;
