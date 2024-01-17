"use server";
import slug from "slug";
import { PromptsModel } from "@/lib/PromptModel";
import dbConnect from "@/lib/dbConnect";

export const handleNewPrompt = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const prompt = formData.get("prompt") as string;
  const tags = JSON.parse(formData.get("tags") as string);
  const image = formData.get("image") as string;

  const promptSlug = slug(name, { lower: true });

  const promptData = {
    name,
    prompt,
    tags,
    image,
    slug: promptSlug,
  };

  if (!name || !prompt || !tags || !image) {
    return {
      success: false,
      message: "Faltan datos",
    };
  }

  const newPrompt = new PromptsModel(promptData);

  try {
    await dbConnect();
    await newPrompt.save();
    return {
      success: true,
      message: "Prompt enviada exitosamente",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
