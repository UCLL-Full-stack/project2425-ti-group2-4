import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "../language/Language";
import { useTranslation } from "next-i18next";

interface User {
  token: string;
  fullname: string;
  username: string;
  rol: string;
}

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const userData: User = JSON.parse(storedUser);
        setLoggedInUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setLoggedInUser(null);
      }
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-br from-teal-500 to-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        <a href="/" className="text-3xl font-bold tracking-tight mb-3 md:mb-0 text-white">
          ClinicalLink
        </a>

        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-lg">
          <Link href="/" className="hover:text-teal-100 transition duration-300">
            {t("header.nav.home")}
          </Link>
          {/* {loggedInUser.rol === "admin" | "doctor" ( */}
            <Link
              href="/patients"
              className="hover:text-teal-100 transition duration-300"
            >
              {t("header.nav.patients")}
            </Link>
          {/* )} */}
          <Link
            href="/consultations"
            className="hover:text-teal-100 transition duration-300"
          >
            {t("header.nav.consultations")}
          </Link>
          {!loggedInUser && (
            <Link
              href="/login"
              className="hover:text-teal-100 transition duration-300"
            >
              {t("header.nav.login")}
            </Link>
          )}
          {loggedInUser && (
            <>
              <a
                href="/login"
                onClick={handleClick}
                className="hover:text-teal-100 transition duration-300"
              >
                {t("header.nav.logout")}
              </a>
              <div className="text-teal-200">
                {t("header.welcome")}, {loggedInUser.fullname}!
              </div>
            </>
          )}
          <Language />
        </nav>
      </div>
    </header>
  );
};

export default Header;
