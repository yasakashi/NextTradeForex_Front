import { http_instanse } from "../../../../axios/auth_full_http_instanse";

export const get_categories_api = async () => {
  try {
    const { data } = await http_instanse.post("/getcategory", {});
    return data.messageData;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
