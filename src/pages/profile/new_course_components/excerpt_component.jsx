import React from "react";
import NewCourceCard from "./new_cource_card";
import { Link } from "react-router-dom";

const ExcerptComponent = ({ name, formik }) => {
  return (
    <NewCourceCard title={"Excerpt"}>
      <div className="w-full p-4">
        <textarea
          placeholder="Excerpt"
          name="excerpt"
          onChange={formik.handleChange}
          value={formik.values?.excerpt}
          className="resize-none px-4 py-2 text-base text-gray-700 h-[100px] outline-blue-400 rounded-md focus:border-blue-500 w-full border border-gray-300"
        ></textarea>
        <p className="text-xs text-gray-600">
          Excerpts are optional hand-crafted summaries of your content that can
          be used in your theme.
          <Link to="#" className="text-blue-500 hover:underline mx-1 ">
            Learn more about manual excerpts.
          </Link>
        </p>
      </div>
    </NewCourceCard>
  );
};

export default ExcerptComponent;
