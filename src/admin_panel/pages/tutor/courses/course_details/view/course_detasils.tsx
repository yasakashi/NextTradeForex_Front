import React from "react";
import Navbar from "../../../../../../components/Navbar";
import Footer from "../../../../../../components/Footer";
import Rating from "./components/rating";
import { useParams } from "react-router-dom";
import placeholder from "../../../../../../asset/img/placeholder (1).svg";
import {
  yellow_color,
  yellow_dark,
  yellow_medium,
} from "../../../../categories/view/category_details_view_screen";
import { BiShare } from "react-icons/bi";
import { LiaStreamSolid } from "react-icons/lia";
import CourseInfo from "./components/course_info";
import CourseProgressComponent, {
  CourseBy,
} from "./components/course_progress_component";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../../../../../redux/features/generalSlice";
import { course_data_selector } from "../../../../../../redux/features/courseSlise";
import { get_course_cover_image_api } from "../../../../../../pages/profile/my_courses/service/get_course_cover_image_api";

const CourseDetails = () => {
  const { id } = useParams();
  const course_data = useAppSelector(course_data_selector);
  const [cover, set_cover] = React.useState<null | string>(null);
  React.useEffect(() => {
    get_course_cover_image_api(course_data.id)
      .then((res) => {
        set_cover(res);
      })
      .catch((err) => {
      });
  }, []);
  let blob = new Blob([cover as BlobPart], { type: "image/png" });

  let url = URL.createObjectURL(blob);

  return (
    <div className="w-full">
      <Navbar />
      <div className="mt-12 w-full px-8 mb-12">
        <Rating />
        <h3 className="text-white text-4xl font-bold my-4">
          {course_data?.coursename}
        </h3>

        <div className="flex justify-between items-center mb-8">
          <div className="flex  items-center w-2/3">
            <h4
              style={{
                border: "1px solid",
                borderColor: "white",
                borderRadius: 50,
                padding: 6,
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {course_data?.ownerusername?.slice(0, 2)}
            </h4>
            <h6 className="text-white mx-4">
              By{" "}
              <span style={{ color: yellow_color }}>
                {course_data?.ownerusername}
              </span>
            </h6>
            <h6 className="text-white mx-4">
              Categories :{" "}
              <span style={{ color: yellow_color }}>top Categories </span>
            </h6>
          </div>
          <div className="w-fit flex ">
            <button
              style={{ color: yellow_color }}
              className="flex items-center"
            >
              <LiaStreamSolid className="mx-2" />
              Wishlist
            </button>
            <button
              style={{ color: yellow_color }}
              className="flex items-center "
            >
              <BiShare className="mx-2" />
              Share
            </button>
          </div>
        </div>
        <Grid item xs={12} className="flex flex-wrap my-4">
          <Grid item className="md:w-2/3 sm:w-full">
            <img
              src={cover ? url : (placeholder as unknown as string)}
              alt=""
              style={{ width: "100%", height: 600 }}
            />
            <CourseInfo />
          </Grid>
          <Grid item className="sm:w-full md:w-1/3 pl-4">
            <CourseProgressComponent />
            <CourseBy />
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
