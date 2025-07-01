import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// ✅ Initial state: Load pastes from localStorage (persistent data between reloads)
const initialState = {
    pastes: localStorage.getItem('pastes')
        ? JSON.parse(localStorage.getItem('pastes'))
        : [],
};

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,

    // ✅ Reducers handle the state transitions (like add, update, remove, reset)
    reducers: {
        // ✅ Add a new paste/snippet
        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste); // Add to Redux store
            localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Sync with localStorage

            // ✅ Show success toast
            toast('Snippet Created'
                , {
                      icon: '✅',
                      style: {

                        background: '#1f1f1f',
                        color: '#fff',
                        border: '1px solid #888',
                      },
                    }
            );
        },

        // ✅ Update an existing paste/snippet
        updateToPastes: (state, action) => {
            const paste = action.payload;

            // ✅ Find the index by matching unique _id
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste; // Replace the existing paste at that index
                localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Update localStorage
                toast.success('Snippet Updated'
                    , {
                      icon: '✅',
                      style: {

                        background: '#1f1f1f',
                        color: '#fff',
                        border: '1px solid #888',
                      },
                    }
                ); // ✅ Show update toast
            }
        },

        // ✅ Reset/Delete all pastes from Redux + localStorage
        resetAllPaste: (state, action) => {
            state.pastes = []; // Clear Redux state
            localStorage.removeItem('pastes'); // Remove from localStorage
        },

        // ✅ Remove a single paste by ID
        removeFromPaste: (state, action) => {
            const pasteId = action.payload;

            // ✅ Find the paste index using _id
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1); // ✅ Remove from array
                localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Update localStorage
                toast.success('Snippet Deleted'); // ✅ Show deletion toast
            }
        },
    },
});

// ✅ Export actions to use in components (Home.jsx, Paste.jsx, etc.)
export const { addToPastes, updateToPastes, resetAllPaste, removeFromPaste } = pasteSlice.actions;

// ✅ Export reducer to include in store.js
export default pasteSlice.reducer;
