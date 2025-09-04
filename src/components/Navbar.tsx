"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          SchoolFinder
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 ">
          <Link
            href="/showSchool"
            className="hover:text-gray-200 rounded-lg border-1 border-fuchsia-800 p-2 px-6 hover:border-white"
          >
            Schools
          </Link>
          <Link
            href="/addSchool"
            className="hover:text-gray-200 rounded-lg border-1 border-fuchsia-800 p-2 px-6 hover:border-white"
          >
            Add School
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2  p-4 rounded-lg ">
          <Link
            href="/showSchool"
            className="hover:text-gray-200 rounded-lg  border-1 border-fuchsia-800 p-2 hover:border-white"
            onClick={() => setIsOpen(false)}
          >
            Schools
          </Link>
          <Link
            href="/addSchool"
            className="hover:text-gray-200 rounded-lg  border-1 border-fuchsia-800 p-2 hover:border-white "
            onClick={() => setIsOpen(false)}
          >
            Add School
          </Link>
        </div>
      )}
    </nav>
  );
}
