🚀 MERN Stack Assignment – Agent & Leads Management
📌 Project Overview

This is a MERN stack application built as part of the internship machine test.
It allows an Admin to:

Login with JWT authentication

Manage Agents (Add / View Agents)

Upload Leads via CSV/XLSX/XLS

Automatically distribute leads equally among 5 agents

Prevent duplicate leads using phone number (unique constraint)

View all leads with filtering by assigned agent

🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS, React Router

Backend: Node.js, Express.js, JWT Auth, Multer, XLSX

Database: MongoDB Atlas (Mongoose ODM)

⚙️ Installation & Setup
1. Clone the repository
git clone <https://github.com/Vanraj7>
cd mern

2. Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run dev


Backend will start on http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install


Run frontend:

npm run dev


Frontend will start on http://localhost:5173

🔑 Admin Login

Admin user credentials are stored in MongoDB.

Use Login Page (/) with Email + Password.

On success → token is saved in localStorage and you are redirected to Dashboard.

On logout → token is cleared.

📂 Features
1. Admin Dashboard

Central hub with navigation to:

Manage Agents

Upload Leads

View Leads

Logout

2. Manage Agents

Add new agents with:

Name

Email

Mobile (with country code)

Password

View list of all agents.

3. Upload Leads

Upload CSV/XLSX/XLS file with columns:

FirstName (Text)

Phone (Number)

Notes (Text)

Leads distributed equally among 5 agents (round-robin).

Duplicate prevention (based on Phone).

Response shows Inserted vs Skipped counts.

4. View Leads

Table view of all leads.

Dropdown filter by agent.

Shows:

First Name

Phone

Notes

Assigned Agent

📹 Video Demonstration

A working demo video is available on Google Drive:
👉 https://drive.google.com/file/d/1E5CIRo1PaI2XFdKnNoPq-1KKm9rwwwDc/view?usp=drive_link

✅ Evaluation Criteria Mapping

Functionality: All assignment requirements implemented.

Code Quality: Modular backend, clean React components.

Validation & Error Handling: File type checks, duplicate prevention, JWT auth.

User Interface: Simple Tailwind-based UI with dashboard navigation.

Execution: Easy setup with clear README.

👨‍💻 Author

Developed by Vanraj Jhala for CS Tech Machine Test (MERN Stack Developer Internship).