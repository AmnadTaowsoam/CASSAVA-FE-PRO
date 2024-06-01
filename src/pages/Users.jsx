import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useFetchUsers from "../services/userAPI";
const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Users = () => {
  const { fetchUsers, result, error, isLoading } = useFetchUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/users/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("User deleted successfully:", userId);
      // Refresh the list after delete
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };


  // Ensure users is defined, possibly as an empty array if result is not yet available
  const users = result || [];

  return (
    <div className="flex justify-center w-full">
      <div className="container overflow-x-auto m-4">
        <div>
          <p className="text-center text-4xl font-bold m-4">User Management</p>
        </div>
        <table className="table table-auto table-zebra w-full text-center">
          <thead className="text-xl font-bold">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-base mt-4">
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {Array.isArray(user.roles)
                    ? user.roles.join(", ")
                    : user.roles}
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.user_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;