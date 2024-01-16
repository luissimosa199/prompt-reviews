import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <div>Page</div>;
};

export default Page;
