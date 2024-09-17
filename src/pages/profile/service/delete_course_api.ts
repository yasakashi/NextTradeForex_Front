import { http_instanse, http_instanse_level_2 } from "../../../axios/auth_full_http_instanse";

export const remove_course_api = async (course_id: string) => {
  try {
    const { data } = await http_instanse_level_2.post("/course/removecourse", {
      Id: course_id,
    }); 
    


    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
