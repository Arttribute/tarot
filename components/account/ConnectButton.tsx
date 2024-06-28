"use client";
import React from "react";
import { Avatar } from "@coinbase/onchainkit/identity";
import { useAccount, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();
  return <>Connect Button</>;
}
