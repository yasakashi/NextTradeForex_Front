import { VscColorMode } from "react-icons/vsc";
import { FaCheck, FaCheckDouble } from "react-icons/fa6";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";

const types = [
  {
    id: 1,
    name: "True/False",
    Icon: <VscColorMode />,
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    name: "Single Choice",
    Icon: <FaCheck />,
    bgColor: "bg-[#00b890]",
  },

  {
    id: 3,
    name: "Multiple Choice",
    Icon: <FaCheckDouble />,
    bgColor: "bg-[#9034a9]",
  },
];

const QuestionTypes = ({ formik }) => {
  const [showTypes, setShowTypes] = useState(false);

  const [selectedType, setSelectedType] = useState({
    id: 1,
    name: "True/False",
    Icon: <VscColorMode />,
    bgColor: "bg-blue-600",
  });

  return (
    <div className="">
      <div
        onClick={() => {
          setShowTypes((prev) => !prev);
        }}
        className="w-full cursor-pointer bg-white mb-3 px-3 py-2 flex items-center justify-between"
      >
        <div
          key={selectedType.id}
          className="flex items-center  w-max gap-2 hover:border-blue-500 transition-colors"
        >
          <div className={`${selectedType.bgColor} p-[5px] rounded-[3px]`}>
            <selectedType.Icon.type className="text-2xl text-white" />
          </div>
          <span className="text-sm text-gray-700 pr-3">
            {selectedType.name}
          </span>
        </div>
        <div>
          {showTypes ? (
            <IoIosArrowUp className="text-gray-700" size={18} />
          ) : (
            <IoIosArrowDown className="text-gray-700" size={18} />
          )}
        </div>
      </div>

      {showTypes ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full bg-white rounded-sm p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {types.map((type) => (
              <div
                onClick={() => {
                  formik?.setFieldValue("questionType", type.id);
                  setSelectedType(type);
                  setShowTypes(false);
                }}
                key={type.id}
                className="flex items-center gap-2 border border-gray-300 p-[7px] rounded-[4px] cursor-pointer hover:border-blue-500 transition-colors"
              >
                <div className={`${type.bgColor} p-[5px] rounded-[3px]`}>
                  <type.Icon.type className="text-2xl text-white" />
                </div>
                <span className="text-xs text-nowrap text-gray-700 pr-3">
                  {type.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default QuestionTypes;
