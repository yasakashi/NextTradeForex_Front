import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const DraftEditor = ({
  set_editor_value,
  editorState,
}: {
  editorState?: EditorState;
  set_editor_value?: (val: EditorState) => void;
}) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 400,
        backgroundColor: "white",
        color: "black",
        borderRadius: 8,
        padding: 8,
      }}
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
