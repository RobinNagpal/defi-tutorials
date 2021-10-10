import TokenContractJson from "./Token.json";
import TokenBalance from "./TokenBalance";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";

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

export default function TokenTransfer() {
  const wallet = useWallet();

  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [tokenHolders, setTokenHolders] = useState<string[]>([]);

  useEffect(() => {
    provider.getBalance(address).then(function (balance) {
      // balance is a BigNumber (in wei); format is as a sting (in ether)
      const etherString = ethers.utils.formatEther(balance);

      console.log("Balance: " + etherString);
    });

    provider.getTransactionCount(address).then(function (transactionCount) {
      console.log("Total Transactions Ever Send: " + transactionCount);
    });

    provider.resolveName("test.ricmoose.eth").then(function (address) {
      console.log("Address: " + address);
    });
  });
  const doSomething = async () => {
    const contract = new ethers.Contract(TokenContractJson.address, TokenContractJson.abi, provider);
    console.log("contract", contract);

    const supply: BigNumber = await contract.totalSupply();
    setTotalSupply(supply.toNumber());
    const holders: string[] = await contract.tokenHolders();
    console.log("holders", holders);
    setTokenHolders(holders);
  };

  useEffect(() => {
    doSomething();
  });
  console.log("TokenTransfer", wallet);

  return (
    <RootDiv>
      <StyledBox>
        <h2>Transfer Tokens</h2>
        <StyledTable>
          <tbody>
            <tr>
              <td>
                <AddressTextField required id="filled-required" label="Address" variant="filled" />
              </td>
              <td>
                <TextField required id="filled-required" label="Amount" variant="filled" />
              </td>
            </tr>
          </tbody>
        </StyledTable>

        <StyledButtonGroup variant="contained">
          <Button>Transfer</Button>
        </StyledButtonGroup>

        <hr />
        <h2>Total Supply - {totalSupply}</h2>
        <TokenBalance />
      </StyledBox>
    </RootDiv>
  );
}
