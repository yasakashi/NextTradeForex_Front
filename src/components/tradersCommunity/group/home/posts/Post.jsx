import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import CreateComment from "./CreateComment";
import { RiMoreLine } from "react-icons/ri";
import { useRef } from "react";
import Moment from "react-moment";
import {
  getPostComments,
  getPostReactions,
  addPostReaction,
  removePost,
  getGroupPost,
} from "../../../../../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
// import useClickOutside from "../../hooks/useClickOutside";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import useClickOutside from "../../../../../hooks/useClickOutside";
import CustomBeatLoader from "../../../../../utils/loaders/CustomBeatLoader";
import PostReactsPopup from "./PostReact";
import toast from "react-hot-toast";
import PostReactions from "./PostReactions";
import DisplayPostFile from "./DisplayPostFile";

const Post = React.forwardRef(({ post, createPostRef }, ref) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [reactionVisiblity, setReactionVisiblity] = useState(false);
  const [edittingPostId, setEdittingPostId] = useState(null);
  const [postReactions, setPostReactions] = useState([]);
  const [postComments, setPostComments] = useState([]);

  const postRef = useRef(null);

  const groupId = localStorage.getItem("groupId");

  const { title, categories } = post;

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (post?.id) {
      const fetchPostReactions = async () => {
        try {
          const response = await dispatch(
            getPostReactions({
              axiosPrivate,
              data: { forummessageId: post?.id },
              toast,
            })
          );

          if (response?.payload?.messageCode === 200) {
            setPostReactions(response?.payload?.messageData || []);
          }
        } catch (error) {
          console.log("Error fetching post reactions", error);
        }
      };

      fetchPostReactions();
    }
  }, [post?.id, dispatch, axiosPrivate]);

  useEffect(() => {
    if (post?.id) {
      const fetchPostComments = async () => {
        try {
          const response = await dispatch(
            getPostComments({
              axiosPrivate,
              data: { parentId: post?.id, communitygroupid: groupId },
            })
          );
          if (response?.payload?.comments) {
            setPostComments(response.payload.comments || []);
          }
        } catch (error) {
          console.error("Error fetching post comments:", error);
        }
      };

      fetchPostComments();
    }
  }, [post?.id, dispatch, axiosPrivate]);

  const toggleEditModalHandler = (id) => {
    if (activePostId === id) {
      setActivePostId(null);
    } else {
      setActivePostId(id);
    }
  };

  const handleEditPost = (postId) => {
    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });

    localStorage.setItem("postId", postId);
  };

  const removePostHandler = (id) => {
    setDeletingPostId(id);
    setActivePostId(null);
    dispatch(
      removePost({ axiosPrivate, data: { id }, toast, setDeletingPostId })
    );
  };

  useClickOutside(postRef, () => {
    setActivePostId(null);
  });

  const postReactionHandler = async (reaction) => {
    try {
      setReactionVisiblity(false);
      const response = await dispatch(
        addPostReaction({
          axiosPrivate,
          data: { forummessageId: post?.id, reactiontypeId: reaction },
          toast,
        })
      );

      if (response?.payload?.messageCode === 200) {
        setPostReactions((prevReactions) => {
          const existingReaction = prevReactions.find(
            (r) => r.reactiontypeId === reaction
          );

          if (existingReaction) {
            return prevReactions.map((r) =>
              r.reactiontypeId === reaction
                ? { ...r, reactioncount: r.reactioncount + 1 }
                : r
            );
          } else {
           
            return [
              ...prevReactions,
              { reactiontypeId: reaction, reactioncount: 1 },
            ];
          }
        });
      }
    } catch (error) {
      console.log("Error adding reaction: ", error);
    }
  };

  return (
    <div ref={ref}>
      <div className="bg-white my-4 relative rounded-lg shadow-md p-3">
        {/* loading */}
        {deletingPostId === post?.id ? (
          <div className="absolute flex justify-center items-center w-full h-full inset-0 z-[999]">
            <div className="w-full absolute h-full bg-black opacity-35 overflow-hidden inset-0 z-[998] rounded-lg"></div>
            <CustomBeatLoader color="#fff" />
          </div>
        ) : null}
        <div className="py-2 flex justify-between items-center">
          <Link
            to={`/user-profile`}
            className="flex space-x-2 items-center text-gray-600 font-semibold"
          >
            <img
              src="/assets/bp-avatar.png"
              alt=""
              className="rounded-full shrink-0 h-8 w-8 object-cover"
            />
            <div className="flex flex-col leading-4">
              <span className="text-sm">
                {post.creatorusername || "unKnown"}
              </span>
              <span className="flex items-center justify-start text-xs font-normal">
                {/* <Moment className="text-xs text-gray-400" fromNow></Moment> */}
              </span>
            </div>
          </Link>

          {(post.creatoruserid === user?.userid || user?.userid === 1) && (
            <div className="relative">
              <div
                onClick={() => toggleEditModalHandler(post?.id)}
                className="cursor-pointer"
              >
                <RiMoreLine className="text-gray-500" size={23} />
              </div>

              {activePostId === post?.id ? (
                <div
                  ref={postRef}
                  className="absolute z-[100] shadow-md top-full right-4 bg-gray-100 rounded-lg"
                >
                  <ul>
                    <li
                      onClick={() => handleEditPost(post?.id)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-all text-sm px-3 py-2 rounded-md text-blue-600 text-nowrap"
                    >
                      <MdOutlineEdit className="text-blue-600" size={14} />
                      Edit Post
                    </li>
                    <li
                      onClick={() => removePostHandler(post?.id)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-all text-sm px-3 py-2 rounded-md text-red-600 text-nowrap"
                    >
                      <FaRegTrashAlt className="text-red-600" size={14} />
                      Remove Post
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="my-1">
          <p className="text-gray-600 text-base">{title}</p>
        </div>

        <div className="h-[220px] xl:h-[250px] w-full my-3 overflow-hidden z-50 relative bg-gray-100">
          <DisplayPostFile post={post} />
        </div>

        <div className="px-2 py-2 text-gray-500 text-sm">
          <span>{post.messagebody}</span>
        </div>

        <div className="my-4">
          <ul className="flex items-center flex-wrap gap-2">
            {categories?.length > 0
              ? categories.map((category, index) => (
                  <li
                    className="text-sm text-nowrap bg-slate-200 px-2 py-[2px] rounded-full w-max shadow-md text-gray-700 font-semibold"
                    key={index}
                  >
                    #{category?.categoryname}
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div className=""></div>

        <div className="w-full max-h-[200px] overflow-y-scroll scrollbar-none">
          {postComments.length > 0 ? (
            postComments.map((comment, index) => (
              <div
                className="text-gray-500 px-4 gap-2 py-2 text-sm flex items-start"
                key={index}
              >
                <img
                  className="size-[40px] rounded-full m-1"
                  src="/assets/bp-avatar.png"
                  alt="user"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-col leading-3">
                    <div className="flex items-center justify-between">
                      <h4>{comment?.creatorusername || "-"}</h4>
                      <p className="bg-gray-100 px-1 text-xs py-1 rounded-sm">
                        {comment?.categoryname || "-"}
                      </p>
                    </div>

                    {/* <Moment className="text-xs text-gray-400" fromNow>
                      {comment?.registerdatetime}
                    </Moment> */}
                  </div>

                  <div className="bg-gray-100 my-4 p-4 rounded-md">
                    <h4 className="text-gray-600 text-sm font-semibold">
                      {comment?.title}
                    </h4>
                    <p className="text-gray-500 text-[13px]">
                      {comment?.messagebody}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 px-4 w-full py-2 text-xs flex justify-between items-center">
              <span>No React!</span>
              <span>0 comments</span>
            </div>
          )}
        </div>

        <div
          onMouseLeave={() => setReactionVisiblity(false)}
          className="text-gray-500 text-xs flex gap-10 border-t border-t-gray-200 pt-2"
        >
          <div className="relative flex items-center gap-4">
            <span
              onMouseOver={() => setReactionVisiblity(true)}
              className="hover:cursor-pointer"
            >
              React!
            </span>
            <div>
              <PostReactions reactions={postReactions} />
            </div>
            <div className="absolute bottom-full left-0">
              <PostReactsPopup
                visible={reactionVisiblity}
                postReactionHandler={postReactionHandler}
              />
            </div>
          </div>
          <div
            onClick={() => setShowCommentBox((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <BiCommentDetail size={14} />
            <span>Comment</span>
          </div>
        </div>

        {showCommentBox && (
          <CreateComment
            postId={post.id}
            communitygroupId={groupId}
            setPostComments={setPostComments}
            setShowCommentBox={setShowCommentBox}
          />
        )}
      </div>
    </div>
  );
});

export default Post;
