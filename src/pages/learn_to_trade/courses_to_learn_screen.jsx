import React, { useEffect } from "react";
// import useCategories from "../../admin_panel/pages/categories/hook/use_categories";
import { DetailsCart } from "../../admin_panel/pages/categories/view/category_details_view_screen.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/features/course/courseApii.js";
import CourseCard from "../../admin_panel/pages/categories/view/components/CourseCard.jsx";
import { useGetCategoriesMutation } from "../../redux/features/categories/categoriesApi.js";
import CategoryCard from "../../components/learnToTrade/CategoryCard.jsx";

const CoursesToLearnScreen = () => {
  const { level, levelId } = useParams();

  const [getCategories, { data, error, isLoading: getCategoriesLoading }] =
    useGetCategoriesMutation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        await getCategories().unwrap();
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchCategories();
  }, [getCategories]);

  const navigate = useNavigate();
  return (
    <div className="w-full">
      {console.log("========> categories", data?.slice(0, 15))}
      <AnimatePresence mode="wait">
        {!getCategoriesLoading && (
          <motion.div
            key={`${getCategoriesLoading}`}
            className="flex mt-12 flex-wrap items-center"
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* {courses?.map((course, index) => {
              return <CourseCard key={index} course={course} />;
            })} */}
            {data?.length > 0 &&
              data
                ?.slice(0, 15)
                ?.map((category, index) => (
                  <CategoryCard category={category} key={index} />
                ))}
          </motion.div>
        )}
        {getCategoriesLoading && (
          <motion.div
            key={`${getCategoriesLoading}`}
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: "100%",
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              style={{
                width: 80,
                height: 80,
                border: "5px solid white",
                alignSelf: "center",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
              }}
              animate={{
                scale: [0.5, 1, 0.5, 1, 0.5, 1],
                rotate: [0, 270, 0, 270, 0, 270],
                borderRadius: ["20%", "50%", "20%", "50%", "20%", "50%"],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesToLearnScreen;
