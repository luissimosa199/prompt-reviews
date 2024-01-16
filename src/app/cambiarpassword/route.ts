import dbConnect from "../../lib/dbConnect";
import { UserModel } from "../../lib/UserModel";
import bcrypt from "bcrypt";
import { VerifyCodeModel } from "@/lib/VerifyCodeModel";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method Not Supported" }, { status: 405 });
  }

  const { email, newPassword, mailValidated } = await req.json();

  if (!mailValidated) {
    return Response.json({ error: "Mail no validado." }, { status: 400 });
  }

  // Input validation
  if (!email || !newPassword) {
    return Response.json(
      { error: "Campos requeridos incompletos." },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return Response.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Hash the new password and update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    await VerifyCodeModel.deleteMany({ email: email });

    return Response.json(
      { error: "Contraseña actualizada correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
