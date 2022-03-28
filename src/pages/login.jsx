import { Button, Center, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { MESSAGES, TOAST_PROPS } from "../utils/constants";

const Login = () => {
  const toast = useToast();
  const { authenticate, authError } = useMoralis();

  useEffect(() => {
    if (authError) {
      const toastProps = TOAST_PROPS;
      toastProps.title = "Authentication Failed";
      toastProps.description = authError.message;
      toast(toastProps);
    }
  }, [authError, toast]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Center
        w="100%"
        h="100vh"
        bg="green.500"
        bgGradient="linear(to-br, teal.400, purple.300)"
        flexDirection="column"
      >
        <Text fontSize="4xl" fontWeight="bold" color="white">
          Login
        </Text>
        <Button
          mt="6"
          colorScheme="purple"
          size="medium"
          padding="3"
          onClick={() =>
            authenticate({
              signingMessage: MESSAGES.METAMASK_AUTH_MESSAGE,
            })
          }
        >
          Login with metamask
        </Button>
      </Center>
    </>
  );
};

export default Login;
