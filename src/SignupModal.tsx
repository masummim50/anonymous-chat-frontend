import React, { useContext, useState } from "react";
import { meContext } from "./App";
import { socket } from "./SocketWrapper";

const SignupModal = ({ setUserSignedUp }) => {
  const [userName, setUserName] = useState("");
  const [showNotUnique, setShowNotUnique] = useState(false);
  const { setMe } = useContext(meContext);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    // fetch(`http://localhost:3001/isUnique/${userName}`)
    fetch(`https://socket-backend-jt2k.onrender.com/isUnique/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.unique) {
          setShowNotUnique(false);
          (socket as any).emit("userSignedUp", { userName });
          setMe({ userName });
          setLoading(false);
          setUserSignedUp(true);
        } else {
          setLoading(false);
          setShowNotUnique(true);
        }
      });
    // setUserSignedUp(true)
  };

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-sky-600">
          Sign Up
        </h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          placeholder="Enter unique username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-red-500 font-extralight">
          {showNotUnique ? "Username already taken" : ""}
        </p>
        <div className="flex justify-center">
          <button
            className="p-1 border rounded-md px-3 py-1 mb-1 hover:bg-gray-300"
            onClick={() => setUserName("john")}
          >
            John
          </button>
          <button
            className="p-1 border rounded-md px-3 py-1 mb-1 hover:bg-gray-300"
            onClick={() => setUserName("jane")}
          >
            Jane
          </button>
          <button
            className="p-1 border rounded-md px-3 py-1 mb-1 hover:bg-gray-300"
            onClick={() => setUserName("adam")}
          >
            Adam
          </button>
          <button
            className="p-1 border rounded-md px-3 py-1 mb-1 hover:bg-gray-300"
            onClick={() => setUserName("smith")}
          >
            Smith
          </button>
        </div>
        <button
          className="flex items-center justify-center w-full bg-sky-500 text-white p-3 rounded-lg font-semibold hover:bg-sky-600 transition-all"
          onClick={handleSignup}
        >
          {loading ? (
            <span className="flex items-center">
              Signing up...{" "}
              <span className="animate-spin size-5 border border-t-transparent rounded-full inline-block"></span>
            </span>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
