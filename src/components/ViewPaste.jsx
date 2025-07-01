import React from 'react';
import { useParams } from 'react-router-dom'; // ✅ To access URL parameters (i.e., paste ID)
import { useSelector } from 'react-redux'; // ✅ To read pastes from Redux store
import { toast } from 'react-hot-toast'; // ✅ For success notifications
import copy from '../assets/copy.png'; // ✅ Copy icon

const ViewPaste = () => {
  const { id } = useParams(); // ✅ Extract paste ID from URL
  const allpastes = useSelector((state) => state.paste.pastes); // ✅ Get all pastes from Redux store

  const paste = allpastes.find((item) => item._id === id); // ✅ Find the paste by ID

  // ✅ If paste with the given ID does not exist, show a fallback message
  if (!paste) {
    return (
      <div className="text-white text-center mt-20 text-lg">
        Paste not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-black dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex justify-center">
      <div className="w-full max-w-3xl bg-white/5 dark:bg-zinc-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-purple-600/20">

        {/* Title (Read-Only) */}
        <input
          className="w-full p-3 rounded-xl text-lg text-black font-semibold mb-6 bg-white dark:bg-zinc-700 dark:text-white shadow-inner focus:outline-none"
          type="text"
          value={paste?.title} // ✅ Title of the paste
          placeholder="Paste Title"
          disabled // ✅ Read-only input
        />

        {/* Copy Button */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md transition"
            onClick={() => {
              navigator.clipboard.writeText(paste?.content); // ✅ Copy content to clipboard
              toast.success('Copied to clipboard'); // ✅ Toast notification
            }}
          >
            <img src={copy} alt="Copy" className="h-4 w-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
        </div>

        {/* Content Textarea (Read-Only) */}
        <textarea
          className="w-full p-4 rounded-xl text-black bg-white dark:bg-zinc-700 dark:text-white resize-none shadow-md"
          rows={18}
          placeholder="Paste content..."
          value={paste?.content} // ✅ Main content of the paste
          disabled // ✅ Read-only textarea
        />
      </div>
    </div>
  );
};

export default ViewPaste;
