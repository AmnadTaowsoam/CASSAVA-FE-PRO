import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
      const refreshToken = sessionStorage.getItem("refreshToken");

      try {
        await fetch(`${apiUrl}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ refreshToken }),
        });
        console.log("Logout successful");
      } catch (error) {
        console.error("Logout failed:", error);
      }

      // ลบข้อมูลผู้ใช้จาก localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("roles");
      localStorage.removeItem("machine_ip");
      localStorage.removeItem("machine_id");
      localStorage.removeItem("user");
      localStorage.removeItem("predictAccessToken");
      localStorage.removeItem("predictRefreshToken");
      localStorage.removeItem("interfaceRefreshToken");
      localStorage.removeItem("interfaceAccessToken");

      // เปลี่ยนเส้นทางไปยังหน้าล็อกอิน
      navigate("/sign-in");
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
