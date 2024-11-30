import { LazyLoadImage } from "react-lazy-load-image-component";

const DisplayPostFile = ({ post }) => {
  const {
    photofileurl,
    videofileurl,
    audiofileurl,
    videofilecontenttype,
    audiofilecontenttype,
  } = post;

  return (
    <div className="w-full h-full">
      {photofileurl ? (
        <div className="w-full h-full bg-cover object-cover z-50 relative">
          <LazyLoadImage
            src={`https://api.yasakashi.ir${photofileurl}`}
            effect="blur"
            alt="post Imgae"
            className=" z-50 w-full h-full rounded-lg"
            width="100%"
            height="100%"
          />
        </div>
      ) : videofileurl ? (
        <video
          className="w-full h-full overflow-hidden rounded-lg object-cover"
          autoPlay
          playsInline
          controls
        >
          <source
            src={`https://api.yasakashi.ir${videofileurl}`}
            // src="/test_video.mp4"
            type={videofilecontenttype}
            // type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : audiofileurl ? (
        <>
          <audio controls playsInline className="mx-auto w-[90%] h-full z-50 relative pb-3 bg-transparent">
            <source
              src={`https://api.yasakashi.ir${audiofileurl}`}
              type={audiofilecontenttype}
            />
            Your browser does not support the audio element.
          </audio>
          <div className="w-full h-full absolute top-0 right-0 bg-cover object-cover z-0">
            <LazyLoadImage
              src="/audio_background.jpg"
              effect="blur"
              alt="post Imgae"
              className=" z-50 w-full h-full rounded-lg"
              width="100%"
              height="100%"
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-cover object-cover z-50 relative">
          <LazyLoadImage
            src="/assets/community/dummy-banner.jpg"
            effect="blur"
            alt="post background"
            className="relative w-full h-full z-50 rounded-lg"
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default DisplayPostFile;
