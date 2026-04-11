// src/components/LexicalEditor.tsx
"use client";

import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
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
import { ImageNode } from "./LexicalImageNode";

interface LexicalEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

// Konfigurasi Styling (Tema) Editor
const theme = {
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "mb-4 leading-relaxed text-slate-700 text-lg",
  heading: {
    h1: "text-4xl font-extrabold mb-6 text-slate-800 font-['Plus_Jakarta_Sans']",
    h2: "text-3xl font-bold mt-8 mb-4 text-slate-800 font-['Plus_Jakarta_Sans']",
    h3: "text-2xl font-bold mt-6 mb-3 text-slate-800 font-['Plus_Jakarta_Sans']",
  },
  list: {
    ul: "list-disc list-inside mb-4 pl-4 text-slate-700 text-lg space-y-2",
    ol: "list-decimal list-inside mb-4 pl-4 text-slate-700 text-lg space-y-2",
    listitem: "ml-2",
  },
  quote: "border-l-4 border-emerald-500 bg-emerald-50 p-4 my-6 text-emerald-900 italic rounded-r-lg text-lg",
  code: "bg-slate-100 text-sm font-mono p-1 px-2 rounded-md",
  image: "editor-image",
  link: "text-emerald-600 underline font-medium cursor-pointer hover:text-emerald-800",
};

function onError(error: Error) {
  console.error("Lexical Error:", error);
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
    // DAFTARKAN SEMUA NODE DI SINI, TERMASUK IMAGENODE
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
      ImageNode, // Node baru kita
    ],
    editorState: initialContent || undefined, // Gunakan initialContent jika ada
    editable: editable,
  };

  const handleOnChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(JSON.stringify(editorState.toJSON()));
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative">

        {/* Toolbar hanya muncul jika mode editable (saat membuat/edit artikel) */}
        {editable && <ToolbarPlugin />}

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={`min-h-[500px] outline-none ${!editable ? "bg-transparent" : ""
                }`}
            />
          }
          placeholder={
            <div className={`absolute left-0 text-slate-300 text-lg pointer-events-none ${editable ? 'top-20' : 'top-0'}`}>
              Mulailah mengetik cerita Anda di sini...
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