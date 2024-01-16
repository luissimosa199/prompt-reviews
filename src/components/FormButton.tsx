"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
        type="submit"
        disabled={pending}
      >
        {pending ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
};

export default FormButton;
