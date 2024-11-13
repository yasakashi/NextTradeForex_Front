import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";

const DraftEditor = ({
  editorState, // EditorState passed from parent
  onChange,
  className = "",
  placeholder = "",
  h = "400",
}) => {
  // Handle editor state changes
  const handleEditorStateChange = (state) => {
    const rawContentState = convertToRaw(state.getCurrentContent());
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join(" ");
    const htmlContent = stateToHTML(state.getCurrentContent()); // Convert to HTML

    // Pass the editor state, raw content, plain text, and HTML to the parent
    onChange?.({
      state,
      rawContent: rawContentState,
      plainText,
      htmlContent,
    });
  };
  return (
    <div
      className={`w-full bg-white text-gray-700 rounded-[8px] p-2 h-[${h}px] ${className}`}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName placeholder:font-normal"
        editorClassName="editorClassName placeholder:font-normal"
        editorStyle={{ height: "100" }}
        spellCheck
        toolbar={{}}
        placeholder={placeholder}
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
};

export default DraftEditor;
