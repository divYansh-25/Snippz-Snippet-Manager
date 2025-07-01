// ✅ Import core styles and components
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

// ✅ Import router tools from React Router v6
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ✅ Define all app routes using createBrowserRouter
const router = createBrowserRouter([
  {
    // 🏠 Root path: Home page with Navbar and snippet input
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    // 📋 All Snippets page: Displays saved pastes with action buttons
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    // 👁️ View Paste page: Shows a single snippet in read-only mode
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

// ✅ Main App Component that renders the correct route
function App() {
  return (
    <div>
      {/* 🚀 RouterProvider injects the routing system into your app */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
