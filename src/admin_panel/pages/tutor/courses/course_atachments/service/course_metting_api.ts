import { http_instanse } from "../../../../../../axios/auth_full_http_instanse";
import { show_message } from "../../../../../../redux/features/generalSlice";
import store from "../../../../../../redux/store";

export const get_course_meetings_api = async ({
  courseId,
  search,
}: {
  courseId?: string;
  search?: any;
}) => {
  try {
    const { data } = await http_instanse.post("/getcoursemeet", {
      courseId,
      ...search,
    });
    return data?.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const add_course_mettings_api = async (props: any) => {
  try {
    const { data } = await http_instanse.post("/addcoursemeet", props);
    
    
    store.dispatch(show_message({mode:true,color:"success",message:data?.messageDescription}))
    return data?.messageData; 




  } catch (error) {
    throw new Error(`${error}`);
  }
};
