import { Prompts, PromptsModel } from "@/lib/PromptModel";
import dbConnect from "@/lib/dbConnect";

export async function getPrompts() {
  // todo, implement pagination

  try {
    await dbConnect();
    const prompts = await PromptsModel.find({}).lean();
    return prompts;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
