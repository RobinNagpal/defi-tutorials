import { ViewerProps, withViewer } from "./SignerContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const provider = ethers.providers.getDefaultProvider("ropsten");

const RootDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5rem;
`;
function Header({ viewer }: ViewerProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const initialize = async () => {
    console.log("viewer", viewer);
    const address = await viewer.getAddress();
    setAddress(address);
    if (address) {
      const balanceNumber = await provider.getBalance(address);
      // balance is a BigNumber (in wei); format is as a sting (in ether)
      const etherString = ethers.utils.formatEther(balanceNumber);
      setBalance(etherString);
    }
  };
  useEffect(() => {
    initialize();
  }, [viewer]);
  return (
    <RootDiv>
      <ButtonGroup>
        <Button color="primary">
          Disconnect {address?.substring(0, 6)}({balance})
        </Button>
      </ButtonGroup>
    </RootDiv>
  );
}

export default withViewer(Header);
