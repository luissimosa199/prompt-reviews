import { PromptsModel } from "@/lib/PromptModel";
import dbConnect from "@/lib/dbConnect";

export async function getPrompt(slug: string) {
  // todo, implement pagination

  try {
    await dbConnect();
    const prompt = await PromptsModel.findOne({ slug }).lean();
    return prompt;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
