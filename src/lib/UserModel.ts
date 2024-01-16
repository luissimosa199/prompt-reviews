import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "users",
  },
  options: {
    allowMixed: 0,
  },
})
export class User {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ default: "" })
  slug: string;

  @prop({ default: "" })
  bio: string;

  @prop({ default: false })
  online: boolean;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop()
  image?: string;

  @prop()
  tags?: string[];

  @prop({ default: [] })
  favorites?: string[];

  @prop({ type: [String], default: [] })
  user_agent_id: string[];

  @prop()
  photos?: string[];

  @prop()
  emailVerified?: Date | null;

  @prop({ default: false })
  disableAds?: boolean;

  @prop({ default: "USER" })
  role?: string;

  @prop()
  type?: string;

  @prop()
  address?: string;

  @prop()
  hours?: string;

  @prop()
  phone?: string;

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export const UserModel = mongoose.models.User || getModelForClass(User);
