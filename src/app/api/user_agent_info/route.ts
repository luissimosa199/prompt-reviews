import { PromptsUserAgentModel } from "@/lib/UserAgentModel";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const useCookie = cookies();
  const { userData } = await req.json();
  const newId = uuidv4() as string;
  try {
    await dbConnect();

    const userAgent = new PromptsUserAgentModel({
      visits: [userData],
      _id: newId,
    });

    await userAgent.save();
    useCookie.set("user_agent_id", newId, {
      httpOnly: process.env.NODE_ENV !== "development",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      sameSite: "strict",
      path: "/",
    });

    return Response.json({ message: "userAgent registered" });
  } catch (error) {
    console.error("Error creating UserAgent:", error);
    return Response.json({ error: "Failed to create userAgent" });
  }
}

export async function PUT(req: Request) {
  const { userData, id } = await req.json();

  try {
    await dbConnect();
    await PromptsUserAgentModel.findByIdAndUpdate(id, {
      $push: { visits: userData },
    });

    return Response.json({ message: "UserAgent updated" });
  } catch (error) {
    console.error("Error updating UserAgent:", error);
    return Response.json({ error: "Failed to update userAgent" });
  }
}
