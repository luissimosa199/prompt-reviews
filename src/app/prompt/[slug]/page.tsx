import ItemPageBody from "@/components/ItemPageBody";
import ItemPageHeader from "@/components/ItemPageHeader";
import { dataSample } from "@/data/prompts";
import React from "react";

const Prompt = ({ params }: { params: { slug: string } }) => {
  const prompt = dataSample.find((e) => e.slug === params.slug);

  if (!prompt) {
    return <p>Prompt no encontrado</p>;
  }

  return (
    <main className="bg-zinc-50">
      <ItemPageHeader
        image={prompt?.image || ""}
        name={prompt?.name || ""}
        type={prompt?.tags[0] || ""}
      />
      <ItemPageBody
        itemId={`${prompt.id}`}
        slug={prompt.slug}
        phone={prompt?.tags[0] || ""}
        tags={prompt.tags}
        name={prompt.name}
      />
    </main>
  );
};

export default Prompt;
