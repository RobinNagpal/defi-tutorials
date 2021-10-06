import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React from "react";
import styled from "styled-components";
import TokenAmount from "token-amount";
import { ConnectionRejectedError, useWallet } from "use-wallet";

interface WalletProvider {
  label: string;
  handler: () => void;
}

const RootDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5rem;
`;

export default function WalletConnector() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const wallet = useWallet();
  const activate = (connector: string) => wallet.connect(connector);

  const options: WalletProvider[] = [
    { label: "Metamask", handler: () => activate("injected") },
    { label: "frame", handler: () => activate("frame") },
    { label: "portis", handler: () => activate("portis") },
    { label: "fortmatic", handler: () => activate("fortmatic") },
    { label: "torus", handler: () => activate("torus") },
    { label: "walletconnect", handler: () => activate("walletconnect") },
    { label: "walletlink", handler: () => activate("walletlink") },
  ];

  const handleMenuItemClick = (event: React.SyntheticEvent, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const resetWallet = () => {
    wallet.reset();
    setSelectedIndex(-1);
  };

  const balance = wallet.balance === "-1" ? "…" : TokenAmount.format(wallet.balance, 18, { symbol: "ETH" });
  const walletAccount = wallet.account;
  return (
    <RootDiv>
      {(() => {
        if (wallet.status === "connected") {
          return (
            <ButtonGroup>
              <Button onClick={() => resetWallet()} color="primary">
                Disconnect {walletAccount?.substring(0, 6)}({balance})
              </Button>
            </ButtonGroup>
          );
        }

        if (wallet.status === "connecting") {
          return <Button>Connecting...</Button>;
        }

        if (wallet.status === "disconnected") {
          return (
            <>
              <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleToggle}>{options[selectedIndex]?.label || "Connect wallet"}</Button>
                <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {options.map((option, index) => (
                            <MenuItem
                              key={option.label}
                              selected={index === selectedIndex}
                              onClick={(event) => {
                                handleMenuItemClick(event, index);
                                option.handler();
                              }}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          );
        }
      })()}
    </RootDiv>
  );
}
