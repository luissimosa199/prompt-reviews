"use server";
import slug from "slug";
import { PromptsModel } from "@/lib/PromptModel";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const handleNewPrompt = async (
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const prompt = formData.get("prompt") as string;
  const tags = JSON.parse(formData.get("tags") as string);
  const image = formData.get("image") as string;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Es necesario iniciar sesión",
    };
  }

  const promptSlug = slug(name, { lower: true });

  const promptData = {
    name,
    prompt,
    tags,
    image,
    slug: promptSlug,
    user: session?.user?.email,
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
