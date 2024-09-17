import { Accordion, AccordionSummary, Tab, Tabs } from "@mui/material";
import React from "react";
import {
  blue_medium,
  yellow_color,
} from "../../../../../categories/view/category_details_view_screen";
import { CustomTextArea } from "../../../../../../../common/custom_text_field";
import { AnimatePresence, motion } from "framer-motion";
import { MdExpandMore } from "react-icons/md";

const CourseInfo = () => {
  const [value, set_value] = React.useState(0);
  return (
    <>
      <div
        className="w-full"
        style={{
          backgroundColor: blue_medium,
          marginTop: 16,
          border: "1px solid blue",
        }}
      >
        <Tabs
          className="text-white"
          color="white"
          TabIndicatorProps={{ style: { backgroundColor: yellow_color } }}
          value={value}
          onChange={(e, val) => {
            set_value(val);
          }}
        >
          {["Course Info", "Reviews", "Q&A"].map((item) => {
            return (
              <Tab
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  minWidth: 50,
                }}
                label={item}
                title={item}
                key={item}
                color="primary"
              />
            );
          })}
        </Tabs>
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
        style={{width:"100%",color:"white" ,marginTop:24}}
          key={value}
          initial={{ opacity: 0, y: 8 }}
          exit={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value === 2 && <QA />}
          {value === 1 && <Review />}
          {value === 0 && <Info />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CourseInfo;

const QA = () => {
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-bold text-2xl mb-4">Question & Answer</h5>
      <CustomTextArea />

      <button className="self-end mt-4 bg-gradient-to-r from-[#F0D785] to-[#9C7049] text-black font-semibold py-1 px-4 rounded-md"> Ask Question</button>
    </div>
  );
};
const Info = () => { 
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
  
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-bold text-2xl mb-4">Question & Answer</h5>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h5 className="font-semibold text-black">
            Scalping on gold
          </h5>
         
        </AccordionSummary>

        </Accordion>
    </div>
  );
};
const Review = () => {
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-bold text-2xl mb-4">Student Ratings & Reviews</h5>
      
    </div>
  );
};
