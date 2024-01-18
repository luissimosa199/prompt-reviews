"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import UAParser from "ua-parser-js";

const useTrackUserAgent = (userAgentCookie: string | undefined) => {
  const utmKeys = [
    "u",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  const hasCookie = userAgentCookie;

  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    let utm_params: { [key: string]: string | string[] } = {};

    for (let key of utmKeys) {
      if (searchParams.get(key)) {
        utm_params[key] = searchParams.getAll(key);
      }
    }

    const parser = new UAParser(window.navigator.userAgent);
    const userData = {
      timestamp: new Date(),
      utm_params,
      entry_point: window.location.href,
      os: parser.getOS(),
      browser: parser.getBrowser(),
      device: parser.getDevice(),
    };

    fetch("/api/user_agent_info", {
      method: hasCookie ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData, id: userAgentCookie }),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrackUserAgent;
