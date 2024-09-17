import { http_instanse } from "../../../../../../axios/auth_full_http_instanse";

export const get_course_lessons_api = async ({courseId}:{courseId?:string}) => {
  try {
    const { data } = await http_instanse.post("/course/getcourselessons", {courseId});
    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const add_course_lessons_api = async (props: any) => {
  try {
    const { data } = await http_instanse.post("/course/addCourseLesson", props);
    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
