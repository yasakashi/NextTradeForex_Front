import { http_instanse } from "../../../axios/auth_full_http_instanse";
import { show_message } from "../../../redux/features/generalSlice";
import store from "../../../redux/store";

export const upload_course_cover_api = async (params: any) => {
  try {
    const { data } = await http_instanse.post(
      "/course/uploadcoursepic",
      params,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    store.dispatch(
      show_message({
        message: data.messageDescription,
        mode: true,
        color: "success",
      })
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
