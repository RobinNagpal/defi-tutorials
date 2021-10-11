import { ViewerProps, withViewer } from "./SignerContext";
import TokenContractJson from "./Token.json";
import TokenBalance from "./TokenBalance";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { BigNumber, ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

const network = ethers.providers.getNetwork({ name: "ropsten", chainId: 3 });
const provider = ethers.providers.getDefaultProvider("ropsten");

const address = "0x873bf2251d2B59F4a9e538092E503aFCD78a5de9";

const StyledBox = styled(Box)``;

const RootDiv = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddressTextField = styled(TextField)`
  min-width: 500px !important;
`;
const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  align-items: start;
  margin: 3rem 0;
  text-align: left;
`;

const StyledTable = styled.table`
  tr {
    th {
      align-items: start;
      padding-right: 2rem;
    }
    td {
      padding-right: 2rem;
    }
  }
`;

function TokenTransfer({ viewer }: ViewerProps) {
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [tokenHolders, setTokenHolders] = useState<string[]>([]);
  const [sendAddress, setSendAddress] = useState<string | null>("0x3F41520c4A7C578644d5E5256c1E040e863bD662");
  const [sendAmount, setSendAmount] = useState<number | null>(100);
  const contract = new ethers.Contract(TokenContractJson.address, TokenContractJson.abi, viewer);

  const getBalance = async (address: string): Promise<number> => {
    if (address) {
      const balance: BigNumber = await contract.balanceOf(address);
      return balance.toNumber();
    } else {
      return Promise.resolve(0);
    }
  };

  const initialize = async () => {
    console.log("contract", contract);
    const supply: BigNumber = await contract.totalSupply();
    setTotalSupply(supply.toNumber());
    const holders: string[] = await contract.getTokenHoldersArray();
    setTokenHolders(holders);
  };

  useEffect(() => {
    initialize();
  }, []);

  const sendTokens = async () => {
    if (sendAddress) contract.transfer(getAddress(sendAddress), BigNumber.from(sendAmount));
  };

  const onSendAddressChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSendAddress(e.target.value);
  };

  const onSendAmountChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setSendAmount(parseInt(e.target.value));
  };
  return (
    <RootDiv>
      <StyledBox>
        <h2>Transfer Tokens</h2>
        <StyledTable>
          <tbody>
            <tr>
              <td>
                <AddressTextField required id="filled-required" label="Address" variant="filled" onChange={onSendAddressChange} value={sendAddress} />
              </td>
              <td>
                <TextField required id="filled-required" label="Amount" variant="filled" onChange={onSendAmountChange} value={sendAmount} />
              </td>
            </tr>
          </tbody>
        </StyledTable>

        <StyledButtonGroup variant="contained">
          <Button onClick={() => sendTokens()}>Transfer</Button>
        </StyledButtonGroup>

        <hr />
        <h2>Total Supply - {totalSupply}</h2>
        <TokenBalance getBalance={getBalance} tokenHolders={tokenHolders} />
      </StyledBox>
    </RootDiv>
  );
}

export default withViewer(TokenTransfer);
