import React from "react";
import { get_courses_api } from "../../../../../pages/profile/my_courses/service/get_my_courses_api";
import {
  loading_selector,
  useAppSelector,
} from "../../../../../redux/features/generalSlice";

const useCourses = ({
  search,
  reload,
}: {
  search?: Record<string, any>;
  reload?: number;
}) => {
  const [courses, set_courses] = React.useState<any[]>([]);
  const loading = useAppSelector(loading_selector);
  React.useEffect(() => {
    get_courses_api(search).then((res) => {
      set_courses(res.messageData);
    });
  }, [reload]);
  return { courses, loading };
};

export default useCourses;
