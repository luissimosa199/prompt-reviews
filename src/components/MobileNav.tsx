"use client";
import React, { useState } from "react";
import BarsSvg from "./icons/BarsSvg";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MobileNav = () => {
  const [menuIsOpen, toggleMenu] = useState<boolean>(false);

  const { status } = useSession();

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
              <Link href="/agregar">Agregar</Link>
            </li>
            <li className="border-b w-1/2 text-center py-2">
              <Link href={status === "authenticated" ? "/perfil" : "/login"}>
                {status === "authenticated" ? "Perfil" : "Ingresar"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
