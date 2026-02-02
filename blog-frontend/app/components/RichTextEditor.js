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
    <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-900/50 shadow-xl">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            editor.isActive("bold")
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
          type="button"
        >
          <span className="font-bold">B</span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            editor.isActive("italic")
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
          type="button"
        >
          <span className="italic">I</span>
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
          type="button"
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            editor.isActive("bulletList")
              ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
          type="button"
        >
          • List
        </button>

        <div className="h-8 w-px bg-slate-700/50 mx-1"></div>

        <button
          onClick={addImage}
          disabled={uploading}
          className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-500/20"
          type="button"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "🖼️ Insert Image"
          )}
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="p-6 min-h-[500px] focus:outline-none
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:text-slate-300
          [&_.ProseMirror]:text-base
          [&_.ProseMirror]:leading-relaxed
          [&_.ProseMirror]:min-h-[450px]
          [&_.ProseMirror_p]:mb-4
          [&_.ProseMirror_h2]:text-4xl
          [&_.ProseMirror_h2]:font-bold
          [&_.ProseMirror_h2]:bg-gradient-to-r
          [&_.ProseMirror_h2]:from-red-400
          [&_.ProseMirror_h2]:to-amber-400
          [&_.ProseMirror_h2]:bg-clip-text
          [&_.ProseMirror_h2]:text-transparent
          [&_.ProseMirror_h2]:mt-8
          [&_.ProseMirror_h2]:mb-4
          [&_.ProseMirror_h2]:leading-tight
          [&_.ProseMirror_strong]:text-slate-100
          [&_.ProseMirror_strong]:font-bold
          [&_.ProseMirror_em]:italic
          [&_.ProseMirror_em]:text-slate-400
          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:ml-6
          [&_.ProseMirror_ul]:my-4
          [&_.ProseMirror_ul]:space-y-2
          [&_.ProseMirror_li]:text-slate-300
          [&_.ProseMirror_img]:rounded-xl
          [&_.ProseMirror_img]:my-6
          [&_.ProseMirror_img]:max-w-full
          [&_.ProseMirror_img]:border
          [&_.ProseMirror_img]:border-slate-700/50
          [&_.ProseMirror_img]:shadow-2xl
          [&_.ProseMirror_img]:shadow-black/50
          [&_.ProseMirror:focus]:outline-none
          [&_.ProseMirror]:placeholder:text-slate-600"
      />

      {/* Helper Text */}
      <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700/50">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Tip:</span> Use the
          toolbar above to format your content. Click the image button to insert
          images anywhere in your post.
        </p>
      </div>
    </div>
  );
}
