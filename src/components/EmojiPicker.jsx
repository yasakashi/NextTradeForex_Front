import Picker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { CiFaceSmile } from "react-icons/ci";

const EmojiPicker = ({ textRef, setText, text, position = "top" }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    if (textRef) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleEmoji = (e) => {
    let emoji = e.emoji;

    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;

    setText("messageBody", newText);
    setCursorPosition(start?.length + emoji?.length);
  };

  useClickOutside(emojiRef, () => setShowEmojiPicker(false));

  return (
    <div ref={emojiRef} className="relative inline-block z-[1000]">
      <div
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className={`${
          showEmojiPicker ? "text-blue-500" : "text-gray-400"
        } w-7 cursor-pointer hover:text-blue-600  transition-colors`}
      >
        <CiFaceSmile className="text-gray-500 cursor-pointer" size={24} />
      </div>
      {showEmojiPicker && (
        <div
          className={`absolute scale-75 z-[1000]  ${
            position === "top"
              ? " top-full -translate-y-11 -translate-x-[82%] "
              : " bottom-full -translate-x-[83%] translate-y-11 "
          } `}
        >
          <Picker width={320} height={380} onEmojiClick={handleEmoji} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
