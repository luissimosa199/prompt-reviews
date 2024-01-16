import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "prompts",
  },
})
export class Prompts {
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  code: string;
}

export const PromptsModel =
  mongoose.models.Prompts || getModelForClass(Prompts);
