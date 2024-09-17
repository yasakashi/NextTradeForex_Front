import React from "react";
import {
  get_courses_api,
  // get_courses_levels_api,
  // get_my_courses_api,
} from "../service/get_my_courses_api";
import { remove_course_api } from "../../service/delete_course_api";

const useMyCourses = (search_params?:any) => {
  const [courses_list, set_courses_list] = React.useState<any[]>([]);
  const [publish_type, set_publish_type] = React.useState("publish");
  React.useEffect(() => {
    get_courses_api(search_params)
      .then((res) => {
        set_courses_list(res?.messageData || []);
      })
      .catch((err) => {});

    // get_courses_levels_api()
    //   .then((res) => {
    //     console.log(res);

    //     get_my_courses_api(false)
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => {});
    //   })
    //   .catch((err) => {});
  }, []);
  const remove_course_state = async (id: string) => {
    try {
      const update = await remove_course_api(id);

      set_courses_list((pre) => pre.filter((item) => item.id !== id));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  return { courses_list, set_publish_type, publish_type, remove_course_state };
};

export default useMyCourses;
