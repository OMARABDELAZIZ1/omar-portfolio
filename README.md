# Omar Abdelaziz — Full-Stack Developer Portfolio

A production-ready full-stack portfolio built with **React + Vite** (frontend) and **Node.js + Express** (backend), featuring JWT authentication, MySQL database with in-memory fallback, admin dashboard, and more.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- MySQL 8+ (optional — falls back to in-memory store automatically)

### 1. Install Dependencies

```bash
# From the root directory:
npm run install:all

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

Edit `backend/.env` with your settings:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# MySQL (leave empty to use in-memory store)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=omar_portfolio

# Admin credentials
ADMIN_EMAIL=omarabdelaziz4673@gmail.com
ADMIN_PASSWORD=OmarAdmin@123

FRONTEND_URL=http://localhost:3000
```

### 3. Run in Development

```bash
# Both servers at once (requires root npm install first):
npm run dev

# Or run separately:
npm run dev:backend   # → http://localhost:5000
npm run dev:frontend  # → http://localhost:3000
```

---

## 📁 Project Structure

```
omar-portfolio/
├── backend/
│   ├── config/
│   │   └── db.js          ← MySQL + in-memory DB abstraction
│   ├── middleware/
│   │   └── auth.js        ← JWT middleware
│   ├── routes/
│   │   ├── auth.js        ← POST /api/auth/login, GET /api/auth/verify
│   │   ├── projects.js    ← CRUD /api/projects
│   │   ├── contact.js     ← POST/GET /api/contact
│   │   └── stats.js       ← GET /api/stats, POST /api/stats/track
│   ├── server.js          ← Main Express app
│   └── .env               ← Environment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Cursor.jsx       ← Custom cursor + scroll bar
│   │   │   ├── Hero.jsx         ← Particles + typewriter + stats
│   │   │   ├── Skills.jsx       ← Tabbed skill bars
│   │   │   ├── Projects.jsx     ← Filter + case study modal
│   │   │   ├── Sections.jsx     ← About + Timeline + Contact
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  ← JWT auth state
│   │   ├── pages/
│   │   │   ├── Portfolio.jsx    ← Main portfolio page (/)
│   │   │   ├── AdminLogin.jsx   ← /admin/login
│   │   │   └── AdminDashboard.jsx ← /admin/dashboard (protected)
│   │   ├── utils/
│   │   │   └── api.js           ← Axios instance with auth interceptor
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
│
└── package.json             ← Root: runs both servers
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | ❌ | Server health check |
| POST | `/api/auth/login` | ❌ | Login → returns JWT |
| GET | `/api/auth/verify` | ✅ | Verify JWT token |
| GET | `/api/projects` | ❌ | List projects (`?category=Web`) |
| POST | `/api/projects` | ✅ | Create project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| POST | `/api/contact` | ❌ | Submit contact message |
| GET | `/api/contact` | ✅ | List all messages |
| GET | `/api/stats` | ✅ | Analytics stats |
| POST | `/api/stats/track` | ❌ | Track event (`page_view`, `project_view`, `cv_download`) |

---

## 🔐 Admin Credentials

```
Email:    omarabdelaziz4673@gmail.com
Password: OmarAdmin@123
URL:      http://localhost:3000/admin/login
```

---

## 🗄 Database

### MySQL Setup (optional)

```sql
CREATE DATABASE omar_portfolio;
```

The app auto-creates all tables on first run. If MySQL is unavailable, the app falls back to an **in-memory store** with sample data — perfect for development and demos.

### MySQL Schema

```sql
-- admins, projects, contacts, analytics (auto-created)
```

---

## 🎨 Design System

```css
--accent:  #00d4ff   /* Cyan */
--accent2: #7c3aed   /* Purple */
--bg:      #050508   /* Dark background */
--card:    #0d0d18   /* Card surface */
--neon:    linear-gradient(135deg, #00d4ff, #7c3aed)

Fonts: Syne (display) + Space Mono (mono) + Inter (body)
```

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Portfolio — Hero, About, Skills, Projects, Timeline, Contact |
| `/admin/login` | Admin login with JWT |
| `/admin/dashboard` | Protected dashboard — Overview, Projects CRUD, Messages |

---

## 📦 Build for Production

```bash
# Build frontend
npm run build
# Output: frontend/dist/

# Serve backend
cd backend && npm start
```

For deployment: serve the `frontend/dist` folder via Nginx/Vercel, and deploy the backend to Railway/Render.

---

## 👨‍💻 About Omar

**Omar Abdelaziz Ahmed** — Full-Stack Developer from Egypt  
📧 omarabdelaziz4673@gmail.com  
🐙 github.com/OMARABDELAZIZ1  
💼 linkedin.com/in/omarabdelaziz  
🌐 frontend-steps--stevaabdelaziz.replit.app
