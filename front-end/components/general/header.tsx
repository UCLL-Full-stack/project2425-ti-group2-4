import { useRouter } from "next/router";
import React from "react";

const Header: React.FC = () => {
    const router = useRouter();

    return (
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
            <nav className="z-20 border-b-2 border-transparent p-6 flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:items-center">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <h1 className="text-3xl font-bold tracking-wide mb-4 lg:mb-0">
                        <a className="hover:text-gray-200" onClick={() => router.push("/")}>
                            Health App
                        </a>
                    </h1>
                    <ul className="flex space-x-6 text-lg font-semibold">
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
                                onClick={() => router.push("/patients")}
                            >
                                Patients
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
