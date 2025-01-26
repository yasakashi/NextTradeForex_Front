import { http_instanse } from "../../../../../../axios/auth_full_http_instanse";
import { show_message } from "../../../../../../redux/features/generalSlice";
import store from "../../../../../../redux/store";

export const get_course_pdf_api = async ({courseId}:{courseId?:string}) => {
  try {
    const { data } = await http_instanse.post("/getcoursepdf", {courseId});
    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const add_course_pdf_api = async (props: any) => {
  try {
    const { data } = await http_instanse.post("/addcoursepdf", props); 
    store.dispatch(show_message({mode:true,color:"success",message:data?.messageDescription}))

    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
