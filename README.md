# 🏗️ Account Hub — Full-Stack User Management System

A robust, full-stack role-based user management application built with **React** and **Django REST Framework**. Designed with a modern UI, secure authentication, and a dedicated administrative dashboard for complete user lifecycle management.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React, Redux Toolkit, React Router, Tailwind CSS | UI components, global state management, and routing |
| **Backend** | Python, Django, Django REST Framework (DRF) | RESTful API development and business logic |
| **Database** | SQLite | Relational data storage |
| **Authentication** | JSON Web Tokens (JWT) | Secure stateless user sessions (Access & Refresh tokens) |
| **File Storage** | Cloudinary | Cloud storage for user profile avatars |
| **Feedback & UI** | React Toastify | Clean floating notification toasts |

---

## ✨ Key Features

### 👤 User Capabilities

* **Secure Authentication:** Register, log in, and securely manage sessions using JWT.
* **Profile Management:** View account details, update usernames/emails, and upload/update profile images.
* **Password Security:** Authenticated password change requiring verification of the current password.
* **Protected Routes:** Automatic redirection of unauthenticated users away from private dashboards.

### 👑 Admin Capabilities

* **Admin Dashboard:** Exclusive administrative space restricted by Django staff permissions (`is_staff = true`).
* **User Lifecycle Management:** Add new users, edit existing user details, and delete accounts directly from the UI.
* **Advanced User Search:** Filter users dynamically via query parameters.
* **Optimized Pagination:** Server-side pagination (`PageNumberPagination`) handling large user volumes efficiently.

---

## 🔄 System Architecture & Flow

```text
[ React Frontend ] ──(Axios + Bearer Token)──> [ Django REST API ]
       │                                              │
       ├─> Redux (Auth State)                         ├─> SQLite (Database)
       └─> Tailwind CSS (UI/UX)                       └─> Cloudinary (Avatars)

```

### 🔐 Authentication & Security Flow

1. **Login:** User submits credentials $\rightarrow$ Django generates an **Access Token** and a **Refresh Token**.
2. **State Storage:** Tokens are stored securely, and auth state is managed globally via **Redux**.
3. **Protected APIs:** Axios automatically attaches the Bearer token to requests (`Authorization: Bearer <token>`).
4. **Authorization Checks:** Frontend protected routes verify token validity and user roles (`is_staff`) before rendering administrative views.

---

## 🚀 Core Technical Highlights

* **Global State Management (Redux Toolkit):** Keeps authentication state (`user`, `accessToken`, `isAuthenticated`) synchronized across navigation bars, dashboards, and protected routes.
* **Centralized API Handling (Axios):** Configured with a base URL and interceptors to streamline requests and token management.
* **Cloud-based Image Uploads:** Profile pictures bypass local server storage and go straight to **Cloudinary** using `FormData`, returning optimized URLs saved in the database.
* **Search & Pagination Integration:** Built to handle high-performance queries cleanly:
```http
GET /admin/users/?search=username&page=1

```



---

## ⚙️ Getting Started (Local Development)

### Prerequisites

* Node.js & npm installed
* Python 3.x installed
* Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/account-hub.git
cd account-hub

```

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev

```
