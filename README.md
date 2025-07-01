#Snippz - Snippet Manager

Snippz is a modern React.js application that allows users to create, manage, and share text snippets ("pastes,code,any type of text") easily. It's designed with a beautiful gradient background, glassmorphism UI, and fully supports both light and dark themes. Built using React, Redux Toolkit, Tailwind CSS, and React Router.

##🚀 Features

🔨 Core Functionalities:

Create Snippet: Add new pastes with a title and content

Update Snippet: Edit any existing snippet by ID

Delete Snippet: Remove unwanted pastes from local storage

Copy Content: Easily copy the content of any snippet to clipboard

Share Snippet: Generate a shareable link for each paste

View Snippet: Navigate to a dedicated view page for any paste

Search Snippets: Real-time search based on paste titles

##💡 UI Features:

Light/Dark Mode Friendly: Automatically adapts to user system theme

Modern Glassmorphism Design: Using Tailwind’s transparency and backdrop-blur

Color-Coded Action Buttons: Intuitive edit, view, delete, copy, share buttons with icons

##📁 Folder Structure

├── assets/             # All icons and images
├── components/         # Paste, ViewPaste, Home Components
├── redux/              # Redux slice for managing pastes
├── App.jsx             # Route definitions
├── index.js            # App entry, Redux + Toaster setup
├── store.js            # Redux store configuration

##⚙️ Tech Stack

React.js – Frontend framework

Redux Toolkit – State management

React Router DOM – Routing and navigation

Tailwind CSS – Modern utility-first styling

React Hot Toast – Notification system

##📦 Local Storage

All pastes are persisted in browser localStorage, allowing the app to retain state even after reloads.

##🧠 Project Logic

Home.jsx: Responsible for creating and updating snippets. It uses useSearchParams to detect edit mode via ?pasteId=...

Paste.jsx: Lists all pastes with search functionality and action buttons for each snippet.

ViewPaste.jsx: Displays a single paste in read-only mode with a copy option.

pasteSlice.js: Redux slice with reducers for adding, updating, and removing pastes. Automatically syncs state with localStorage.

##🛠️ Setup Instructions

to be added...

# Install dependencies
npm install

# Start the development server
npm start

##🔐 Future Improvements

Firebase/Auth-based storage for real user-based pastes

Expiry options or visibility controls for each snippet

Markdown support or syntax highlighting

##🙌 Author

Divyansh Yadav --->> Made with 💜 using React + Tailwind

🌐 Live Demo

https://snippz-snippet-manager.vercel.app/pastes

