import React from "react";
import { useParams } from "react-router-dom";

const useCategoryDetails = () => {
  const { id } = useParams();
  const [topic_id, set_topic_id] = React.useState("Topics");
  return { id,topic_id,set_topic_id };
};

export default useCategoryDetails;
