import Link from "next/link";
import React from "react";
import FooterLink from "./FooterLink";
import EnvelopeSvg from "./icons/EnvelopeSvg";

const Footer = () => {
  return (
    <footer className="bg-blue-500 pt-8 pb-8 px-4 md:px-32 flex flex-col text-white">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between mb-4">
        <div>
          <ul className="flex flex-col gap-2">
            <li>
              <FooterLink href="/">Prompts</FooterLink>
            </li>
            <li>
              <FooterLink href="/blog">Blog</FooterLink>
            </li>
            <li>
              <FooterLink href="/">Agregar</FooterLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="https://doxa-web.vercel.app/#contact"
                className="flex items-center gap-1"
              >
                <EnvelopeSvg />
                <span>Contacto</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between border-t border-white pt-4">
        <div>© Nombre 2024 - All rights reserved.</div>
      </div>
      {/* <div className="w-full mt-4 overflow-hidden">
        <Ad />
      </div> */}
    </footer>
  );
};

export default Footer;
