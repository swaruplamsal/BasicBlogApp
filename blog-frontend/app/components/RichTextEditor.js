"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { imageApi } from "../../lib/api";

export default function RichTextEditor({ content, onChange }) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Send HTML back to parent
      onChange(editor.getHTML());
    },
  });

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      try {
        // Upload to your Django backend
        const result = await imageApi.upload(file);

        // Insert image into editor
        editor.chain().focus().setImage({ src: result.url }).run();
      } catch (err) {
        alert("Upload failed: " + err.message);
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  if (!editor) return null;

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border-b border-slate-700">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
          type="button"
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
          type="button"
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
          type="button"
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
          type="button"
        >
          • List
        </button>

        <button
          onClick={addImage}
          disabled={uploading}
          className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          type="button"
        >
          {uploading ? "Uploading..." : "🖼️ Image"}
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-100 focus:outline-none"
      />
    </div>
  );
}
