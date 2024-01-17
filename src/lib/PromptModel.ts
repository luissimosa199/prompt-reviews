import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "prompts",
  },
})
export class Prompts {
  @prop({ default: () => uuidv4() })
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  user: string;

  @prop({ required: true })
  prompt: string;

  @prop()
  image: string;

  @prop({ default: [] })
  tags: string[];

  @prop()
  slug: string;
}

export const PromptsModel =
  mongoose.models.Prompts || getModelForClass(Prompts);
