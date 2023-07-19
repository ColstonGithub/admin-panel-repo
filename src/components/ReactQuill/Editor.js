import React, { useEffect } from "react";
import QuillToolbar, { modules, formats } from "./QuillToolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
// Styles for the editor and its container element
const previewContainer = {
  backgroundColor: "#f8f8f8",
  padding: "10px",
  border: "1px solid #ddd",
  marginTop: "20px",
};

const previewContent = {
  marginTop: "10px",
};

export const Editor = ({ onData, dataText }) => {
  const [state, setState] = React.useState({ value: dataText });
  const handleChange = (value) => {
    setState({ value });
    onData(value);
  };

  useEffect(() => {
    if (dataText !== undefined && dataText) {
      setState({ value: dataText });
    }
  }, [dataText]);

  return (
    <div className="text-editor">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={state?.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
      <div style={{ ...previewContainer,whiteSpace: "pre-wrap" }}>
        <h3>Preview</h3>
        <div
          style={{ ...previewContent }}
          dangerouslySetInnerHTML={{ __html: state?.value }}
        />
      </div>
    </div>
  );
};

export default Editor;
