import { useDispatch, useSelector } from "react-redux";
import GalleryCard from "./GalleryCard";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { getGalleries } from "../../../../redux/features/gallerySlice";
import toast from "react-hot-toast";
import CustomRiseLoader from "../../../../utils/loaders/CustomRiseLoader";

const AllGalleries = () => {
  const groupId = localStorage.getItem("groupId");

  const { getGalleriesLoading, galleries } = useSelector(
    (state) => state.gallery
  );

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(
      getGalleries({
        axiosPrivate,
        data: {
          Id: null,
          communitygroupId: groupId,
          pageindex: 1,
          rowcount: 20,
        },
        toast,
      })
    );
  }, []);
  return (
    <>
      {getGalleriesLoading ? (
        <div className="w-full flex items-center justify-center my-8 mx-auto">
          <CustomRiseLoader />
        </div>
      ) : null}
      <div className="flex flex-wrap gap-4">
        {galleries?.length > 0 ? (
          galleries.map((gallery, index) => (
            <GalleryCard key={index} gallery={gallery} />
          ))
        ) : !getGalleriesLoading ? (
          <p className="text-gray-700 text-base px-4 py-10">No Gallery Yet!</p>
        ) : null}
      </div>
    </>
  );
};

export default AllGalleries;
