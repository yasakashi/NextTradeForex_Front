import { http_instanse } from "../../../axios/auth_full_http_instanse";
import { show_message } from "../../../redux/features/generalSlice";
import store from "../../../redux/store";

export const create_course_api = async (course_data: any) => {
  try {
    const { data } = await http_instanse.post(
      "/course/addcourses",
      course_data
    );
    store.dispatch(
      show_message({
        mode: true,
        message: data?.messageDescription,
        color: "success",
      })
    );

    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
