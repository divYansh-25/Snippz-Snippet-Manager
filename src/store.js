// ✅ Import Redux Toolkit's configureStore to create the global store
import { configureStore } from '@reduxjs/toolkit';

// ✅ Import the reducer (slice) that manages all paste/snippet logic
import pasteReducer from './redux/pasteSlice';

// ✅ Create and export the Redux store
export const store = configureStore({
  reducer: {
    // 🧠 'paste' key will be used in useSelector() to access paste state
    paste: pasteReducer,
  },
});
