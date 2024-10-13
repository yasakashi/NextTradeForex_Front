import React from "react";
import CourseItemSelector from "./course_item_picker";

const ScreenElements = ({
  course_items,
  set_course_items,
  is_layout_column,
  set_is_layout_column,
  check_additional_setting,
  set_additional_setting,
  edit_title,
}) => {
  return (
    <div>
      <div className="" style={{ position: "relative", marginTop: 0 }}>
        <div style={{ width: "100%" }}>
          <CourseItemSelector
            course_items={course_items}
            set_course_items={set_course_items}
            is_layout_column={is_layout_column}
            check_additional_setting={check_additional_setting}
            set_additional_setting={set_additional_setting}
            set_is_layout_column={set_is_layout_column}
          />
        </div>
        <h4 className="text-3xl text-gray-700 font-bold mb-4">
          {edit_title || " Add New Course"}
        </h4>
      </div>
      {/* <div
        style={{
          backgroundColor: "white",
          padding: "16px 32px",
          borderRadius: 4,
          boxShadow: "0px 0px 16px rgba(0,0,0,0.5)",
          borderLeft: "8px solid #bb914a",
        }}
      >
        <h3 style={{ fontSize: 16, marginBottom: 24 }}>
          Hey, WP Armour has blocked 9075 spam submissions till date - that’s
          awesome!
        </h3>
        <h3 style={{ fontSize: 16, marginBottom: 0 }} className="text-justify">
          Can you help us by purchasing our Extended Version ? This will helps
          up maintain and support the plugin in upcoming days and make it even
          better. Our Extended version starts from 19.99 USD and comes with
          lifetime license (No monhtly or yearly recurring) and No API calls.
          <br />
          <br />
          Also, it has 2 level spam check and additionally works with
          WooCommerce, Ajax and Multi page Gravity Forms, Easy Digital
          Downloads, QuForm, MC4WP: Mailchimp for WordPress and have Spammer
          blocking based on IP, Record Spam Submission and so on.
        </h3>
      </div> */}
    </div>
  );
};

export default ScreenElements;
