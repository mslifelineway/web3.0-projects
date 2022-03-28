import React from "react";
import { Flex, Center, Text, Button, Link } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { user, logout } = useMoralis();

  return (
    <Flex>
      <Center
        w="100%"
        p="10px 2rem"
        bgGradient="linear(to-br, teal.400, purple.300)"
      >
        <Flex flexGrow={1}>
          <Link href="/">
            <Text
              fontWeight="bold"
              color="purple"
              fontSize={[10, 12, 14, 16, 22]}
            >
              NFT Moralis
            </Text>
          </Link>
        </Flex>
        <Flex alignItems="center">
          <Text mr="20px" fontSize="14px" color="white">
            {user.getUsername()}
          </Text>
          <Button
            onClick={() => logout()}
            size="small"
            p="6px 20px"
            fontSize="14px"
            color="red"
          >
            Logout
          </Button>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Header;
