import React, { useState } from "react";

const Support = () => {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const applicationName = "Corn inspection Application"; // ตั้งค่าชื่อแอปพลิเคชันเป็นค่าคงที่

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Application Name: ${applicationName}\nEmail: ${email}\nQuery: ${query}`
    );
    setQuery("");
    setEmail("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Need Help?</h2>
          <p className="text-gray-600">
            Fill out the form below and our team will get back to you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="applicationName"
              className="text-sm font-medium text-gray-700"
            >
              Application Name :
            </label>
            <input
              type="text"
              id="applicationName"
              value={applicationName}
              readOnly // ทำให้ฟิลด์นี้อ่านได้อย่างเดียว
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100" // เพิ่มสไตล์เพื่อแสดงว่าไม่สามารถแก้ไขได้
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email :
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="your-email@example.com" // ใส่ placeholder เพื่อเป็นตัวอย่าง
            />
          </div>
          <div>
            <label
              htmlFor="query"
              className="text-sm font-medium text-gray-700"
            >
              Problem :
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;