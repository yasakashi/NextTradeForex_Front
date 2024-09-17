import React from "react";
import NewCourceCard from "./new_cource_card";

const ExcerptComponent = () => {
  return (
    <NewCourceCard title={"Excerpt"}>
      <div style={{ padding: 16, width: "100%" }}>
        <textarea
          className="resize rounded-md focus:border-blue-500"
          style={{ width: "100%", border: "1px solid black" }}
        ></textarea>
        <p style={{fontSize:12}}>
          Excerpts are optional hand-crafted summaries of your content that can
          be used in your theme. <a href="#" className="text-blue-500" style={{textDecoration:"1px solid "}}>Learn more about manual excerpts.</a>{" "}
        </p>
      </div>
    </NewCourceCard>
  );
};

export default ExcerptComponent;
