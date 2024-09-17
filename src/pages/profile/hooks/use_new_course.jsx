import React from "react";
import { courses_items } from "../new_course";

const useNewCourse = () => {
  const [items_list, set_items_list] = React.useState(courses_items);
  const [is_layout_colum, set_is_layout_column] = React.useState(true);
  const [check_additional_setting, set_additional_setting] =
    React.useState(true); 
  return {
    items_list,
    set_items_list,
    is_layout_colum,
    set_additional_setting,
    set_is_layout_column,
    check_additional_setting,
  };
};

export default useNewCourse;
