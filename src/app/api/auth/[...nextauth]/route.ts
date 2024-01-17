import { authOptions } from "./options";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export interface CustomSession extends Session {
  role?: string;
}

export interface CustomAdapterUser extends AdapterUser {
  role?: string; // Assuming role is of type string; adjust as necessary
}

export interface CustomNextApiRequest extends NextApiRequest {
  // Add any custom request properties here
}

export interface CustomNextApiResponse<T = any> extends NextApiResponse<T> {
  // Add any custom response properties here
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
