import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
