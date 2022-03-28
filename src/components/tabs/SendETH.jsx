import { Button, Divider, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import Card from "../Card";
import { InputElement } from "..";
import {
  METAMASK_ACCOUNT_LENGTH,
  REGEX_ALL_ZERO,
  TOAST_PROPS,
} from "../../utils/constants";
import Moralis from "moralis";

const SendETH = () => {
  const [amount, setAmount] = useState("0");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amountError, setAmountError] = useState("");
  const [receiverAddressError, setReceiverAddressError] = useState("");

  const toast = useToast();

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(Number(isNaN(amount) ? 0 : amount)),
    receiver: receiverAddress,
    type: "native",
  });

  const resetFormData = () => {
    setAmount("0");
    setReceiverAddress("");
    setAmountError("");
    setReceiverAddressError("");
  };

  const validateReceiverAddress = (_reciverAddress) => {
    if (_reciverAddress === "") {
      setReceiverAddressError("Please enter a receiver address");
      return false;
    }
    if (_reciverAddress.length < METAMASK_ACCOUNT_LENGTH) {
      setReceiverAddressError("Receiver Address must be at least 3 characters");
      return false;
    }
    setReceiverAddressError("");
    return true;
  };

  const validateAmount = (_amount = "") => {
    const valueBeforeDecimalPoints = _amount.toString().split(".")[0] || "0";
    const valueAfterDecimalPoints = _amount.toString().split(".")[1] || "0";

    if (
      valueBeforeDecimalPoints.match(REGEX_ALL_ZERO) &&
      valueAfterDecimalPoints.match(REGEX_ALL_ZERO)
    ) {
      setAmountError("Enter valid amount! Amount should be greater than 0");
      return false;
    }
    if (_amount === "") {
      setAmountError("Enter amount");
      return false;
    }

    setAmountError("");
    return true;
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setReceiverAddress(value.trim());
    validateReceiverAddress(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountValidated = validateAmount(amount);
    const receiverAddressValidated = validateReceiverAddress(receiverAddress);
    const toastProps = TOAST_PROPS;
    if (amountValidated && receiverAddressValidated) {
      try {
        await Moralis.enableWeb3();
        const resp = await fetch();

        if (resp) {
          resetFormData();
          toastProps.title = "ETH successfully sent.";
          toastProps.description =
            "Fresh ETH are showing up into the receiver wallet";
          toast(toastProps);
          return;
        }
        toastProps.status = "error";
        toastProps.title = "Failed";
        toastProps.description = "Something went wrong!";
        toast(toastProps);
      } catch (error) {
        toastProps.status = "error";
        toastProps.title = "Failed";
        toastProps.description = error;
        toast(toastProps);
      }
    } else {
      toastProps.status = "error";
      toastProps.title = "Error";
      toastProps.description = "Please fill all the correct details";
      toast(toastProps);
    }
  };

  const isDisabled =
    receiverAddressError !== "" || amountError !== "" || isFetching;

  return (
    <Card>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        💳🤑💲 Send Ether 💱💰👛
      </Text>
      <Divider mb="4" />
      <form method="post" onSubmit={handleSubmit}>
        <InputElement
          label="Amount"
          name="amount"
          value={amount}
          handleChange={handleAmountChange}
          placeholder="Amount"
          error={amountError}
          type="number"
        />
        <InputElement
          label="Sent To"
          name="receiverAddress"
          value={receiverAddress}
          handleChange={handleChange}
          placeholder="Reciver Address"
          error={receiverAddressError}
        />
        <Button
          mt="20px"
          colorScheme="purple"
          type="submit"
          size="medium"
          fontSize="14px"
          p="8px 20px"
          disabled={isDisabled}
        >
          Send 🦅
        </Button>
      </form>
    </Card>
  );
};

export default SendETH;
