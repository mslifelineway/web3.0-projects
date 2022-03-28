import React from "react";
import { useMoralis } from "react-moralis";
import Login from "../pages/login";
import { Header } from ".";
import { Box, Flex } from "@chakra-ui/react";
import { CustomTabs } from "../components";

const Layout = ({ children }) => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <Flex flexDirection="column" h="100vh">
      <Header />
      <Box flexGrow="1" bg="purple.100" px="10px" py="20px">
        <CustomTabs />
        <Box>{children}</Box>
      </Box>
    </Flex>
  );
};

export default Layout;
