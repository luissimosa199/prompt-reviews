import { OpinionModel } from "@/lib/OpinionModel";
import { PromptsModel } from "@/lib/PromptModel";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || null;

  if (!id) {
    return Response.json(
      { error: "Missing id in query parameters" },
      { status: 400 }
    );
  }

  const opinion = await OpinionModel.findById(id);

  if (!opinion) {
    return Response.json({ error: "Opinion not found" }, { status: 404 });
  }

  opinion.aproved = true;
  await opinion.save();

  return Response.json(
    { message: "Opinion approved successfully" },
    { status: 200 }
  );
}

export async function GET(req: Request, res: Request) {
  const url = new URL(req.url);

  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";
  const promptId = url.searchParams.get("promptId") || null;

  if (!promptId) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startIndex =
      (parseInt(page as string) - 1) * parseInt(limit as string);

    const opinions = await OpinionModel.find({
      aproved: false,
    })
      .select("name email promptName createdAt rank comment files audio")
      .skip(startIndex)
      .limit(parseInt(limit as string));

    const totalOpinions = await OpinionModel.countDocuments({
      aproved: false,
    });
    const totalPages = Math.ceil(totalOpinions / parseInt(limit as string));

    return Response.json(
      {
        opinions,
        totalPages,
        currentPage: parseInt(page as string),
        totalOpinions,
      },
      { status: 200 }
    );
  }

  const promptExists = await PromptsModel.exists({ _id: promptId });

  if (!promptExists) {
    return Response.json({ error: "Prompt not found" }, { status: 404 });
  }

  const opinions = await OpinionModel.find({
    promptId,
    aproved: true,
  }).select("name createdAt rank comment files audio");
  return Response.json({ opinions }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.rank || !body.comment) {
    return Response.json(
      { error: "Error: Missing rank or comment" },
      { status: 400 }
    );
  }

  try {
    const newOpinion = new OpinionModel({
      _id: nanoid(9),
      name: body.name || "Anónimo",
      rank: body.rank,
      comment: body.comment,
      email: body.email || "",
      promptName: body.promptName,
      promptId: body.promptId,
      files: body.files || [],
      audio: body.audio,
    });

    await newOpinion.save();

    return Response.json({ message: "Comment Saved" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: `Error: ${JSON.stringify(err)}` },
      { status: 500 }
    );
  }
}
