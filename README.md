# 🚀 LeadFlow CRM    
   
## Manufacturing Sales & Lead Pipeline Management System    
  
LeadFlow CRM is a modern full-stack MERN application designed for managing sales leads, client workflows, and Business Development Associate (BDA) team operations for a manufacturing company. 
 
The platform helps organizations efficiently track lead pipelines, manage client communication, monitor sales performance, and improve workflow productivity through an intuitive dashboard and Kanban-based pipeline system.
  
---        
          
# 📌 Features         
              
## 🔐 Authentication System           
- User Registration      
- User Login    
- JWT Authentication             
- Protected Routes    
- Secure Password Hashing   
  
---
  
## 📊 Dashboard
- Total Leads Overview 
- Won Deals Statistics
- Lost Deals Tracking
- Pending Follow-ups
- Sales Activity Monitoring
- Team Performance Metrics

---

## 🧾 Lead Management
- Create Leads
- Update Leads
- Delete Leads
- Search & Filter Leads
- Assign Leads to Employees
- Follow-up Tracking

### Lead Workflow
```txt
New → Contacted → Negotiation → Won / Lost
```

---

## 📌 Kanban Pipeline Board
- Drag-and-drop workflow management
- Trello/Jira-style pipeline
- Visual sales tracking
- Status-based lead organization

---

## 👨‍💼 Team Performance
- Employee Lead Statistics
- Conversion Tracking
- Lead Handling Metrics
- Performance Monitoring

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS / Tailwind-style UI

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📂 Project Structure

```txt
LeadFlow-CRM/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    ├── server.js
    └── package.json
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/leadflow-crm.git
```

---

# 🔧 Backend Setup

## Navigate to server folder

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Run backend server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to client folder

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🔌 API Endpoints

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

## 📌 Lead APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get all leads |
| POST | `/api/leads` | Create new lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |

---

## 📊 Dashboard APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/stats` | Get dashboard statistics |

---

# 🌐 Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

---

# 🚀 Deployment

## Frontend Deployment
- Vercel

## Backend Deployment
- Render

## Database
- MongoDB Atlas

---

# 📈 Future Improvements

- Real-time notifications
- Email integration
- Advanced analytics
- Calendar scheduling
- Role-based permissions
- File attachments
- Activity logs

---

# 👨‍💻 Author

### Arunava Chakraborty
