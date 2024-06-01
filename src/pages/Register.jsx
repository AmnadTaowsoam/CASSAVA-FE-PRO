import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import btglogoB from "../assets/btglogoB.png";

const InputField = ({
  id,
  type = "text",
  placeholder,
  label,
  value,
  onChange,
}) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}:
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      className="input input-bordered w-full mt-1"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roles: "user",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Combining user registration data and machine configuration data
    const combinedData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      roles: formData.roles,
    };

    try {
      // Sending a single request to the new endpoint
      const response = await fetch(
        `${apiUrl}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(combinedData),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Please try again.");
      }

      const result = await response.json();
      console.log(result); // Logging the response for debugging purposes

      // Assuming the request was successful
      setIsLoading(false);
      setFormData({
        username: "",
        password: "",
        email: "",
        roles: "user",
      });
      setError("");
      alert("Registration successful! Please login.");
      navigate("/sign-in"); // Navigate to sign-in page
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-4 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-40 w-40" src={btglogoB} alt="Logo" />
        <h2 className="m-2 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        {error && (
          <div className="mt-2 text-center text-sm text-red-600">{error}</div>
        )}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputField
              id="username"
              placeholder="Your Username"
              label="User Name"
              value={formData.username}
              onChange={handleChange}
            />
            </div>
            <div className="flex flex-col">
            <InputField
              id="password"
              type="password"
              placeholder="Create a password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <InputField
              id="email"
              type="email"
              placeholder="you@example.com"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            </div>
            <div>
            <InputField
              id="roles"
              placeholder="user"
              label="Roles"
              value={formData.roles}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary text-xl"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
