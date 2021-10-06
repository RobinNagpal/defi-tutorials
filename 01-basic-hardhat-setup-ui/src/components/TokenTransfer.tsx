import { ethers } from "ethers";
import React, { useEffect } from "react";
import styled from "styled-components";

const provider = ethers.providers.getDefaultProvider("ropsten");

const address = "0x873bf2251d2B59F4a9e538092E503aFCD78a5de9";

const RootDiv = styled.div`
  padding: 5rem;
`;

const StyledButton = styled.button`
  background-color: #dddddd;
  color: #282c34;
  margin: 3rem 0 3rem 3rem;
`;

const StyledTable = styled.table`
  tr {
    th {
      align-items: start;
      padding-left: 3rem;
    }
    td {
      padding-left: 3rem;
    }
  }
`;

const AddressInput = styled.input`
  min-width: 500px;
`;

async function connectSigner() {
  // await provider.sendTransaction("eth_requestAccounts", []);
  // const signer = provider.getSigner();
  // console.log("Account:", await signer.getAddress());
}

export default function TokenTransfer() {
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
  return (
    <RootDiv className="container text-start">
      <StyledTable className="text-start">
        <tbody>
          <tr>
            <td>Address</td>
            <td>Amount</td>
          </tr>
          <tr>
            <td>
              <AddressInput />
            </td>
            <td>
              <input />
            </td>
          </tr>
        </tbody>
      </StyledTable>

      <StyledButton className="btn btn-sm">Save</StyledButton>
    </RootDiv>
  );
}
