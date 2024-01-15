"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ItemPageInfoBody from "./ItemPageInfoBody";

const ItemPageInfoTab = ({
  visible,
  prompt,
  tags,
  name,
  slug,
  rank,
}: {
  visible?: boolean;
  prompt: string;
  tags: string[];
  name: string;
  slug: string;
  rank: number;
}) => {
  const [showData, setShowData] = useState<boolean>(!!visible);
  const router = useRouter();

  const handleShowVisibility = () => {
    router.replace(`/detail/prompt/${slug}#prompt`);
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
          prompt={prompt}
          rank={rank}
        />
      </div>
    </section>
  );
};

export default ItemPageInfoTab;
