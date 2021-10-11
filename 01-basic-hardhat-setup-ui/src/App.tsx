import "./App.css";
import ViewerContext from "./components/SignerContext";
import TokenTransfer from "./components/TokenTransfer";
import "./custom.scss";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts/json-rpc-provider";
import { ThemeProvider, unstable_createMuiStrictModeTheme } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ethers } from "ethers";
import React, { useState } from "react";
import styled from "styled-components";

const theme = unstable_createMuiStrictModeTheme();

const RootDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

function SignIn(props: { login: () => Promise<void> }) {
  return (
    <RootDiv>
      <ButtonGroup>
        <Button onClick={() => props.login()} variant="contained">
          Signin with Metamask
        </Button>
      </ButtonGroup>
    </RootDiv>
  );
}

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  };

  return (
    <ThemeProvider theme={theme}>
      <ViewerContext.Provider value={signer}>
        <div className="App">{signer ? <TokenTransfer /> : <SignIn login={login} />}</div>
      </ViewerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
