"use client";
import useTrackUserAgent from "@/hooks/useTrackUserAgent";
import React from "react";

const UserAgentTracker = ({
  agentCookie,
}: {
  agentCookie: string | undefined;
}) => {
  useTrackUserAgent(agentCookie);
  return <div className="hidden"></div>;
};

export default UserAgentTracker;
