import ItemPageBody from "@/components/ItemPageBody";
import ItemPageHeader from "@/components/ItemPageHeader";
import { dataSample } from "@/data/prompts";

const PromptPage = ({ params }: { params: { slug: string } }) => {
  const prompt = dataSample.find((e) => e.slug === params.slug);

  if (!prompt) {
    return <p>Error</p>;
  }

  return (
    <main className="bg-zinc-50">
      <ItemPageHeader
        image={prompt.image}
        name={prompt.name}
        type={prompt.tags[0]}
      />
      <ItemPageBody
        itemId={`${prompt.id}`}
        visible={true}
        slug={prompt.slug}
        prompt={prompt.prompt}
        name={prompt.name}
        tags={prompt.tags}
        rank={prompt.rank}
      />
    </main>
  );
};

export default PromptPage;
