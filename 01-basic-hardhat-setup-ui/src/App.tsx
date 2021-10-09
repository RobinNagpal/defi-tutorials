import "./App.css";
import TokenTransfer from "./components/TokenTransfer";
import WalletConnector from "./components/wallet/WalletConnector";
import "./custom.scss";
import { createTheme, ThemeProvider, unstable_createMuiStrictModeTheme } from "@mui/material";
import { ethers } from "ethers";
import React from "react";
import { UseWalletProvider } from "use-wallet";

const provider = ethers.providers.getDefaultProvider("ropsten");

const address = "0x873bf2251d2B59F4a9e538092E503aFCD78a5de9";
const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        connectors={{
          injected: {
            //allows you to connect and switch between mainnet and rinkeby within Metamask.
            chainId: [3],
          },
          fortmatic: {
            chainId: [1],
            apiKey: "",
          },

          metamask: {
            chainId: [3],
          },
          portis: {
            dAppId: "",
            chainId: [1],
          },
          walletconnect: {
            chainId: [1],
            rpcUrl: "https://mainnet.eth.aragon.network/",
          },
          walletlink: {
            chainId: [1],
            url: "https://mainnet.eth.aragon.network/",
          },
        }}
      >
        <WalletConnector />

        <div className="App">
          <TokenTransfer />
        </div>
      </UseWalletProvider>
    </ThemeProvider>
  );
}

export default App;
