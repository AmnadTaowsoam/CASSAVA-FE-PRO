import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
  // ดึงข้อมูล roles จาก localStorage และแปลงกลับเป็น JSON
  const rolesString = sessionStorage.getItem("roles");
  const roles = rolesString ? JSON.parse(rolesString) : [];

  // ตรวจสอบว่า roles มี 'user' หรือ 'superuser'
  if (!roles.includes("user") && !roles.includes("superuser")) {
    console.log(
      "ProtectedRouteUser - User does not have required role, redirecting to sign-in"
    );
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRouteUser;
