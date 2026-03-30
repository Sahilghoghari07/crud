import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/users/userThunk";

function Register() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(register());
  };

  return (
    <>
      <div className="container max-w-200 w-100 mx-auto p-6 bg-blue-50 shadow-xl rounded-lg mt-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label htmlFor="userName" className="mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="border border-gray-300 focus:border-blue-300 outline-none rounded px-3 py-1.5"
            />
          </div>
          <div className="flex flex-col w-full mt-2">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 focus:border-blue-300 outline-none rounded px-3 py-1.5"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600 hover:-translate-y-0.5 w-full transition-all"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
