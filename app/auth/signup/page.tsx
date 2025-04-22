"use client";
import { useState } from "react";
import { axiosServerConfig } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};
function Signup() {
  const router = useRouter();
  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const [isPassEqual, setIsPassEqual] = useState<boolean>(true);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    axiosServerConfig
      .post(
        "/user/auth/register",
        {
          email: data.email,
          password: data.password,
          confirm_password: data.confirmPassword,
          username: data.username,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res: any) => {
        toast(res.data.message, { type: "success" });
        router.push("/auth/login");
      })
      .catch((err) => {
        toast("Username or Email already registered", { type: "warning" });
      });
  };

  const passwordValue = watch("password");
  return (
    <motion.form
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg m-auto rounded-lg mx-auto px-5 py-7 max-w-lg w-full flex flex-col gap-y-2"
    >
      <h4 className="font-semibold text-2xl text-center">SIGNUP</h4>
      <div className="form-input-wrapper">
        <label htmlFor="time">Username</label>
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors?.username && (
          <span className="text-red-500 text-sm">
            {errors.username && <p>{errors?.username?.message}</p>}
          </span>
        )}
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="time">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors?.email && (
          <span className="text-red-500 text-sm">
            {errors.email && <p>{errors?.email?.message}</p>}
          </span>
        )}
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="number_questions">Password</label>
        <div className="flex gap-2">
          <input
            type={showPass ? "text" : "password"}
            className="flex-1"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
              maxLength: {
                value: 12,
                message: "Password must be at most 12 characters",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
                message: "Must include letters, numbers, and symbols",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="bg-gray-200 px-3 rounded-lg"
          >
            <FaEye />
          </button>
        </div>
        {errors?.password && (
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="number_questions">Confirm Password</label>

        <div className="flex gap-2">
          <input
            className="flex-1"
            type={showPassConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassConfirm(!showPassConfirm)}
            className="bg-gray-200 px-3 rounded-lg"
          >
            <FaEye />
          </button>
        </div>
        {errors?.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-slate-200 py-1.5 mt-3 rounded-lg w-fit px-3 font-semibold hover:shadow-lg hover:bg-slate-300 transition-all duration-200"
      >
        SIGN UP
      </button>
    </motion.form>
  );
}

export default Signup;
