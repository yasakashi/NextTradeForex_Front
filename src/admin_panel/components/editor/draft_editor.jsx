import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({
  set_editor_value,
  editorState,
  className = "",
  h = "400",
}) => {
  return (
    <div
      className={`w-full bg-white text-gray-700 rounded-[8px] p-2 h-[${h}px] ${className}`}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{ height: "100%", padding: 7 }}
        spellCheck
        toolbar={{}}
        onEditorStateChange={(state) => {
          // let row = convertToRaw(state.getCurrentContent())
          //   .blocks.map((item) => item.text)
          //   .join(" ");
          set_editor_value?.(state);
        }}
      />
    </div>
  );
};

export default DraftEditor;
