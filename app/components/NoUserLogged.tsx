"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function NoUserLogged() {
  const router = useRouter();
  useEffect(() => {
    router.push("/accounts/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
