"use client";

import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    // Redirect users to the resources page since signup has been removed
    if (typeof window !== "undefined") {
      window.location.replace("/resources");
    }
  }, []);

  return null;
}