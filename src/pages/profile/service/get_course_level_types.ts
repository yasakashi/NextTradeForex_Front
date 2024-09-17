import { http_instanse } from "../../../axios/auth_full_http_instanse";

export const get_course_level_types_api = async () => {
  try {
    const { data } = await http_instanse.post("/getcourseleveltype");
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
