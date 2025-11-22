Habit Hero - Frontend

React web application for Habit Tracking

📋 Overview

Habit Hero frontend provides a responsive UI for:

Tracking habits

Viewing analytics and streaks

Managing user profile

PDF report generation

Built with React, Material-UI, and Recharts.

🛠 Tech Stack

React 19.2.0

Vite 7.2.4

Material-UI (MUI) 7.3.5

React Router DOM 7.9.6

Axios 1.13.2 (API calls)

Recharts 3.4.1 (analytics charts)

jsPDF 3.0.4 (PDF reports)

React Hook Form 7.66.1 (forms)

⚡️ Features

User Authentication: Login, signup, persistent session

Profile Management: Edit info, profile picture upload

Habit Management: Create, edit, delete habits

Habit Tracking: Check-ins, view history

Analytics Dashboard: Streaks, success rate, charts

PDF Export: Download habits and check-in history

🗂 Project Structure
src/
├── api/                # Axios instance with JWT interceptors
├── components/         # Reusable UI components
├── context/            # Auth state management
├── layout/             # App and Auth layouts
├── pages/              # Dashboard, Habits, Login, Signup
├── routes/             # Route definitions
└── theme/              # Material-UI theme

🚀 Setup

Install dependencies

npm install


Start dev server

npm run dev


Frontend available at http://localhost:5173

Build for production

npm run build

Note: Update baseURL in src/api/axios.js to match backend server.

🎨 UI Features

Responsive Material-UI components

Habit cards with quick check-ins

Analytics charts with Recharts

Modals for habit creation/editing

Snackbar notifications for actions

