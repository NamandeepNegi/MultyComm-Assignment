# 🌐 MultyComm Assignment — Full Stack App

This project implements a **Full-Stack Form** for capturing client data, saving it to MongoDB, and sending conditional email notifications based on the selected **Disposition**.

It was designed and developed with a **production-quality architecture**.

---

## 🚀 Project Overview

### 🎯 Goal
Build a **data capture form** that:
1. Collects user information (name, company, gender, etc.)
2. Stores it in a MongoDB database
3. Sends an email to a specific address depending on the chosen **Disposition**
4. Skips email if the user selects **“General Enquiry”**

### 🧩 Example Workflow
- User fills out the form and selects **“Customer Support”**
- Data is saved in MongoDB
- An email is automatically sent to **ayan@multycomm.com**
- If the user selects **“General Enquiry”**, only DB entry is created (no email sent)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 18 + Vite 5 + Axios |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Email Service** | Nodemailer + Gmail SMTP |
| **Styling** | Plain CSS (modern clean design) |
| **Environment** | `.env` configuration for secrets |

---

## 🧱 Folder Structure

```bash
multycomm-assignment/
├─ backend/
│ ├─ server.js
│ ├─ config/
│ │ └─ db.js
│ ├─ models/
│ │ └─ Enquiry.js
│ ├─ routes/
│ │ └─ enquiries.js
│ ├─ services/
│ │ └─ mailer.js
│ ├─ package.json
│ └─ .env.example
│
├─ frontend/
│ ├─ src/
│ │ ├─ App.jsx
│ │ ├─ main.jsx
│ │ ├─ components/
│ │ │ └─ EnquiryForm.jsx
│ │ └─ styles.css
│ ├─ vite.config.js
│ ├─ package.json
│ └─ .env
│
└─ README.md
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/NamandeepNegi/multycomm-assignment.git
cd multycomm-assignment
```

### 2️⃣ Backend Setup
```bash
cd backend
cp .env.example .env
npm install
```

#### .ENV File
```bash
PORT=5000
MONGODB_URI=mongodb+srv://neginaman8586_db_user:DzGDWtuPw2vimXaC@cluster0.ohfazzc.mongodb.net/multycomm?retryWrites=true&w=majority

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=neginaman8586@gmail.com
SMTP_PASS=xfblepnakmqlrckj
FROM_NAME="MultyComm Form"
FROM_EMAIL=neginaman8586@gmail.com
```

#### Start Backend
```bash
npm run dev
```

Backend will start on 👉 http://localhost:5000

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

#### Create .env in the frontend/ folder:
```bash
VITE_API_URL=http://localhost:5000
```
#### Start frontend:
```bash
npm run dev
```



