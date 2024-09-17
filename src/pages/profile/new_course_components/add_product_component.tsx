import React from "react";
import NewCourceCard from "./new_cource_card";
import { AnimatePresence, motion } from "framer-motion";
import { CustomSelectBox } from "./custom_select_box";
import { PiWarningCircleDuotone } from "react-icons/pi";

const AddProductComponent = ({
  set_course_type_id,
  course_type_id,
}: {
  set_course_type_id?: (val: number) => void;
  course_type_id?: number | string;
}) => {
  const [course_type, set_course_type] = React.useState<string>("FREE");

  React.useEffect(() => {
    if (course_type_id) {
      set_course_type("PAID");
    }
  }, []);
  React.useEffect(() => {
    set_course_type_id?.(course_type === "FREE" ? 0 : 1);
  }, [course_type]);

  return (
    <NewCourceCard title="Add Product">
      <div className="p-4">
        <div className="w-full flex justify-between mb-4">
          <p className="text-base font-semibold w-1/3">Course Type</p>
          <div className="flex w-2/3">
            <div className="flex">
              <div className="flex items-center me-4">
                <input
                  id="inline-radio"
                  onChange={(e) => {
                    set_course_type(e.target.value);
                  }}
                  checked={course_type === "PAID"}
                  type="radio"
                  value="PAID"
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-10 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-radio"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Paid
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  onChange={(e) => {
                    set_course_type(e.target.value);
                  }}
                  checked={course_type === "FREE"}
                  id="inline-2-radio"
                  type="radio"
                  value="FREE"
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-500 dark:ring-offset-blue-800 focus:ring-10 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-2-radio"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Free
                </label>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="sync" initial={false}>
          {course_type === "PAID" && (
            <motion.div
              key={`${course_type}`}
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0, opacity: 0, y: 8 }}
              className="flex justify-between w-full"
              style={{}}
            >
              <div className="w-1/3 flex flex-col">
                <p className="text-base font-semibold">Select Product</p>
                <p className="text-xs mt-4 ">(When selling the course)</p>
              </div>

              <div className="w-2/3 flex flex-col">
                <CustomSelectBox />
                <div className="w-full flex items-center mt-2">
                  <PiWarningCircleDuotone />
                  <p className="text-sm ml-2">
                    Sell your product, process by WooCommerce
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NewCourceCard>
  );
};

export default AddProductComponent;
