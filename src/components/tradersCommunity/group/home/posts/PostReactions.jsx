const PostReactions = ({ reactions }) => {
  const reactsIcons = [
    { id: "1", name: "like", image: "/assets/reacts/like.gif" },
    { id: "3", name: "love", image: "/assets/reacts/love.gif" },
    { id: "4", name: "haha", image: "/assets/reacts/haha.gif" },
    { id: "6", name: "wow", image: "/assets/reacts/wow.gif" },
    { id: "7", name: "angry", image: "/assets/reacts/angry.gif" },
    { id: "8", name: "sad", image: "/assets/reacts/sad.gif" },
  ];

  return (
    <div className="flex items-center gap-2">
      {reactions.map((reaction) => {
        // Find the corresponding icon for the reaction
        const reactIcon = reactsIcons.find(
          (icon) => icon.id === reaction.reactiontypeId.toString()
        );

        // Render the reaction icon and count
        return reactIcon ? (
          <div
            key={reaction.reactiontypeId}
            className="flex items-center gap-1 bg-slate-300 rounded-full p-1 shadow-lg"
          >
            <img
              src={reactIcon.image}
              alt={reactIcon.name}
              className="size-6"
            />
            <span className="text-sm font-semibold px-1">
              {reaction.reactioncount}
            </span>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default PostReactions;
