"use client";
import Link from "next/link";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
function Login() {
  const [showPass, setShowPass] = useState(false);
  function handleSubmit(event: any) {
    event.preventDefault();
    const email_username = event.target.elements.email_username.value;
    const password = event.target.elements.password.value;
    axiosServerAuthConfig
      .post(
        "/user/auth/login",
        { email_username, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        window.location.href = "/choose-form";
      })
      .catch((err) => {
        toast("Password or Username is Wrong", {
          theme: "colored",
          type: "error",
        });
      });
  }
  return (
    <motion.form
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
      onSubmit={handleSubmit}
      className="bg-white shadow-lg m-auto rounded-lg px-5 py-7 max-w-lg w-full flex flex-col gap-y-2 mx-auto"
    >
      <h4 className="font-semibold text-2xl text-center">LOGIN</h4>
      <div className="form-input-wrapper">
        <label htmlFor="time">Email / Username</label>
        <input type="text" name="email_username" id="email_username" required />
      </div>

      <div className="form-input-wrapper flex-1">
        <label htmlFor="number_questions">Password</label>
        <div className="flex gap-2">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            className="flex-1"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="bg-gray-200 px-3 rounded-lg"
          >
            <FaEye />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <button
          type="submit"
          className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
        >
          Start Quiz
        </button>
        <Link
          href={"/auth/signup"}
          className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
        >
          Signup
        </Link>
      </div>
    </motion.form>
  );
}

export default Login;
