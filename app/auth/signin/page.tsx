"use client";

import { useEffect } from "react";

export default function SignIn() {
  useEffect(() => {
    // Redirect users to the resources page since sign-in has been removed
    window.location.replace("/resources");
  }, []);

  return null;
}