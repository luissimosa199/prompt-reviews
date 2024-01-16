import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "prompts_verifycode",
  },
})
export class VerifyCode {
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  code: string;
}

export const VerifyCodeModel =
  mongoose.models.VerifyCode || getModelForClass(VerifyCode);
