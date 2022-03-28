import { Link, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { ROPSTEN_ETHERSCAN_URL } from "../../utils/constants";
import Card from "../Card";
import { shortenAddress } from "../../utils/helpers";

const Transactions = ({ transactions = [] }) => {
  return (
    <Card>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        💰 Last 5 Transactions 💰
      </Text>
      <List margin="0 auto" width="fit-content" styleType="number">
        {transactions &&
          transactions.map((_tx, index) => (
            <ListItem key={`${_tx.hash}_${index}`}>
              <Link
                href={`${ROPSTEN_ETHERSCAN_URL}/tx/${_tx.hash}`}
                isExternal
                color="#000"
                textAlign="left"
                align="left"
                display="block"
                borderBottom={
                  index !== transactions.length - 1 ? "1px solid #eee" : "none"
                }
                padding=".5rem 0"
                _hover={{ color: "blue" }}
              >
                {shortenAddress(_tx.hash)}
              </Link>
            </ListItem>
          ))}
      </List>
    </Card>
  );
};

export default Transactions;
