import React from "react";
import styled from "styled-components";

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

export default function TokenTransfer() {
  return (
    <RootDiv className="container text-start">
      <StyledButton className="btn btn-sm">Add Row</StyledButton>
      <StyledTable className="text-start">
        <tr>
          <th>Address</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>
            <AddressInput />
          </td>
          <td>
            <input />
          </td>
        </tr>
      </StyledTable>

      <StyledButton className="btn btn-sm">Save</StyledButton>
    </RootDiv>
  );
}
