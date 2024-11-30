import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetMainCategoriesByInfoMutation } from "../../redux/features/categories/categoriesApi.js";
import LTRCard from "../../components/learnToTrade/LTRCard.jsx";

const LearnToTradeSubCategories = () => {
  const location = useLocation();
  const { level, categoryName } = useParams();
  const { categoryId, levelId } = location.state || {};
  console.log({ levelId }, "level id");
  const [
    getMainCategoriesByInfo,
    { data, error, isLoading: getCategoriesLoading },
  ] = useGetMainCategoriesByInfoMutation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        await getMainCategoriesByInfo({ parentId: categoryId }).unwrap();
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchCategories();
  }, [getMainCategoriesByInfo]);

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!getCategoriesLoading && (
          <motion.div
            key={`${getCategoriesLoading}`}
            className="flex mt-12 flex-wrap items-center"
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {data?.length > 0 &&
              data?.map((subCategory, index) => (
                <LTRCard
                  key={index}
                  img={subCategory?.categoryimagefilepath}
                  title={subCategory?.name}
                  description={subCategory?.description}
                  // /learn_to_trade/:level/:categoryName
                  linkTo={() =>
                    navigate(
                      `/learn_to_trade/${level}/${categoryName}/${subCategory?.name
                        ?.split(" ")
                        .join("-")}`,
                      {
                        state: {
                          subCategoryId: subCategory?.id,
                          levelId: levelId,
                        },
                      }
                    )
                  }
                />
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

export default LearnToTradeSubCategories;
