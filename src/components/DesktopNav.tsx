import Link from "next/link";
import React from "react";

const DesktopNav = () => {
  return (
    <>
      <nav className="ml-4 w-full hidden md:block">
        <ul className="flex gap-4 items-start w-full font-semibold text-white">
          <li>
            <Link href="/">Prompts</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/">Agregar</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Link
          href={"/login"}
          className="hidden md:block px-4 py-2 border-2 border-white rounded-md text-white uppercase font-semibold"
        >
          Ingresar
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
