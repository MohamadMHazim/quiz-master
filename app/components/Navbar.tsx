"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import logo from "../../public/images/quiz-master-logo-nobg.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: "Dashboard", href: "/", current: pathname === "/" },
    {
      name: "Take a Quiz",
      href: "/take-a-quiz",
      current: pathname === "/take-a-quiz",
    },
    {
      name: "Create a Quiz",
      href: "/create-a-quiz",
      current: pathname === "/create-a-quiz",
    },
    {
      name: "Contact Me",
      href: "/contact-me",
      current: pathname === "/contact-me",
    },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname]);


  

  const { status, data: session } = useSession();

  return (
    <>
      <nav className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="QuizMaster Logo"
            width={56}
            height={56}
            className="mr-6"
          />
        </div>
        <div className="hidden lg:flex flex-1 justify-center">
          <ol className="flex space-x-4">
            {navigation.map((item, index) => (
              <li
                key={index}
                className={`${
                  item.current ? "text-white" : "text-gray-400"
                } mr-3`}
              >
                <Link
                  href={item.href}
                  className={`${
                    item.current
                      ? "text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative hidden lg:flex items-center">
  {status === "authenticated" && (
    <button
      onClick={toggleDropdown}
      className="flex items-center focus:outline-none"
    >
      <FontAwesomeIcon
        icon={faUserCircle}
        className="text-white h-10 w-10"
      />
      <span className="text-white ml-5">{session.user!.name}</span>
    </button>
  )}
  {status === "unauthenticated" && (
    <>
      <Link href="/api/auth/signin" className="text-white mr-5">
        Login
      </Link>
      <span className="text-white mr-5">/</span>
      <Link href="/register" className="text-white mr-5">
        Sign up
      </Link>
    </>
  )}
  {status === "loading" && <span className="text-white">Loading ...</span>}
  {dropdownOpen && (
  <div
    ref={dropdownRef}
    className="absolute top-full right-0 mt-1 lg:mt-2 w-48 bg-white rounded-md shadow-lg z-10"
    style={{
      opacity: dropdownOpen ? 1 : 0,
      display: dropdownOpen ? "block" : "none",
    }}
  >
    <ul className="py-1">
      <li>
        <Link
          href="/profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          href="/api/auth/signout"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >
          Logout
        </Link>
      </li>
    </ul>
  </div>
)}

</div>

        <button className="text-white lg:hidden" onClick={toggleSidebar}>
          <FontAwesomeIcon
            icon={sidebarOpen ? faTimes : faBars}
            className="h-6 w-6"
          />
        </button>
      </nav>
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fixed inset-y-0 right-0 w-64 bg-gray-900 p-4 overflow-y-auto z-50">
          <div className="flex items-center justify-between mb-6">
            <Image
              src={logo}
              alt="QuizMaster Logo"
              width={56}
              height={56}
              className="mr-6"
            />
            <button className="text-white" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
          <ol className="space-y-4">
            {navigation.map((item, index) => (
              <li
                key={index}
                className={`${item.current ? "text-white" : "text-gray-400"}`}
              >
                <Link
                  href={item.href}
                  className={`block ${
                    item.current
                      ? "text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={toggleSidebar}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            {status === "authenticated" && (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-white h-10 w-10"
                  />
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="mt-2 bg-white rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out transform origin-top-right"
                    style={{
                      opacity: dropdownOpen ? 1 : 0,
                      transform: dropdownOpen
                        ? "scaleY(1)"
                        : "scaleY(0)",
                    }}
                  >
                    <ul className="py-1">
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/api/auth/signout"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link href="/api/auth/signin" className="block text-white mb-2">
                  Login
                </Link>
                <Link href="/register" className="block text-white">
                  Sign up
                </Link>
              </>
            )}
            {status === "loading" && <span className="text-white">Loading ...</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;