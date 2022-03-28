import { Box } from "@chakra-ui/react";
import React from "react";

const Card = ({ children }) => {
  return (
    <Box
      height="full"
      background="#fff"
      px="40px"
      py="40px"
      rounded="lg"
      shadow="lg"
      textAlign="center"
    >
      {children}
    </Box>
  );
};

export default Card;
