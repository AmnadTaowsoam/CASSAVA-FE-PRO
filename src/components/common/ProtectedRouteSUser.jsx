import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteSUser = ({ children }) => {
  // ดึงข้อมูล roles จาก localStorage และแปลงกลับเป็น JSON
  const rolesString = sessionStorage.getItem("roles");
  const roles = rolesString ? JSON.parse(rolesString) : [];

  // ตรวจสอบว่า roles เท่ากับ 'superuser' หรือไม่
  if (!roles.includes("superuser")) {
    console.log(
      "ProtectedRoute - User does not have required role, redirecting to sign-in"
    );
    return <Navigate to="/sign-in" />;
  }

  return children;
};
export default ProtectedRouteSUser;
