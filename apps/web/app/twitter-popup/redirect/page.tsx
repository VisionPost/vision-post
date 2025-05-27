"use client";

import { useEffect } from "react";

export default function TwitterPopupRedirect() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage("twitter-connected", window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-white">Connected successfully. You can close this tab.</p>
    </div>
  );
}
