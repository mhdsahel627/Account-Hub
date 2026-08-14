🏗️ Account Hub — Project Overview

Account Hub is a full-stack user account management system built using:

Frontend  → React + Redux + Axios + Tailwind CSS
Backend   → Django + Django REST Framework
Database  → SQLite
Authentication → JWT
Image Storage → Cloudinary

Main purpose:

Users can create and manage their accounts, while administrators can manage users through a separate admin dashboard.

🔄 Overall Architecture
                    ACCOUNT HUB
                         │
          ┌──────────────┴──────────────┐
          ↓                             ↓
      React Frontend              Django Backend
          │                             │
    Redux / Axios                 Django REST API
          │                             │
          └──────────────┬──────────────┘
                         ↓
                    Database
                         │
                         ↓
                     Cloudinary
                   Profile Images
👤 USER FEATURES
1. Registration

User can create an account using:

Username
Email
Password

Frontend sends:

React
  ↓
Axios POST
  ↓
Django API
  ↓
User created
2. Login

Login uses JWT authentication.

Username + Password
        ↓
Django
        ↓
Access Token
Refresh Token
        ↓
Redux
        ↓
localStorage

Two tokens:

Access Token

Used for accessing protected APIs.

Example:

Authorization: Bearer <access_token>
Refresh Token

Used to obtain a new access token when the access token expires.

🔐 Authentication & Authorization

We implemented:

JWT Authentication
JWTAuthentication
ProtectedRoute

Normal authenticated user:

/dashboard
/profile
/change-password

Unauthenticated user:

→ Login
👑 ADMIN AUTHORIZATION

Admin users have:

is_staff = true

ProtectedRoute checks:

isAuthenticated?
       ↓
     YES
       ↓
adminOnly?
       ↓
is_staff?
       ↓
YES → Admin Dashboard
NO  → User Dashboard

So normal users cannot access admin pages.

👤 USER DASHBOARD

Dashboard provides:

Welcome message
User information
Profile navigation
Account overview
Logout
🧑 PROFILE MANAGEMENT

User can:

View profile
Update username
Update email
Upload profile image
View account ID
View account type

Profile image is uploaded to Cloudinary.

Flow:

Select Image
     ↓
FormData
     ↓
Axios PATCH
     ↓
Django
     ↓
Cloudinary
     ↓
Image URL
     ↓
User Profile
🔑 CHANGE PASSWORD

User provides:

Old Password
New Password

Backend verifies the old password before changing it.

This is important because password changes should be authenticated operations.

👑 ADMIN DASHBOARD

Admin gets a separate dashboard.

Features:

User List

Admin can see:

Username
Email
Profile
Search

Admin can search users.

Search
 ↓
API
 ↓
Filtered users
Pagination

Instead of returning every user:

Page 1
Page 2
Page 3
...

Backend handles pagination.

We configured DRF pagination with:

PageNumberPagination
➕ ADMIN ADD USER

Admin can create a new user.

Admin
 ↓
Add User
 ↓
Form
 ↓
POST API
 ↓
Django
 ↓
Database
✏️ ADMIN EDIT USER

Admin can update an existing user.

User
 ↓
Edit
 ↓
PATCH
 ↓
Django API
 ↓
Database
🗑️ ADMIN DELETE USER

Admin can delete a user.

Delete
 ↓
Confirmation
 ↓
DELETE API
 ↓
Database

Frontend removes the deleted user from the displayed list.

🔎 SEARCH + PAGINATION

This was one of the important practical features.

Frontend sends:

/admin/users/?search=sahel&page=1

Backend returns:

{
    "count": 7,
    "next": "...",
    "previous": null,
    "results": [...]
}

React then displays only:

results

and uses:

next
previous

to control pagination buttons.

🧩 REACT CONCEPTS USED

This project demonstrates several React concepts.

useState

Used for:

Form data
Loading state
Search
Pagination
Users
Profile image
Messages

Example:

const [users, setUsers] = useState([]);
useEffect

Used for API fetching.

Example concept:

Component loads
      ↓
useEffect
      ↓
API request
      ↓
Update state
      ↓
UI re-renders
useSelector

Reads Redux state:

const { user, accessToken } = useSelector(
    state => state.auth
);
useDispatch

Used to update Redux:

dispatch(loginSuccess(...))

and:

dispatch(logout())
React Router

Used for navigation:

/login
/register
/dashboard
/profile
/change-password


/admin/login
/admin/dashboard
/admin/users/add
/admin/users/:id/edit
🧠 REDUX

Authentication state is stored globally.

auth
├── user
├── accessToken
├── refreshToken
└── isAuthenticated

Why Redux?

Because many components need authentication information.

For example:

Dashboard
Profile
Admin Dashboard
ProtectedRoute

all need to know whether the user is authenticated.

🌐 AXIOS

Axios is used to communicate with Django.

Example:

api.get("profile/")

Protected request:

headers: {
    Authorization: `Bearer ${token}`
}

Central Axios configuration:

api/axios.js

So API calls don't need to recreate the base URL every time.

🐍 DJANGO REST FRAMEWORK

Backend provides REST APIs for:

Register
Login
Profile
Update Profile
Change Password
Admin Users
Add User
Edit User
Delete User
📄 HTTP METHODS

You used the important CRUD methods:

Method	Purpose
GET	Fetch data
POST	Create data
PATCH	Update data
DELETE	Delete data

Example:

GET    /admin/users/
POST   /admin/users/add/
PATCH  /admin/users/:id/
DELETE /admin/users/:id/
🔒 HTTP STATUS / AUTHENTICATION

You encountered:

401 Unauthorized

when token was missing/invalid.

Example:

{
    "detail": "Authentication credentials were not provided."
}

This helped verify that protected APIs actually require authentication.

🖼️ CLOUDINARY

Used for profile images instead of storing image files directly in the database.

React
 ↓
Image
 ↓
Django
 ↓
Cloudinary
 ↓
Image URL
 ↓
Database/Profile
🎨 UI / UX

Frontend uses:

Tailwind CSS
Gradient backgrounds
Cards
Responsive layouts
Loading states
Toast notifications
Search
Pagination
Form feedback
Profile image preview
🔔 TOASTIFY

For user feedback:

Login successful
Profile updated
Registration failed
Delete successful

Instead of showing everything as permanent text inside the page.

🛡️ SECURITY CONCEPTS

Important security features:

JWT authentication
Protected routes
Admin-only routes
Password hashing through Django
Bearer token authentication
Backend permission checks
Authentication required for sensitive APIs
