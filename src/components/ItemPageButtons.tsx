import { Tabs } from "@/types";
import React from "react";
import Link from "next/link";
import CommentsSvg from "./icons/CommentsSvg";

const ItemPageButtons = ({
  setCurrentTab,
  currentTab,
  slug,
}: {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
  currentTab: Tabs;
  slug: string;
}) => {
  return (
    <div className="mx-4 flex flex-col-reverse justify-center md:justify-between md:flex-row">
      <ul className="flex text-lg justify-around md:justify-left">
        <li>
          <button
            onClick={() => {
              setCurrentTab("informacion");
            }}
            className={`${
              currentTab !== "informacion" ? "" : "border-b-2 border-blue-600"
            } px-4 py-2 text-blue-600 font-semibold`}
          >
            Información
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setCurrentTab("opiniones");
            }}
            className={`${
              currentTab !== "opiniones" ? "" : "border-b-2 border-blue-600"
            } px-4 py-2 text-blue-600 font-semibold`}
          >
            Opiniones
          </button>
        </li>
      </ul>
      <ul className="flex gap-4 justify-center md:justify-end items-center">
        <li>
          <button
            onClick={() => {
              setCurrentTab("opiniones");
              // wait for half a second before scrolling
              setTimeout(() => {
                const element = document.getElementById("comment_input");
                element?.scrollIntoView({ behavior: "smooth" });
              }, 200);
            }}
            className="bg-blue-300 shadow-sm px-2 py-1 rounded-md flex items-center gap-1"
          >
            <CommentsSvg />
            <span>Comentar</span>
          </button>
        </li>
        {/* <li>
          <Link
            href={`$`}
            className="bg-blue-300 shadow-sm px-2 py-1 rounded-md flex items-center gap-1"
          >
            <VideoCamSvg />
            <span>Videollamada</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="bg-blue-300 shadow-sm px-2 py-1 rounded-md flex items-center gap-1"
          >
            <ClockSvg />
            <span>Solicitar turno</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default ItemPageButtons;
