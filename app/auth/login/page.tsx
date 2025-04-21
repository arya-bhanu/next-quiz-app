"use client";
import Link from "next/link";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
function Login() {
  const router = useRouter();
  function handleSubmit(event: any) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    axiosServerAuthConfig
      .post(
        "/user/auth/login",
        { email, password },
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
        <label htmlFor="time">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="number_questions">Password</label>
        <input type="password" name="password" id="password" required />
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
