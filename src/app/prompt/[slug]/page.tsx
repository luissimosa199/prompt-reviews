import ItemPageBody from "@/components/ItemPageBody";
import ItemPageHeader from "@/components/ItemPageHeader";
import { Prompts } from "@/lib/PromptModel";
import { getPrompt } from "@/utils/getPrompt";
import React from "react";

const Prompt = async ({ params }: { params: { slug: string } }) => {
  const prompt = (await getPrompt(params.slug)) as Prompts;

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
        itemId={`${prompt._id}`}
        slug={prompt.slug}
        prompt={prompt.prompt}
        tags={prompt.tags}
        name={prompt.name}
        rank={4}
      />
    </main>
  );
};

export default Prompt;
