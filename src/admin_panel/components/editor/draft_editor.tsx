import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({
  set_editor_value,
  editorState,
  initialContent,
}: {
  editorState?: EditorState;
  set_editor_value?: (val: EditorState) => void;
  initialContent?: string;
}) => {
  const [editorStateLocal, setEditorStateLocal] = useState<EditorState>(editorState || EditorState.createEmpty());

  useEffect(() => {
    if (initialContent) {
      // Convert the initial content from HTML to ContentState
      const blocksFromHTML = convertFromHTML(initialContent);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorStateLocal(newEditorState);
      set_editor_value?.(newEditorState);
    }
  }, [initialContent, set_editor_value]);

  return (
    <div
      style={{
        width: "100%",
        maxHeight: 400,
        backgroundColor: "white",
        color: "black",
        borderRadius: 8,
        padding: 8,
        overflow: "auto",
        border: "1px solid gray",
      }}
    >
      <Editor
        editorState={editorStateLocal}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{ height: "100%", padding: 7 }}
        spellCheck
        toolbar={{}}
        onEditorStateChange={(state) => {
          set_editor_value?.(state);
          setEditorStateLocal(state);
        }}
      />
    </div>
  );
};

export default DraftEditor;
