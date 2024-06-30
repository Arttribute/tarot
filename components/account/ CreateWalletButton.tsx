import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect } from "wagmi";
import { Button } from "../ui/button";

export function CreateWalletButton({ height = 66, width = 200 }) {
  const { connectors, connect } = useConnect();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);
  return <Button onClick={createWallet}>Create Wallet</Button>;
}
