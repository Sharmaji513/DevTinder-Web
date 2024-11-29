import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants"; // Ensure BASE_URL is imported correctly
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("sachin@gmail.com");
  const [password, setPassword] = useState("Sachin@123456");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}user/login`, // Use BASE_URL here
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); // Add user data to Redux store
      navigate("/feed"); // Navigate to feed page after successful login
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}user/signup`, // Use BASE_URL here
        { emailId, password, firstName, lastName, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); // Add user data to Redux store
      navigate("/profile"); // Navigate to profile page after successful signup
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full flex-col md:w-1/2 bg-base-200">
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-16 mt-6">
          <div>
            {isLoginForm ? (
              <p className="text-left text-3xl font-bold">Welcome 🙏, DevTinder</p>
            ) : (
              <p className="text-left text-3xl font-bold">Register</p>
            )}
          </div>

          <p className="mt-2 text-left text-gray-500">
            Welcome back, please enter your details.
          </p>

          <div className="flex flex-col pt-3 md:pt-8">
            {/* SignUp Form */}
            {!isLoginForm && (
              <>
                <div className="grid gap-3 md:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your Name"
                      className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label>Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Others</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label>Age</label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Login form */}
            <div>
              <div className="flex flex-col pt-4">
                <label>Email</label>
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    id="login-email"
                    className="w-full flex-1 appearance-none border-gray-300 bg-base-100 px-4 py-2 text-base text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <label>Password</label>
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="login-password"
                    className="w-full flex-1 appearance-none border-gray-300 bg-base-100 px-4 py-2 text-base text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}
            </div>

            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-500">
              {isLoginForm ? "Don't have an account? " : "Existing User? "}
              <span
                className="underline-offset-4 md:mx-2 font-semibold text-gray-200 underline cursor-pointer"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Sign up for free." : "Login Here"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side image */}
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img
          className="-z-1 absolute top-2 h-full w-full object-cover object-center opacity-90"
          src={isLoginForm ? "https://i.pinimg.com/originals/06/aa/40/06aa408f09f394c3b46d6cbe1efad944.gif" : "https://i.pinimg.com/originals/a4/07/22/a4072206392b57e4b3ede6588e81d7f3.gif"}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
