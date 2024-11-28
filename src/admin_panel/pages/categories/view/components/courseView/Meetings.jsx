import { useParams } from "react-router-dom";
import { useGetCourseMeetingsQuery } from "../../../../../../redux/features/course/courseApii";
import CoverImage  from '../../../../../../asset/img/placeholder (1).svg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const Meetings = () => {
  const { id } = useParams();
  const {
    data: { messageData: meetings } = { messageData: [] },

    isLoading,
  } = useGetCourseMeetingsQuery({
    data: {
      Id: null,
      courseId: id,
      pageindex: 1,
      rowcount: 21,
    },
  });

   function formatDate(dateString) {
     if (dateString) {
       const date = new Date(dateString);

       // Format date to "DD Mon YYYY"
       const formattedDate = date.toLocaleDateString("en-GB", {
         day: "2-digit",
         month: "short",
         year: "numeric",
       });

       // Format time to "HH:MM"
       const formattedTime = date.toLocaleTimeString("en-GB", {
         hour: "2-digit",
         minute: "2-digit",
       });

       // Return the formatted date and time as "DD Mon YYYY, HH:MM"
       return `${formattedDate}, ${formattedTime}`;
     } else return null;
   }

  return (
    <div className="wrapper w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {meetings?.map((meeting, index) => (
        <div
          className="p-4 w-full max-w-[380px] min-h-[250px] border border-gold-light_400 rounded-lg shadow-md bg-blue-light"
          key={index}
        >
          <div className="h-[250px] w-full overflow-hidden rounded-[6px]">
            <LazyLoadImage
              src={
                meeting?.meetingFilepath ? meeting.meetingFilepath : CoverImage
              }
              effect="blur"
              alt="post Imgae"
              className=" z-50 w-full h-full rounded-lg hover:scale-105 transition-transform"
              width="100%"
              height="100%"
            />
          </div>
          <h4 className="text-gold-light_400 mt-4 text-xl font-semibold text-center capitalize">
            {meeting?.meetingTitle ? meeting?.meetingTitle : "No title"}
          </h4>

          <p className="h-[60px] overflow-hidden text-base text-gray-300 font-normal ">
            {meeting?.meetingDescription}
          </p>

          <div className="mt-auto">
            <span className="text-sm text-gold-light_400 font-bold">
              Start At :{" "}
            </span>

            <span>{formatDate(meeting?.meetingDateTime)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meetings;
