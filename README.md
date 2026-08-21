# Vibrant SaaS Signup - Full-Stack Web Application

A production-ready full-stack web application reproducing the Stitch design **"Vibrant SaaS Signup UI"** (Project ID: `16740477658906362637`) with a React/Vite frontend, Node/Express REST backend, MySQL database persistence, WebGL fragment shader & Three.js 3D elements, and real JWT authentication.

---

## 🚀 Features & Highlights

- **Stitch Design Fidelity**: 1:1 reproduction of the Vibrant SaaS Signup design using high-contrast typography, WebGL organic shader, Three.js floating objects, and glassmorphism panels.
- **Enforced Light Theme**: Built using a bright, clean surface palette (`#f7f9fb`), vibrant primary blue (`#0040df`), purple (`#883ca6`), and pink (`#a80054`) accents.
- **Real MySQL Data Store**: Full user registration, password hashing (`bcryptjs`), and persistence in MySQL table `users`.
- **JWT Session Security**: Secure token issuance, protected routes (`/dashboard`, `/profile`), automatic session persistence, and logout flow.
- **Dynamic UX**: Real-time email validation, 3-tier password strength indicator meter, show/hide password toggle, and loading/error states.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS + Modern CSS Glassmorphism
- **Graphics / 3D**: WebGL Canvas Shader + Three.js / React Three Fiber
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing & HTTP**: React Router v6 + Axios

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MySQL 8.0 (`mysql2/promise`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **Environment**: `dotenv` + `cors`

---

## 📂 Project Structure

```text
vibrant-saas-signup/
│
├── client/                      # Frontend Application
│   ├── src/
│   │   ├── assets/
│   │   ├── components/          # Reusable UI & WebGL Canvas components
│   │   │   ├── canvas/          # ShaderBackground.jsx & ThreeInteractiveScene.jsx
│   │   │   ├── layout/          # Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global Auth State & Token Management
│   │   ├── pages/               # Application Pages
│   │   │   ├── SignupPage.jsx   # Exact reproduction of Stitch Signup design
│   │   │   ├── LoginPage.jsx    # Matching visual Login Page
│   │   │   ├── DashboardPage.jsx# Authenticated SaaS Dashboard
│   │   │   ├── ProfilePage.jsx  # Authenticated User Profile
│   │   │   └── NotFoundPage.jsx # Styled 404 Page
│   │   ├── services/
│   │   │   └── api.js           # Centralized Axios API Service
│   │   ├── App.jsx              # Router & App Wrapper
│   │   ├── index.css            # Tailwind & Glassmorphic CSS
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend API Server
│   ├── config/
│   │   └── db.js                # mysql2 Pool Configuration & Ping Check
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, Me, Logout
│   │   └── userController.js    # Profile Handler
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT Bearer Token Verification
│   │   └── errorMiddleware.js   # Global Error Handler
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── userRoutes.js        # /api/users
│   │   └── healthRoutes.js      # /api/health
│   ├── services/
│   │   └── authService.js       # User Queries & Password Hashing
│   ├── utils/
│   │   └── jwtUtils.js          # Token Sign & Verify
│   ├── server.js                # Express Entrypoint
│   ├── package.json
│   └── .env.example
│
├── database/
│   ├── schema.sql               # MySQL Table Creation (users)
│   └── seed.sql                 # Sample Seed Data
│
├── README.md
└── .gitignore
```

---

## 🗄️ Database Setup Instructions

1. Ensure MySQL server is running on your machine (default port `3306`).
2. Open your MySQL client (e.g. MySQL Workbench, TablePlus, or CLI) and run `database/schema.sql`:

```bash
mysql -u root -p < database/schema.sql
```

3. (Optional) Run `database/seed.sql` to populate initial demo data:

```bash
mysql -u root -p < database/seed.sql
```

---

## 🔑 Environment Variables Setup

Configure `server/.env` with your database credentials:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vibrant_saas
JWT_SECRET=vibrant_saas_super_secret_jwt_key_2026!
CLIENT_URL=http://localhost:5173
```

---

## ⚡ Quick Start Guide

### 1. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

The Express API server will start at `http://localhost:5000` and display the MySQL connection ping status in the console.

### 2. Start the Frontend Client

```bash
cd client
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Specification

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | No | Server & MySQL DB health check |
| `POST` | `/api/auth/register` | No | Registers user, hashes password, returns JWT token |
| `POST` | `/api/auth/login` | No | Authenticates credentials & returns JWT token |
| `GET` | `/api/auth/me` | Yes | Returns current authenticated user object |
| `POST` | `/api/auth/logout` | No | Ends session response |
| `GET` | `/api/users/profile` | Yes | Fetches full profile details from MySQL |
