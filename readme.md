# 🔗 ShortURL — URL Shortener with Server-Side Rendering

A minimal full-stack URL shortener built with **Express**, **EJS**, and **MongoDB**. Users can sign up, log in, shrink long links into short codes, get redirected instantly, and view click analytics — with role-based access separating normal users from admins.

---

## ✨ Features

- **User Authentication** — Sign up / log in with JWT stored in an HTTP-only-style cookie
- **Role-Based Access Control** — `NORMAL` and `ADMIN` roles gate different routes
- **URL Shortening** — Generate short codes (via `nanoid`) for any long URL
- **Redirection** — Visiting a short link redirects to the original URL
- **Click Analytics** — Track visit history (timestamps) per short link
- **Server-Side Rendered Dashboard** — EJS views for login, signup, and a URL dashboard
- **Admin View** — Admins can see *all* shortened URLs across every user; normal users see only their own

---

## 🛠️ Tech Stack

| Layer          | Technology                  |
|----------------|------------------------------|
| Runtime        | Node.js (ESM / `type: module`) |
| Web Framework  | Express 5                   |
| Templating     | EJS                          |
| Database       | MongoDB + Mongoose           |
| Auth           | JSON Web Tokens (`jsonwebtoken`), cookie-based |
| Short ID Gen   | `nanoid`                     |
| Dev Tooling    | `nodemon`                    |

---

## 📂 Project Structure

```
ShortUrl And ServerSide Rendering/
├── controllers/
│   ├── controllers.url.js      # Create, redirect, analytics logic
│   └── controllers.user.js     # Signup / login logic
├── middleware/
│   └── auth.js                 # checkForAuthentication, restrictTo(roles)
├── models/
│   ├── models.url.js           # URL schema (ShortId, RedirectUrl, VisitHistory, createdBy)
│   └── models.user.js          # User schema (name, email, role, password)
├── route/
│   ├── auth.user.js            # /user routes (signup, login)
│   ├── route.url.js            # /api/url routes (create, redirect, analytics)
│   └── StaticRouter.js         # /test routes (dashboard, login/signup pages)
├── service/
│   └── auth.js                 # setUser (sign JWT), getUser (verify JWT)
├── view/
│   ├── home.ejs                # Dashboard UI
│   ├── login.ejs
│   └── signup.ejs
├── connect.js                  # MongoDB connection helper
├── index.js                    # App entry point
├── package.json
└── package-lock.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "ShortUrl And ServerSide Rendering"

# Install dependencies
npm install
```

### Configuration

The app currently connects to a local MongoDB instance by default:

```
mongodb://127.0.0.1:27017/short-url
```

> ⚠️ **Note:** The database URL and JWT secret are currently hardcoded in `connect.js` / `service/auth.js`. For any real deployment, move these into environment variables (e.g. via a `.env` file and `dotenv`) before going further.

### Run the app

```bash
npm start
```

This runs `nodemon index.js`. The server starts on:

```
http://localhost:8000
```

---

## 📡 Routes

### Auth Routes (`/user`)

| Method | Endpoint       | Description         |
|--------|----------------|----------------------|
| POST   | `/user/`       | Sign up a new user   |
| POST   | `/user/login`  | Log in, sets JWT cookie |

### URL Routes (`/api/url`) — requires `NORMAL` or `ADMIN` role

| Method | Endpoint                  | Description                         |
|--------|----------------------------|--------------------------------------|
| POST   | `/api/url/`                | Create a new short URL              |
| GET    | `/api/url/:id`              | Redirect to the original URL        |
| GET    | `/api/url/analytics/:id`    | Get click analytics for a short URL |

### Static / Dashboard Routes (`/test`)

| Method | Endpoint         | Description                                   | Access        |
|--------|------------------|------------------------------------------------|---------------|
| GET    | `/test/`          | User dashboard — shows the logged-in user's own URLs | `NORMAL`, `ADMIN` |
| GET    | `/test/admin/urls`| Admin dashboard — shows *all* URLs in the system | `ADMIN` only |
| GET    | `/test/signup`    | Signup page                                    | Public        |
| GET    | `/test/login`     | Login page                                     | Public        |

---

## 🔐 Authentication & Roles

- On login, a JWT is signed with the user's `_id`, `email`, and `role`, then stored in a cookie named `token`.
- `checkForAuthentication` middleware runs on every request, decoding the cookie (if present) into `req.user`.
- `restrictTo([roles])` middleware protects routes by checking `req.user.role` against an allow-list.
- Two roles exist: `NORMAL` (default) and `ADMIN`.

---

## 🗄️ Data Models

**User**
| Field    | Type   | Notes                     |
|----------|--------|----------------------------|
| name     | String | required                  |
| email    | String | required, unique          |
| role     | String | default: `"NORMAL"`       |
| password | String | required                  |

**URL**
| Field         | Type     | Notes                          |
|---------------|----------|----------------------------------|
| ShortId       | String   | required, unique (generated via `nanoid`) |
| RedirectUrl   | String   | required, the original long URL |
| VisitHistory  | Array    | timestamps of each visit/click  |
| createdBy     | ObjectId | reference to the `User` who created it |

---


## 📄 License

ISC