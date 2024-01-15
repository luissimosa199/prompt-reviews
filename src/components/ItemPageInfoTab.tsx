"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ItemPageInfoBody from "./ItemPageInfoBody";

const ItemPageInfoTab = ({
  visible,
  phone,
  tags,
  name,
  slug,
}: {
  visible?: boolean;
  phone: string;
  tags: string[];
  name: string;
  slug: string;
}) => {
  const [showData, setShowData] = useState<boolean>(!!visible);
  const router = useRouter();

  const handleShowVisibility = () => {
    router.replace(`/telefono/medicos/${slug}#phone`);
    setShowData(true);
  };

  return (
    <section className="p-4">
      <div className="shadow-md w-full p-4 mb-8">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg mb-2">Datos</h3>
        </div>

        <ItemPageInfoBody
          name={name}
          tags={tags}
          showData={showData}
          handleShowVisibility={handleShowVisibility}
          phone={phone}
        />
      </div>
    </section>
  );
};

export default ItemPageInfoTab;
