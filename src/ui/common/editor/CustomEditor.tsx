import dynamic from "next/dynamic";
import React, { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { EditorState } from "draft-js";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const CustomEditorBlock = styled.div``;

interface CustomEditorProps {}

const CustomEditor: React.FC<CustomEditorProps> = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];
  if (!Editor) return null;
  return (
    <CustomEditorBlock>
      <Editor
        initialEditType="wysiwyg"
        placeholder="글을 쓰시오."
        plugins={[[colorSyntax, { highlighter: "prism" }]]}
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        useCommandShortcut={true}
      />
    </CustomEditorBlock>
  );
};

export default CustomEditor;
