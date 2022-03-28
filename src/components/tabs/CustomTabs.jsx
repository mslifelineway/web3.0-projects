import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { TOAST_PROPS } from "../../utils/constants";
import Balance from "./Balance";
import NFTs from "./NFTs";
import Profile from "./Profile";
import SendETH from "./SendETH";
import Transactions from "./Transactions";

const tabs = ["Profile", "Balance", "Transactions", "NFTs", "Send ETH"];

const CustomTabs = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useMoralis();
  const web3Api = useMoralisWeb3Api();
  const toast = useToast();

  const fetchTransactions = useCallback(async () => {
    try {
      const resp = await web3Api.account.getTransactions({
        chain: "ropsten",
        address: user.get("ethAddress"),
        limit: 5,
      });
      if (resp && resp.result) {
        setTransactions(resp.result);
      }
    } catch (error) {
      const toastProps = TOAST_PROPS;
      toastProps.title = "Failed to fetch transactions!";
      toastProps.description = error;
      toast(toastProps);
    }
  }, [toast, user, web3Api.account]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const RenderTabs = () =>
    tabs.map((_tab, index) => (
      <Tab
        key={`${_tab}_${index}`}
        fontSize={[10, 12, 14, 16, 18]}
        _focus={{ outline: "none" }}
        _selected={{
          borderColor: "inherit",
          borderBottomColor: "rgba(0,0,0, 0.4)",
        }}
      >
        {_tab}
      </Tab>
    ));

  const renderTabPanel = (index) => {
    switch (index) {
      case 0:
        return <Profile />;
      case 1:
        return <Balance />;
      case 2:
        return <Transactions transactions={transactions} />;
      case 3:
        return <NFTs />;
      case 4:
        return <SendETH />;
      default:
        <Text>Unknow tab</Text>;
    }
  };
  const renderTabPanels = () => {
    return tabs.map((_tab, index) => (
      <TabPanel key={`${_tab}_${index}`} tabIndex={index}>
        {renderTabPanel(index)}
      </TabPanel>
    ));
  };

  const handleTabChange = (tabId) => {
    if (tabId === 2) {
      fetchTransactions();
    }
  };

  return (
    <Tabs
      align="center"
      w={["100%", "80%", "60%", "50%", "50%"]}
      m="auto"
      // isLazy={true}
      onChange={handleTabChange}
    >
      <TabList>
        <RenderTabs />
      </TabList>
      <TabPanels px={[0, 1, 2, "5rem"]}>{renderTabPanels()}</TabPanels>
    </Tabs>
  );
};

export default CustomTabs;
