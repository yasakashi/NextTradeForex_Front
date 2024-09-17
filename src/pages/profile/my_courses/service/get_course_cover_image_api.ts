import {  http_instanse_level_2 } from "../../../../axios/auth_full_http_instanse";


export const get_course_cover_image_api = async (course_id: string|number) => {
  try {
    const { data } = await http_instanse_level_2.get(
      `/course/getcoursepic/${course_id}`,{responseType:"blob"}
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
