import React from "react";

const reactsIcons = [
  { id: "1", name: "like", image: "/assets/reacts/like.gif" },
  { id: "3", name: "love", image: "/assets/reacts/love.gif" },
  { id: "4", name: "haha", image: "/assets/reacts/haha.gif" },
  { id: "6", name: "wow", image: "/assets/reacts/wow.gif" },
  { id: "7", name: "angry", image: "/assets/reacts/angry.gif" },
  { id: "8", name: "sad", image: "/assets/reacts/sad.gif" },
];

const PostReactsPopup = ({ visible, setVisible, postReactionHandler }) => {

  
  return (
    <>
      {visible && (
        <div className="flex space-x-2 p-2 z-[1000] relative">
          {reactsIcons.map((reactIcon, i) => (
            <div
              onClick={() => postReactionHandler(reactIcon.id)}
              key={i}
              className="w-11 hover:scale-150 transition-transform cursor-pointer bg-white rounded-full p-1"
            >
              <img src={reactIcon.image} alt={reactIcon.name} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostReactsPopup;
