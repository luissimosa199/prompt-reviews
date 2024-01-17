import { PromptsModel } from "@/lib/PromptModel";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const tags = await PromptsModel.distinct("tags");
      return Response.json(tags, { status: 200 });
    } catch (error) {
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}
