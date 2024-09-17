import React from "react";
import {
  get_courses_levels_api,
  get_my_courses_api,
} from "../service/get_my_courses_api";

const useMyCourses = () => {
  const [courses_list, set_courses_list] = React.useState([]);
  const [publish_type, set_publish_type] = React.useState("Enrolled Courses");
  React.useEffect(() => {
    get_courses_levels_api()
      .then((res) => {
        console.log(res);

        get_my_courses_api(true)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);

  return { courses_list, set_publish_type, publish_type };
};

export default useMyCourses;
