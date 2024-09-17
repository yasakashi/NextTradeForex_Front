// Require Editor CSS files.
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
// import FroalaEditorComponent from "react-froala-wysiwyg";
import React, { useRef } from "react";

const EditorComponent = () => {
  return (
    <div style={{}}>
      {/* <FroalaEditorComponent
        tag="textarea"
        config={{ ...config }}
      /> */}
    </div>
  );
};

export default EditorComponent;
let config = {
  // documentReady: false,
  // width:"100%",
  // theme:"light",
  heightMin: 100,
  // heightMax: 500,
  events: {
    contentChanged: function (e: any, editor: any) {
      // console.log('test');
    },
  },
};
