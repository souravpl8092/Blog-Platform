# 📝 Blog Platform

A full-featured blog platform where users can create, read, update, delete (CRUD), like, and comment on blog posts across categories like food, finance, travel, and health. Built using the MERN stack (MongoDB, Express, React, Node.js) with Redux Toolkit and Toast notifications for enhanced UX.

---

## ✨ Key Features

🧑‍💼 User authentication (protected routes)

📝 Create, edit, and delete your own blogs

🔍 Filter blogs by tags (Food, Finance, Travel, Health, etc.)

❤️ Like and 💬 comment on blogs

🧾 User profile management

🔁 Real-time UI updates after blog actions

⚡ Loading spinners and toasts for feedback

💅 Responsive and clean UI

---

## 🛠 Tech Stack

### **Frontend**

- React.js
- Vite
- Redux Toolkit (State Management)
- react-icons (for icons)

### **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) Authentication

---

## 📂 Folder Structure

```
blog-platform/
├── client/                 # Frontend (React + Redux)
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store & slices
│   │   ├── styles/         # Global styles
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Root component
│   │   ├── main.tsx        # Entry point
│   ├── package.json        # Frontend dependencies
│
├── server/                 # Backend (Node.js + Express)
│   ├── controllers/        # API request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── config/             # Environment config
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/souravpl8092/Blog-Platform.git
cd blog-platform
```

### **2️⃣ Install dependencies**

#### **Frontend**

```sh
cd client
npm install
```

#### **Backend**

```sh
cd server
npm install
```

---

## ⚙️ Configuration

### **1️⃣ Backend Environment Variables**

Create a `.env` file in the `server/` directory and configure the following:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **2️⃣ Frontend Environment Variables**

Create a `.env` file in the `client/` directory and configure the following:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Running the Project

### **1️⃣ Start Backend**

```sh
cd server
npm run dev
```

### **2️⃣ Start Frontend**

```sh
cd client
npm run dev
```

The frontend will be accessible at `http://localhost:5173`

---

## 🧪 Features Demo

| Action          | Description                           |
| --------------- | ------------------------------------- |
| `Create Blog`   | Submit form with title, content & tag |
| `Like Blog`     | Click like button (toggle like)       |
| `Comment Blog`  | Add and view comments per post        |
| `Edit Profile`  | Update name and email                 |
| `Edit Blog`     | Only for your own blogs               |
| `Filter by Tag` | Buttons to show blogs by category/tag |

---

## 📌 License

This project is **open-source** and available under the **MIT License**.

---

Made with ❤️ by [Sourav Paul](https://github.com/souravpl8092) 🚀

---
