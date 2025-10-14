"use client";

import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "./ToolbarPlugin";

interface LexicalEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const theme = {
  // Your theme styles here. For brevity, we'll use a basic setup.
  // Find more examples at https://lexical.dev/docs/themes/creating-a-theme
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "mb-2",
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold mb-3",
    h3: "text-2xl font-bold mb-2",
  },
  list: {
    ul: "list-disc list-inside",
    ol: "list-decimal list-inside",
  },
  quote: "border-l-4 border-gray-300 pl-4 italic",
  code: "bg-gray-100 text-sm font-mono p-1 rounded",
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function LexicalEditor({
  onChange,
  initialContent,
  editable = true,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: initialContent,
    editable: editable,
  };

  const handleOnChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(JSON.stringify(editorState.toJSON()));
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative bg-white border border-slate-300 rounded-md">
        {editable && <ToolbarPlugin />}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={`min-h-56 p-4 outline-none ${!editable ? "bg-slate-50" : ""
                }`}
            />
          }
          placeholder={
            <div className={`absolute left-4 text-gray-400 pointer-events-none ${editable ? 'top-14' : 'top-4'}`}>
              Mulai menulis...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {onChange && <OnChangePlugin onChange={handleOnChange} />}
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
}