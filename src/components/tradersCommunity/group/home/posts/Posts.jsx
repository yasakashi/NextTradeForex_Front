import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupPosts } from "../../../../../redux/features/postSlice";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import Post from "./Post";
import CustomBeatLoader from "../../../../../utils/loaders/CustomBeatLoader";

const Posts = () => {
  const groupId = localStorage.getItem("groupId");

  const [pageNum, setPageNum] = useState(1);

  const { posts, post, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const intObserver = useRef(null);

  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((page) => page + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading]
  );

  // dispatches
  useEffect(() => {
    if (groupId && axiosPrivate) {
      dispatch(
        getGroupPosts({
          axiosPrivate,
          data: {
            id: null,
            parentId: null,
            categoryids: null,
            communitygroupid: null,
            fromregisterdatetime: null,
            toregisterdatetime: null,
            isneedpaid: false,
            allowtoshow: true,
            pageindex: pageNum,
            rowcount: 3,
            showpost: true,
          },
        })
      );
    }
  }, [pageNum]);

  return (
    <div>
      {posts.map((post, i) => {
        if (posts.length === i + 1) {
          return <Post key={i} ref={lastPostRef} post={post} />;
        } else {
          return <Post key={i} post={post} />;
        }
      })}

      {isLoading ? (
        <div className="w-full flex justify-center items-center mt-10 mb-6">
          <CustomBeatLoader />
        </div>
      ) : null}
    </div>
  );
};

export default Posts;
