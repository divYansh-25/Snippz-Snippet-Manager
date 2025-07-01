import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux for global state management
import { removeFromPaste } from '../redux/pasteSlice'; // Redux action to delete a paste
import toast from 'react-hot-toast'; // Notification for user actions
import { Link } from 'react-router-dom'; // Navigation between pages
import del from '../assets/del.png'; // Delete icon
import copy from '../assets/copy.png'; // Copy icon
import edit from '../assets/edit.png'; // Edit icon
import view from '../assets/view.png'; // View icon
import share from '../assets/share.png'; // Share icon

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes); // ✅ Fetches all saved pastes from Redux store
  const [searchTerm, setSearchTerm] = React.useState(''); // ✅ Stores search input to filter pastes
  const dispatch = useDispatch(); // ✅ Used to dispatch actions like delete

  // ✅ Filters pastes based on the search term in real time (case-insensitive)
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Handles delete button click by dispatching action with paste._id
  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-black dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex flex-col items-center">

      {/* Search */}
      <input
        type="text"
        placeholder="Search Your Pastes..."
        className="w-full max-w-lg mb-8 p-3 rounded-xl text-base shadow-md text-black dark:text-white bg-white dark:bg-zinc-700 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // ✅ Updates searchTerm on user typing
      />

      {/* Pastes List */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {filteredData.map((paste) => (
          <div
            // key={paste._id}
            key={`${paste._id}-${paste.createdAt}`} // ✅ Prevents duplication even if _id is same

            className="rounded-2xl overflow-hidden shadow-xl bg-white/10 dark:bg-zinc-800/60 backdrop-blur-md border border-purple-700/30"
          >
            {/* Title */}
            <div className="bg-purple-800  text-black text-center font-semibold text-lg sm:text-xl py-4 px-6">
              {paste.title}
            </div>

            {/* Content */}
            <div className="p-4 text-sm sm:text-base text-white dark:text-white whitespace-pre-wrap break-words">
              {paste.content}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 px-4 pb-3 justify-end">

              {/* Edit Button - opens Home.jsx with pasteId in query */}
              <Link to={`/?pasteId=${paste._id}`}>
                <button
                  title='Edit'
                  className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded-lg transition flex items-center"
                >
                  <img src={edit} alt="Edit" className="w-5 h-5" />
                </button>
              </Link>

              {/* View Button - opens ViewPaste.jsx for this paste */}
              <Link to={`/pastes/${paste._id}`}>
                <button
                  title='View'
                  className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition flex items-center"
                >
                  <img src={view} alt="View" className="w-5 h-5" />
                </button>
              </Link>

              {/* Delete Button - removes paste from store */}
              <button
                onClick={() => handleDelete(paste._id)} // ✅ Uses _id to delete correctly
                title='Delete'
                className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition flex items-center"
              >
                <img src={del} alt="Delete" className="w-5 h-5" />
              </button>

              {/* Copy Button - copies content to clipboard */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content); // ✅ Native copy API
                  toast.success('Copied to clipboard'
                    , {
                      icon: '✅',
                      style: {

                        background: '#1f1f1f',
                        color: '#fff',
                        border: '1px solid #888',
                      },
                    }
                  ); // ✅ Shows notification
                }}
                title='Copy'
                className="bg-purple-700 hover:bg-purple-800 p-2 rounded-lg transition flex items-center"
              >
                <img src={copy} alt="Copy" className="w-5 h-5" />
              </button>

              {/* Share Button - copies current URL + pasteId */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + `/pastes/${paste._id}`); // ✅ Shares valid URL
                  toast.success('Link copied to clipboard'
                    , {
                      icon: '✅',
                      style: {

                        background: '#1f1f1f',
                        color: '#fff',
                        border: '1px solid #888',
                      },
                    }
                  );
                }}
                title='Share'
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition flex items-center"
              >
                <img src={share} alt="Share" className="w-5 h-5" />
              </button>
            </div>

            {/* Date */}
            <div className="text-xs text-center text-gray-300 dark:text-gray-400 pb-4">
              {new Date(paste.createdAt).toLocaleString()} {/* ✅ Human-readable timestamp */}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-gray-300 dark:text-gray-400 text-center mt-8 text-sm">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
