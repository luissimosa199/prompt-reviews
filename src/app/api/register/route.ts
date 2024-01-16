import dbConnect from "../../../lib/dbConnect";
import { UserModel } from "../../../lib/UserModel";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method Not Supported" }, { status: 405 });
  }

  const { name, email, password, user_agent_id, isDoctor, type } =
    await req.json();

  if (!name || !email || !password) {
    return Response.json(
      { error: "Campos requeridos incompletos." },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "Usuario con el mismo mail ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let slug = name.toLowerCase().replaceAll(" ", "-");
    let originalSlug = slug;
    let counter = 1;

    while (true) {
      const existingSlugUser = await UserModel.findOne({ slug });
      if (!existingSlugUser) break;
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    const user = new UserModel({
      name,
      email,
      user_agent_id,
      password: hashedPassword,
      slug,
      type,
      role: isDoctor === "true" ? "DOCTOR" : "USER",
    });
    await user.save();

    return Response.json(
      { error: "Usuario registrado correctamente." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
