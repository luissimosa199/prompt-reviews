import Link from "next/link";
import React from "react";
import AglesRightSvg from "./icons/AglesRightSvg";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex gap-1 items-center"
    >
      <AglesRightSvg />
      <span>{children}</span>
    </Link>
  );
};

export default FooterLink;
