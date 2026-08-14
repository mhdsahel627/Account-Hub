import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ChangePassword from "../pages/ChangePassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard/profile" element={
           <ProtectedRoute>
            <Profile />
           </ProtectedRoute>
          } />
        <Route path="/dashboard" 
               element={
                <ProtectedRoute>
                 <Dashboard />
                </ProtectedRoute>
                }/>
        <Route 
          path="/admin/dashboard"
          element = {
            <ProtectedRoute adminOnly={true}>
                <AdminDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id/edit"
          element = {
            <ProtectedRoute adminOnly={true}>
              <EditUser/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;