import React, { useState, useEffect, useCallback } from "react";
import { Divider, Text, useToast } from "@chakra-ui/react";
import { Card } from "..";
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";
import Moralis from "moralis";
import { TOAST_PROPS } from "../../utils/constants";

const Balance = () => {
  const toast = useToast();
  const [ethBalance, setEthBalance] = useState(0);
  const { user } = useMoralis();
  const web3Api = useMoralisWeb3Api();
  const { fetchERC20Balances, data: erc20Tokens } = useERC20Balances();

  const fetchNativeBalance = useCallback(async () => {
    try {
      const nativeBalance = await web3Api.account.getNativeBalance({
        chain: "ropsten",
        address: user.get("ethAddress"),
      });
      if (nativeBalance && nativeBalance.balance) {
        setEthBalance(Moralis.Units.FromWei(nativeBalance.balance));
      }
    } catch (error) {
      const toastProps = TOAST_PROPS;
      toastProps.title = "Failed to fetch native balance!";
      toastProps.description = error;
      toast(toastProps);
    }
  }, [toast, user, web3Api.account]);

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: {
        chain: "ropsten",
        address: user.get("ethAddress"),
      },
    });
  }, [fetchERC20Balances, fetchNativeBalance, user]);

  return (
    <Card>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        My ERC20 Tokens
      </Text>
      <Text>💰 {ethBalance} ETH</Text>
      <Divider />
      {erc20Tokens &&
        erc20Tokens.map((token) => (
          <div key={token.symbol}>
            <Text>
              💰 {Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b>
            </Text>
            <Divider />
          </div>
        ))}
    </Card>
  );
};

export default Balance;
