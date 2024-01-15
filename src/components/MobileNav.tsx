"use client";
import React, { useState } from "react";
import BarsSvg from "./icons/BarsSvg";
import Link from "next/link";

const MobileNav = () => {
  const [menuIsOpen, toggleMenu] = useState<boolean>(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => {
          toggleMenu(!menuIsOpen);
        }}
      >
        <BarsSvg />
      </button>
      {menuIsOpen && (
        <div className="absolute w-full left-0 top-16 bg-white shadow-md z-50">
          <ul className="flex flex-col items-center">
            <li className="border-b w-1/2 text-center py-2">
              <Link href="/medicos">Prompts</Link>
            </li>
            <li className="border-b w-1/2 text-center py-2">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="border-b w-1/2 text-center py-2">
              <Link href="/">Agregar</Link>
            </li>
            <li className="border-b w-1/2 text-center py-2">
              <Link href={"/login"}>Ingresar</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
