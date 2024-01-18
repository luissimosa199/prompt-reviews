import { PromptsModel } from "@/lib/PromptModel";
import { OpinionModel } from "@/lib/OpinionModel";
import dbConnect from "@/lib/dbConnect";

export async function getPrompt(slug: string) {
  // todo, implement pagination

  try {
    await dbConnect();
    const prompt: { _id: string } | null = await PromptsModel.findOne({
      slug,
    }).lean();

    if (!prompt) {
      throw new Error("Prompt not found");
    }

    const opinions = await OpinionModel.aggregate([
      { $match: { promptId: prompt._id } },
      {
        $group: {
          _id: "$promptId",
          averageRank: { $avg: "$rank" },
          count: { $sum: 1 },
        },
      },
    ]);

    let promptWithOpinions;

    if (opinions.length > 0) {
      promptWithOpinions = {
        ...prompt,
        rank: Math.round(opinions[0].averageRank),
        votes: opinions[0].count,
      };
    } else {
      promptWithOpinions = {
        ...prompt,
        rank: null,
        votes: 0,
      };
    }

    return promptWithOpinions;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
