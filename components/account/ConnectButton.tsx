"use client";
import React from "react";
import { Avatar } from "@coinbase/onchainkit/identity";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      <div className="flex flex-grow ">
        {(() => {
          if (status === "disconnected") {
            return <ConnectAccount />;
          }

          return (
            <div className="flex h-8 w-8 items-center justify-center">
              {address && (
                <button
                  className="py-2 px-8 border-2 shadow-md bg-slate-500"
                  type="button"
                  onClick={() => disconnect()}
                >
                  <Avatar address={address} />
                </button>
              )}
            </div>
          );
        })()}
      </div>
    </>
  );
}
