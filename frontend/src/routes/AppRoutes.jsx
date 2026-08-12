import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;