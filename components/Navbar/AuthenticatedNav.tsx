import React from "react";
import Link from "next/link";
import { axiosServerAuthConfig } from "@/config/axios.config";
import { NavStateProps } from "./Navbar.types";
import { toast } from "react-toastify";
const AuthenticatedNav: React.FC<
  NavStateProps & { isQuizResumable: boolean }
> = ({ setIsNavbarOpen, isQuizResumable }) => {
  function handleLogout(e: React.MouseEvent<Element>) {
    e.preventDefault();
    axiosServerAuthConfig
      .delete("/user/auth/logout")
      .then(() => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        window.location.href = "/";
      })
      .catch((err: unknown) => {
        toast("Something went wrong", { type: "error" });
      });
  }
  return (
    <ul className="flex sm:items-center sm:gap-x-4 flex-col sm:gap-y-0 sm:flex-row gap-y-4">
      <li>
        <Link
          onClick={() => {
            setIsNavbarOpen(false);
          }}
          href={"/scoreboard"}
          className="text-center block sm:text-start"
        >
          My Scoreboard
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setIsNavbarOpen(false);
          }}
          href={"/choose-form"}
          className="text-center block sm:text-start"
        >
          Start Quiz
        </Link>
      </li>
      {isQuizResumable && (
        <li>
          <Link
            onClick={() => {
              setIsNavbarOpen(false);
            }}
            href={"/quiz"}
            className="text-center block sm:text-start"
          >
            Resume Quiz
          </Link>
        </li>
      )}
      <li>
        <button
          onClick={handleLogout}
          className="text-center block w-full sm:text-start"
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default AuthenticatedNav;
