import { http_instanse } from "../../../../axios/auth_full_http_instanse";

export const get_my_courses_api = async (siteisowner: boolean) => {
  try {
    const { data } = await http_instanse.post("/course/getusercourses", {
      courseleveltypeId: 2,
      rowcount: 20,
      pageindex: 1,
      coursetypeId: 0,
      siteisowner,
      owneruserId: 1,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const get_courses_levels_api = async () => {
  try {
    const { data } = await http_instanse.post("/getcourseleveltype");
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const get_user_info_api = async () => {
  try {
    const { data } = await http_instanse.post("/getuserfromtoken");

    localStorage.userTypeId = data?.messageData?.userTypeId;
    localStorage.userid = data?.messageData?.userid;
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const get_courses_api = async (params?: any) => {
  try {
    const { data } = await http_instanse.post("/course/getcourse", {
      ...params,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
