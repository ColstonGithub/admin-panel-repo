import React from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

export const Editor = ({ onData, dataText }) => {
  const [state, setState] = React.useState({ value: dataText });
  const handleChange = (value) => {
    setState({ value });
    onData(value);
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
