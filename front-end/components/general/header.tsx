import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
    const router = useRouter();

    return (
        <header>
          <nav className=" z-20 border-b-2 border-gray-400 dark:border-gray-600 p-6 flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:items-center">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <ul className="flex space-x-4 text-black">
              <li>
                <a
                  className="cursor-pointer hover:text-gray-400"
                  onClick={() => router.push("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer hover:text-gray-400"
                  onClick={() => router.push("/patients")}
                >
                  Patients 
                </a>
              </li>
              </ul>
                </div>
            </nav>
        </header>
    )

};

export default Header;