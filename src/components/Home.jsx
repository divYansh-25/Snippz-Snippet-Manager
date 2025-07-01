import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // ✅ For reading and changing URL
import { useDispatch, useSelector } from 'react-redux'; // ✅ For accessing Redux state and actions
import { updateToPastes, addToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = React.useState(''); // ✅ State to hold the paste title
  const [value, setValue] = React.useState(''); // ✅ State to hold the paste content
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ Hook to get query params like ?pasteId=xyz
  const pasteId = searchParams.get('pasteId'); // ✅ Gets pasteId from URL if editing

  const allpastes = useSelector((state) => state.paste.pastes); // ✅ Gets all pastes from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Used to redirect after create/update

  // ✅ If editing a paste (pasteId exists), populate the form fields
  useEffect(() => {
    if (pasteId) {
      const pp = allpastes.find((item) => item._id === pasteId);
      setTitle(pp?.title || '');
      setValue(pp?.content || '');
    }
  }, [pasteId, allpastes]);

  // ✅ Handles creation or updating of a paste
  function createPaste() {
    const isEdit = Boolean(pasteId); // ✅ Checks if we are editing
    const paste = {
      title,
      content: value,
      _id: isEdit
        ? pasteId
        : `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`, // ✅ Unique ID generation for new pastes
      createdAt: new Date().toISOString(), // ✅ Timestamp
    };

    // ✅ Dispatch the correct Redux action
    if (isEdit) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // ✅ Clear input fields and reset URL params
    setTitle('');
    setValue('');
    setSearchParams({});

    // ✅ Redirect to /pastes after saving
    navigate('/pastes');
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-black dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex justify-center">
      <div className="w-full max-w-3xl bg-white/5 dark:bg-zinc-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-purple-600/20">

        {/* ✅ Title input + Create/Update button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            className="w-full p-3 rounded-xl text-lg text-black font-medium bg-white dark:bg-zinc-700 dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Enter Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)} // ✅ Updates title state
          />
          <button
            onClick={createPaste}
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl font-medium shadow-md transition"
          >
            {pasteId ? 'Update Snippet' : 'Create Snippet'} {/* ✅ Button label changes */}
          </button>
        </div>

        {/* ✅ Content Textarea */}
        <textarea
          className="w-full p-4 rounded-xl text-black bg-white dark:bg-zinc-700 dark:text-white resize-none shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={18}
          placeholder="Enter Your Content Here..."
          value={value}
          onChange={(e) => setValue(e.target.value)} // ✅ Updates content state
        />
      </div>
    </div>
  );
};

export default Home;
