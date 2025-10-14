"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"; // Pastikan ini diimpor
import { mergeRegister } from "@lexical/utils";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  List,
  Link, // 1. Impor ikon Link
} from "lucide-react";
import {
  $isHeadingNode,
  $createHeadingNode,
} from "@lexical/rich-text";
import {
  $isListItemNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isLink, setIsLink] = useState(false); // 2. State untuk melacak link

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // Cek apakah seleksi adalah link
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // Update block format
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListItemNode(element)) {
          const parentList = element.getParent();
          setBlockType(parentList.getTag());
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.getNodes().forEach((node) => {
            const parent = node.getParent();
            if (parent) {
              const heading = $createHeadingNode(headingSize);
              parent.replace(heading);
              heading.append(node);
            }
          });
        }
      });
    }
  };

  const insertLink = useCallback(() => {
    if (!isLink) {
      const url = prompt("Masukkan URL:");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const buttonCn = (active: boolean) =>
    `p-2 rounded-md hover:bg-slate-200 ${
      active ? "bg-slate-300" : "bg-transparent"
    }`;

  return (
    <div className="p-2 border-b border-slate-300 flex items-center gap-1">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={buttonCn(isBold)}
        aria-label="Format Bold"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={buttonCn(isItalic)}
        aria-label="Format Italic"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={buttonCn(isUnderline)}
        aria-label="Format Underline"
      >
        <Underline className="h-4 w-4" />
      </button>
      {/* 3. Tambahkan tombol Link */}
      <button
        onClick={insertLink}
        className={buttonCn(isLink)}
        aria-label="Insert Link">
        <Link className="h-4 w-4" />
      </button>
      <button
        onClick={() => formatHeading("h1")}
        className={buttonCn(blockType === "h1")}
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className={buttonCn(blockType === "ul")}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}