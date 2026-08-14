# 🏗️Account Hub

> A modern full-stack account management platform built with **Django REST Framework** and **React**, featuring secure JWT authentication, profile management, admin user management, search, pagination, image uploads, and password management.

---

## 🚀 Project Overview

**Account Hub** is a full-stack account management application designed to provide users with a secure and modern platform for managing their accounts.

The application includes separate experiences for **standard users** and **administrators**.

Users can manage their profile information, update their profile picture, change their password, and securely access their dashboard.

Administrators have additional capabilities such as managing users, creating users, editing user information, deleting users, searching users, and navigating through paginated user lists.

---

## ✨ Features

### 👤 User Features

* User registration
* Secure user login
* JWT-based authentication
* Automatic authentication persistence using localStorage
* Protected routes
* User dashboard
* Profile management
* Update username and email
* Profile image upload
* Cloudinary image storage
* Change password
* Logout functionality
* Responsive modern UI
* Toast notifications

### 🛡️ Admin Features

* Dedicated admin login
* Admin-only protected routes
* Admin dashboard
* View all users
* Search users
* Pagination
* Create users
* Edit users
* Delete users
* User role identification
* Separate admin authentication flow

### 🔐 Authentication & Security

* JWT Access Token
* JWT Refresh Token
* Protected API endpoints
* Role-based route protection
* Admin-only authorization
* Token persistence
* Secure password handling through Django authentication

---

## 🧩 Main Application Flow

```text
                    Account Hub
                         │
              ┌──────────┴──────────┐
              │                     │
           User Flow             Admin Flow
              │                     │
          Register               Admin Login
              │                     │
            Login              Admin Dashboard
              │                     │
         Dashboard             User Management
              │                     │
           Profile        ┌────────┼────────┐
              │            │        │        │
      ┌───────┼───────┐   Add     Edit    Delete
      │       │       │
   Update   Image   Password
   Profile  Upload    Change
```

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* React Toastify
* Vite

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* SQLite
* Cloudinary

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 📁 Project Structure

```text
AccountHub/
│
├── backend/
│   │
│   ├── accounts/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── pagination.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   └── manage.py
│
└── frontend/
    │
    ├── src/
    │   ├── components/
    │   ├── features/
    │   │   └── auth/
    │   ├── pages/
    │   ├── routes/
    │   ├── api/
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

---

## 🔑 JWT Authentication

Account Hub uses **JSON Web Tokens (JWT)** for authentication.

The authentication flow works as follows:

```text
Login
  ↓
Backend validates credentials
  ↓
Access Token + Refresh Token
  ↓
Tokens stored in Redux/localStorage
  ↓
Access Token sent with API requests
  ↓
Protected API access
```

The application also uses protected routes to prevent unauthorized users from accessing restricted pages.

---

## 🛡️ Role-Based Access

Account Hub separates standard users and administrators.

### Standard User

Can access:

* Dashboard
* Profile
* Change Password
* Account information

### Administrator

Can access:

* Admin Dashboard
* User listing
* Search
* Pagination
* Add User
* Edit User
* Delete User

Admin-only pages are protected using a dedicated route guard.

---

## 🔎 Search & Pagination

The admin dashboard supports server-side user search and pagination.

Example API request:

```text
GET /api/admin/users/?search=sahel&page=1
```

The backend returns paginated data:

```json
{
    "count": 7,
    "next": "...?page=2",
    "previous": null,
    "results": []
}
```

This allows the frontend to navigate between user pages without loading every user at once.

---

## 🖼️ Profile Image Upload

Users can upload and update their profile image.

The frontend sends the image using `FormData`.

The backend integrates with **Cloudinary** for cloud-based image storage.

```text
User selects image
       ↓
React FormData
       ↓
Django REST API
       ↓
Cloudinary
       ↓
Image URL stored with user profile
```

---

## 🔐 Change Password

Authenticated users can change their password by providing:

```json
{
    "old_password": "current_password",
    "new_password": "new_password"
}
```

The endpoint requires JWT authentication.

---

## 🌐 API Overview

| Method | Endpoint                 | Purpose           |
| ------ | ------------------------ | ----------------- |
| POST   | `/api/register/`         | Register user     |
| POST   | `/api/login/`            | User login        |
| POST   | `/api/token/refresh/`    | Refresh JWT       |
| GET    | `/api/profile/`          | Get profile       |
| PATCH  | `/api/profile/`          | Update profile    |
| POST   | `/api/change-password/`  | Change password   |
| POST   | `/api/admin/login/`      | Admin login       |
| GET    | `/api/admin/users/`      | List/search users |
| POST   | `/api/admin/users/add/`  | Create user       |
| PATCH  | `/api/admin/users/<id>/` | Update user       |
| DELETE | `/api/admin/users/<id>/` | Delete user       |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AccountHub
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv vara
```

Activate it on Windows:

```bash
vara\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

Backend will run on:

```text
http://127.0.0.1:8000/
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173/
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend project and configure the required Cloudinary credentials.

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Never commit secret keys or environment variables to GitHub.

---

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

Authentication-protected requests use:

```text
Authorization: Bearer <access_token>
```

Example:

```text
GET /api/profile/
```

with:

```text
Authorization: Bearer eyJ...
```

---

## 📱 UI & UX

The frontend focuses on a modern account-management experience with:

* Dark modern interface
* Gradient backgrounds
* Glassmorphism-inspired cards
* Responsive layouts
* Interactive buttons
* Loading states
* Form validation feedback
* Toast notifications
* Profile image previews
* Admin management interface

---

## 📈 Future Improvements

Potential future enhancements include:

* Refresh token interceptor with Axios
* Automatic access-token refresh
* Forgot password / password reset
* Email verification
* Advanced admin analytics
* User activation/deactivation
* Sorting and filtering
* Confirmation modal before deletion
* Better form validation
* Deployment with AWS
* Production PostgreSQL database
* Automated testing
* CI/CD pipeline

---

## 🎯 Learning Objectives

This project demonstrates practical implementation of:

* React component architecture
* React Hooks
* Redux Toolkit
* React Router
* Protected Routes
* Role-based authorization
* Axios API integration
* Django REST Framework
* JWT authentication
* REST API design
* CRUD operations
* Search
* Pagination
* File uploads
* Cloudinary integration
* PostgreSQL/SQLite database concepts
* Git & GitHub workflow

---

## 👨‍💻 Author

**Sahel**

Full-Stack Developer | Python | Django | React

---

## 📄 License

This project is created for learning and portfolio purposes.
