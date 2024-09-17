import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { getGroupPosts } from "../../../../../redux/features/postSlice";
import CustomBeatLoader from "../../../../../utils/loaders/CustomBeatLoader";

const Posts = ({ createPostRef }) => {
  const dispatch = useDispatch();
  const groupId = localStorage.getItem("groupId");

  const axiosPrivate = useAxiosPrivate();
  const { posts, post, isLoading, postReaction } = useSelector(
    (state) => state.posts
  );
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const batchSize = 1; // Adjust the number of posts to load per scroll event

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, visiblePosts]
  );

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => {
      const currentLength = prevVisiblePosts.length;
      const morePosts = posts.slice(currentLength, currentLength + batchSize);
      return [...prevVisiblePosts, ...morePosts];
    });
  };

  useEffect(() => {
    dispatch(
      getGroupPosts({
        axiosPrivate,
        data: {
          communitygroupid: groupId,
          parentId: null,
          showpost: true,
          pageindex: 1,
          rowcount: 3,
        },
      })
    );
  }, [post, postReaction]);

  useEffect(() => {
    if (posts.length) {
      setVisiblePosts(posts.slice(0, batchSize));
    }
  }, [posts]);

  return (
    <div className="mt-3 mb-8">
      {isLoading && visiblePosts.length === 0 ? (
        <div className="flex items-center text-center justify-center mt-20 mb-10">
          <CustomBeatLoader />
        </div>
      ) : null}
      <div className="space-y-6">
        {visiblePosts.length
          ? visiblePosts.map((item, index) => {
              if (index === visiblePosts.length - 1) {
                return (
                  <div ref={lastPostElementRef} key={index}>
                    <Post post={item} createPostRef={createPostRef} />
                  </div>
                );
              } else {
                return (
                  <Post key={index} post={item} createPostRef={createPostRef} />
                );
              }
            })
          : null}
      </div>
      {isLoading && visiblePosts.length > 0 && (
        <div className="flex items-center text-center justify-center mt-10 mb-10">
          <CustomBeatLoader />
        </div>
      )}
    </div>
  );
};

export default Posts;
