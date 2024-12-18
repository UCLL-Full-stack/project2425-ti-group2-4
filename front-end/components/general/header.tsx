import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User } from "types";

const Header: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    setLoggedInUser(userData ? JSON.parse(userData) : null);
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setLoggedInUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <nav className="relative border-b-2 border-transparent p-6 flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-wide">
            <a
              className="hover:text-gray-200 cursor-pointer"
              onClick={() => router.push("/")}
            >
              ClinicaLink
            </a>
          </h1>
        </div>
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 text-lg font-semibold">
          <li>
            <a
              className="cursor-pointer hover:text-gray-200 transition duration-300"
              onClick={() => router.push("/")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer hover:text-gray-200 transition duration-300"
              onClick={() => router.push("/offices")}
            >
              Offices
            </a>
          </li>
          {loggedInUser ? (
            <>
              {loggedInUser.role === "admin" && (
                <li>
                  <a
                    className="cursor-pointer hover:text-gray-200 transition duration-300"
                    onClick={() => router.push("/patients")}
                  >
                    Patients
                  </a>
                </li>
              )}
              <li>
                <a
                  className="cursor-pointer hover:text-gray-200 transition duration-300"
                  onClick={() => router.push("/consultations")}
                >
                  Consultations
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer hover:text-gray-400 transition duration-300"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  className="cursor-pointer hover:text-gray-400 transition duration-300"
                  onClick={() => router.push("/login")}
                >
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
