import ItemPageBody from "@/components/ItemPageBody";
import ItemPageHeader from "@/components/ItemPageHeader";
import UserAgentTracker from "@/components/UserAgentTracker";
import { Prompts } from "@/lib/PromptModel";
import { getPrompt } from "@/utils/getPrompt";
import { cookies } from "next/headers";

const PromptPage = async ({ params }: { params: { slug: string } }) => {
  const agentCookie = cookies().get("user_agent_id")?.value;
  const prompt = (await getPrompt(params.slug)) as Prompts & {
    rank: number;
    votes: number;
  };

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
        itemId={`${prompt._id}`}
        visible={true}
        slug={prompt.slug}
        prompt={prompt.prompt}
        name={prompt.name}
        tags={prompt.tags}
        rank={prompt.rank}
        votes={prompt.votes}
      />
      <UserAgentTracker agentCookie={agentCookie} />
    </main>
  );
};

export default PromptPage;
