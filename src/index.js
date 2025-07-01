// ✅ React core imports
import React from "react";
import ReactDOM from "react-dom/client";

// ✅ Main App component and global styles
import App from "./App";
import "./index.css";

// ✅ Redux store and Provider to make state globally available
import { store } from './store.js';
import { Provider } from 'react-redux';

// ✅ Toast notification system for alerts and actions
import { Toaster } from 'react-hot-toast';

// ✅ Create root element for React to render into
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Render the full app wrapped with all necessary providers
root.render(
  <React.StrictMode>
    {/* 🧠 Redux Provider wraps App to give all components access to the store */}
    <Provider store={store}>
      {/* 🚀 Main App component containing all routes and UI */}
      <App />

      {/* 🔔 Global toaster component for showing success/error messages */}
      <Toaster />
    </Provider>
  </React.StrictMode>
);
