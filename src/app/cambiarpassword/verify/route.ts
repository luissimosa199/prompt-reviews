import dbConnect from "../../../lib/dbConnect";
import { UserModel } from "../../../lib/UserModel";
import { VerifyCodeModel } from "@/lib/VerifyCodeModel";
import sendgrid from "@sendgrid/mail";

let isModelInitialized = false;

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method Not Supported" }, { status: 405 });
  }

  const { email, code } = await req.json();

  if (!email) {
    return Response.json(
      { error: "Campos requeridos incompletos." },
      { status: 400 }
    );
  }

  await dbConnect();

  if (!isModelInitialized) {
    await VerifyCodeModel.init();
    isModelInitialized = true;
  }

  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    return Response.json({ error: "Usuario no encontrado." }, { status: 404 });
  }

  try {
    if (!code) {
      const uuid = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      const createNewCode = new VerifyCodeModel({
        email: email,
        code: uuid,
      });

      await createNewCode.save();

      sendgrid.setApiKey(process.env.SEND_GRID_API_KEY as string);

      const emailHtml = `<p> Este es tu codigo de validacion: ${uuid} </p>`;

      const options = {
        from: "javier.doxadoctor@gmail.com",
        to: email,
        subject: "Cambia tu contraseña",
        html: emailHtml,
      };

      await sendgrid.send(options);

      return Response.json(
        { message: "Codigo creado y enviado" },
        { status: 200 }
      );
    } else {
      const verifyCode = await VerifyCodeModel.find({ code: code });

      if (verifyCode) {
        return Response.json({ message: "Codigo validado" }, { status: 200 });
      } else {
        return Response.json({ error: "Codigo incorrecto" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
