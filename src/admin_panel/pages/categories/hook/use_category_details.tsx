import React from "react";
import { useParams } from "react-router-dom";
import { get_course_topics_api } from "../../tutor/courses/course_atachments/service/course_topics_api";
import { get_course_meetings_api } from "../../tutor/courses/course_atachments/service/course_metting_api";
import { get_course_lessons_api } from "../../tutor/courses/course_atachments/service/course_lessons_api";
import { get_course_pdf_api } from "../../tutor/courses/course_atachments/service/course_pdf_api";
import { get_course_videos_api } from "../../tutor/courses/course_atachments/service/course_videos_api";
import {
  loading_selector,
  useAppSelector,
} from "../../../../redux/features/generalSlice";

const useCategoryDetails = () => {
  const { coursename, id } = useParams();
  const [topic_id, set_topic_id] = React.useState(0);
  const loading = useAppSelector(loading_selector);
  const [items, set_items] = React.useState<
    {
      id: string;
      name: string;
      img: any;
    }[]
  >([]);
  React.useEffect(() => {
    if (topic_id === 0) {
      get_course_topics_api({ courseId: id }).then((res) => {
        set_items(res);
      });
    } else if (topic_id === 6) {
      get_course_meetings_api({ courseId: id })
        .then((res) => {
          set_items(res);
        })
        .catch((err) => {});
    } else if (topic_id === 1) {
      get_course_lessons_api({ courseId: id })
        .then((res) => {
          set_items(res);
        })
        .catch((err) => {});
    } else if (topic_id === 2) {
      get_course_pdf_api({ courseId: id })
        .then((res) => {
          set_items(res);
        })
        .catch((err) => {});
    } else if (topic_id === 5) {
      get_course_videos_api({ courseId: id })
        .then((res) => {
          set_items(res);
        })
        .catch((err) => {});
    }
    return () => {
      set_items([]);
    };
  }, [topic_id]);

  return { coursename, topic_id, set_topic_id, items, loading };
};

export default useCategoryDetails;
