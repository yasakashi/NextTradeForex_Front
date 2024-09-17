import { useRef } from "react";
import CreatePost from "./CreatePost";
import Posts from "./posts/Posts";
import { useSelector } from "react-redux";

const GroupHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const createPostRef = useRef(null);

  const { group } = useSelector((state) => state.group);

  return (
    <div>
      {user?.userid === group?.owneruserid && (
        <CreatePost ref={createPostRef} />
      )}

      <Posts />
      {/* <Posts createPostRef={createPostRef} /> */}
    </div>
  );
};

export default GroupHome;
