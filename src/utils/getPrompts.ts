import { PromptsModel } from "@/lib/PromptModel";
import { OpinionModel } from "@/lib/OpinionModel";
import dbConnect from "@/lib/dbConnect";

export async function getPrompts() {
  // todo, implement pagination

  try {
    await dbConnect();
    const prompts = await PromptsModel.find({}).lean();

    const opinions = await OpinionModel.aggregate([
      {
        $group: {
          _id: "$promptId",
          averageRank: { $avg: "$rank" },
          count: { $sum: 1 },
        },
      },
    ]);

    const promptsWithOpinions = prompts.map((prompt: any) => {
      const opinion = opinions.find(
        (o) => o._id.toString() === prompt._id.toString()
      );
      return {
        ...prompt,
        averageRank: opinion ? opinion.averageRank : null,
        opinionsCount: opinion ? opinion.count : 0,
      };
    });

    return promptsWithOpinions;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
