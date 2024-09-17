import React from "react";
// import useCategories from "../../admin_panel/pages/categories/hook/use_categories";
import { DetailsCart } from "../../admin_panel/pages/categories/view/category_details_view_screen";
import { LoadingSpinner } from "../../common/contained_button_primary";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCourses from "../../admin_panel/pages/tutor/courses/hook/use_courses";
const CoursesToLearnScreen = () => {
  const { level } = useParams();

  const { courses, loading } = useCourses({
    search: { courseleveltypeId: Number(level) },
  });
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={`${loading}`}
            className="flex mt-12 flex-wrap items-center"
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {courses.map((item, i) => {
              return (
                <DetailsCart
                  index={i}
                  id={item.id}
                  descr={item?.coursedescription}
                  title={item?.coursename}
                  key={i}
                  onClick={() => {
                    navigate(
                      `/learn_to_trade/courses/${item?.coursename}/${item.id}`
                    );
                  }}
                />
              );
            })}
          </motion.div>
        )}
        {loading && (
          <motion.div
            key={`${loading}`}
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
