"use client";
import { SessionProvider } from "next-auth/react";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
