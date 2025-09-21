# 🚀 MERN Stack Assignment – Agent & Leads Management  

## 📌 Project Overview  
This is a **MERN stack application** built as part of the internship machine test.  
It allows an Admin to:  
- 🔐 Login with JWT authentication  
- 👨‍💼 Manage Agents (Add / View Agents)  
- 📂 Upload Leads via CSV/XLSX/XLS  
- ⚖️ Automatically distribute leads equally among 5 agents  
- 🚫 Prevent duplicate leads using phone number (unique constraint)  
- 📊 View all leads with filtering by assigned agent  

---

## 🛠️ Tech Stack  
- **Frontend:** React (Vite), Tailwind CSS, React Router  
- **Backend:** Node.js, Express.js, JWT Auth, Multer, XLSX  
- **Database:** MongoDB Atlas (Mongoose ODM)  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Vanraj7/mern-agent-leads-manager.git
cd mern-agent-leads-manager

```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a .env file inside backend/:
```bash 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```
➡️ Backend runs at: http://localhost:5000

---
### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

➡️ Frontend runs at: http://localhost:5173
---
🔑 Admin Login
---
- Admin credentials are stored in MongoDB.

- Use Login Page (/) with Email + Password.

- On success → token is saved in localStorage and redirects to Dashboard.

- On logout → token is cleared.

📂 Features
---
📌 Admin Dashboard
---

- Central hub with navigation:

- Manage Agents

- Upload Leads

- View Leads

- Logout
---
👨‍💼 Manage Agents
---
Add new agents with:

- Name

- Email

- Mobile (with country code)

- Password

- View list of all agents.

📂 Upload Leads
---
Upload CSV/XLSX/XLS file with columns:

  - FirstName (Text)

  - Phone (Number)

  - Notes (Text)

  - Leads distributed equally among 5 agents (round-robin).

  - Duplicate prevention (based on Phone).

  - Response shows Inserted vs Skipped counts.

📊 View Leads
---
- Table view of all leads.

- Dropdown filter by agent.

Shows:

  - First Name

  - Phone

  - Notes

  - Assigned Agent
---
📸 Screenshots
--- 
Login Page, Dashboard, Agents, Upload Leads, Leads Table

<img width="559" height="353" alt="image" src="https://github.com/user-attachments/assets/6736486a-0e91-4eb1-b604-32254573f009" />
<img width="559" height="353" alt="image" src="https://github.com/user-attachments/assets/7f13bd20-4e07-416d-b7ab-673579cf5583" />
<img width="1364" height="405" alt="image" src="https://github.com/user-attachments/assets/d925a4c8-9388-4644-9753-a084fd1d1444" />
<img width="1364" height="300" alt="image" src="https://github.com/user-attachments/assets/c033e882-d9dd-443c-8d9e-9dc3b5fe5645" />
<img width="1364" height="435" alt="image" src="https://github.com/user-attachments/assets/2ca3a6c8-2e9b-4412-bf3f-69d88bc155de" />






✅ Criteria Mapping
---
- Functionality: All assignment requirements implemented.

- Code Quality: Modular backend, clean React components.

- Validation & Error Handling: File type checks, duplicate prevention, JWT auth.

- User Interface: Simple Tailwind-based UI with dashboard navigation.

- Execution: Easy setup with clear README.

---
