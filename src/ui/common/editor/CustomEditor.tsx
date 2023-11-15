import dynamic from "next/dynamic";
import React, {
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import CustomToolbar, { CustomToolbarPosition } from "./CustomToolbar";
import "react-quill/dist/quill.snow.css";
import { QuillStyle } from "@/styles/quillStyle";
import { colors } from "@/styles/colors";
import { uniqueId } from "lodash";
import SkeletonBox from "../skeleton/SkeletonBox";

const CustomEditorBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .quill {
    ${QuillStyle};
    flex-shrink: 0;
    .ql-container.ql-snow {
      border: none;
      border-bottom: 1px solid #ccc;
    }
    .ql-editor {
      padding: 0;
      padding-bottom: 3px;
    }
    .ql-editor.ql-blank::before {
      left: 0px;
      right: 0px;
      font-style: normal;
      color: ${colors.gray_400};
    }
  }
`;

const formats: ComponentProps<typeof ReactQuill>["formats"] = [
  "bold",
  "italic",
  "color",
];

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <SkeletonBox width="100%" height="22.45px" /> }
);

interface CustomEditorProps {
  onChangeText: (value: string) => void;
  placeholder?: string;
}

const CustomEditor: React.FC<CustomEditorProps> = ({
  onChangeText,
  placeholder = "내용을 작성해주세요.",
}) => {
  const uniqueKey = useMemo(uniqueId, []);
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const savedToolbarPosition = useRef<CustomToolbarPosition | null>(null);
  const [toolbarPosition, setToolbarPosition] =
    useState<CustomToolbarPosition | null>(null);

  const modules: ComponentProps<typeof ReactQuill>["modules"] = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = document.getSelection();
      if (selection?.toString() && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const startNode = range.startContainer;
        let parentElement = startNode.parentNode;
        const rect = range.getBoundingClientRect();
        while (parentElement) {
          if (
            parentElement instanceof HTMLElement &&
            parentElement.dataset.key === String(uniqueKey)
          ) {
            if (!toolbarPosition) {
              const position = {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY - rect.height * 2 - 25,
              };
              setToolbarPosition(position);
              savedToolbarPosition.current = position;
            }
            break;
          }
          parentElement = parentElement.parentNode;
        }
      } else {
        setToolbarPosition(null);
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);
  return (
    <CustomEditorBlock data-key={uniqueKey}>
      <CustomToolbar
        staticPosition={savedToolbarPosition.current}
        position={toolbarPosition}
        reactQuillRef={reactQuillRef}
      />
      <ReactQuillWrapper
        theme="snow"
        forwardedRef={reactQuillRef}
        formats={formats}
        modules={modules}
        onChange={onChangeText}
        placeholder={placeholder}
      />
    </CustomEditorBlock>
  );
};

export default CustomEditor;
