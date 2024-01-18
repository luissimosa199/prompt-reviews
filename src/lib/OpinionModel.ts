import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "prompts_opinions",
  },
  options: {
    allowMixed: 0,
  },
})
export class Opinion {
  @prop({ default: () => new Date() })
  createdAt: Date;

  @prop({ default: () => new Date() })
  updatedAt: Date;

  @prop()
  _id: string;

  @prop()
  name: string;

  @prop()
  rank: number;

  @prop()
  comment: string;

  @prop({ default: [] })
  files: string[];

  @prop()
  email: string;

  @prop()
  promptName: string;

  @prop()
  promptId: string;

  @prop()
  audio: string;

  @prop({ default: false })
  aproved: boolean;
}

export const OpinionModel =
  mongoose.models.Opinion || getModelForClass(Opinion);
