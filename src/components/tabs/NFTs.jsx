import { Divider, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import Card from "../Card";

const NFTs = () => {
  const { user } = useMoralis();
  const { getNFTBalances, data } = useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "ropsten",
        address: user.get("ethAddress"),
      },
    });
  }, [getNFTBalances, user]);

  return (
    <Card>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        😎😍 My NFTs 😁🤗
      </Text>
      <Divider mb="6" />
      {data && data.result.length > 0 ? (
        data.result.map((_nft, index) => {
          <Image src={_nft.image} key={`${_nft.image}_${index}`} alt="ntf" />;
        })
      ) : (
        <Text fontSize="sm" mb="6" fontWeight="bold">
          Oops! No NTFs Found!
        </Text>
      )}
    </Card>
  );
};

export default NFTs;
