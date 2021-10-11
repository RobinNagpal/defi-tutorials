import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";

function BalanceComponent(props: { getBalance: (address: string) => Promise<number>; address: string }) {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    props.getBalance(props.address).then((balance) => setBalance(balance));
  });

  return <>{balance}</>;
}
export interface TokenBalanceProps {
  getBalance: (address: string) => Promise<number>;
  tokenHolders: string[];
}
export default function TokenBalance({ getBalance, tokenHolders }: TokenBalanceProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokenHolders.map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                <BalanceComponent getBalance={getBalance} address={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
