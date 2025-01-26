import { http_instanse_level_2 } from "../../../../../axios/auth_full_http_instanse";
import { show_message } from "../../../../../redux/features/generalSlice";
import store from "../../../../../redux/store";

export const publish_course_api = async ({
  course_id,
  course_data,
}: {
  course_id: string;
  course_data: any;
}) => {
  try {
    const { data } = await http_instanse_level_2.post("/getcoursetopic", {
      courseId: course_id,
    });

    if (data.messageData.length < 7)
      return store.dispatch(
        show_message({
          message:
            "Course does not have the required amount of Topics (At least 7 topics)",
          color: "error",
          mode: true,
        })
      );
    const update = await http_instanse_level_2.post("/course/editcourses", {
      Id: course_id,
      ...course_data,
      courseStatusId: 1,
    });
    return store.dispatch(
      show_message({
        message: update.data?.messageDescription,
        color: "success",
        mode: true,
      })
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};
