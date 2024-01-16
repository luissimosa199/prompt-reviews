"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import FormButton from "@/components/FormButton";
import { handleNewPrompt } from "@/utils/handleNewPrompt";

const Agregar = () => {
  const session = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        action={handleNewPrompt}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            id="name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="prompt"
            id="prompt"
          ></textarea>
        </div>

        <p>image</p>
        <p>tags</p>

        <FormButton />
      </form>
    </div>
  );
};

export default Agregar;
