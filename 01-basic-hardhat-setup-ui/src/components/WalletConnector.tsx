import React from "react";
import TokenAmount from "token-amount";
import { ConnectionRejectedError, UseWalletProvider, useWallet } from "use-wallet";

export default function WalletConnector() {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber!();
  const activate = (connector: string) => wallet.connect(connector);

  return (
    <>
      <h1>use-wallet</h1>

      {(() => {
        if (wallet.error?.name) {
          return (
            <p>
              <span>
                {wallet.error instanceof ConnectionRejectedError ? "Connection error: the user rejected the activation" : wallet.error.name}
              </span>
              <button onClick={() => wallet.reset()}>retry</button>
            </p>
          );
        }

        if (wallet.status === "connecting") {
          return (
            <p>
              <span>Connecting to {wallet.connector}…</span>
              <button onClick={() => wallet.reset()}>cancel</button>
            </p>
          );
        }

        if (wallet.status === "connected") {
          return (
            <p>
              <span>Connected.</span>
              <button onClick={() => wallet.reset()}>disconnect</button>
            </p>
          );
        }

        return (
          <div className="connect">
            <div className="connect-label">Connect:</div>
            <div className="connect-buttons">
              <button onClick={() => activate("injected")}>Metamask</button>
              <button onClick={() => activate("frame")}>frame</button>
              <button onClick={() => activate("portis")}>portis</button>
              <button onClick={() => activate("fortmatic")}>fortmatic</button>
              <button onClick={() => activate("torus")}>torus</button>
              <button onClick={() => activate("walletconnect")}>walletconnect</button>
              <button onClick={() => activate("walletlink")}>walletlink</button>
            </div>
          </div>
        );
      })()}

      {wallet.status === "connected" && (
        <>
          <p>
            <span>Account:</span>
            <span>{wallet.account}</span>
          </p>
        </>
      )}

      {wallet.account && (
        <p>
          <span>Balance:</span>
          <span>{wallet.balance === "-1" ? "…" : TokenAmount.format(wallet.balance, 18, { symbol: "ETH" })}</span>
        </p>
      )}

      {wallet.status === "connected" && (
        <p>
          <span>Block:</span> <span>{blockNumber || "…"}</span>
        </p>
      )}
    </>
  );
}
