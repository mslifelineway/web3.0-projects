import { Button, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useMoralis } from "react-moralis";
import Card from "../Card";
import InputElement from "../InputElement";
import { shortenAddress } from "../../utils/helpers";
import { TOAST_PROPS } from "../../utils/constants";

const Profile = () => {
  const { user, setUserData, isUserUpdating } = useMoralis();
  const [username, setUsername] = React.useState(user.getUsername());
  const [usernameError, setUsernameError] = React.useState("");
  const toast = useToast();

  const validateUsername = (_username) => {
    if (_username === "") {
      setUsernameError("Please enter a username");
      return false;
    }
    if (_username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError("");
    return true;
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setUsername(value.trim());
    validateUsername(value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUsername(username)) {
      try {
        const resp = await setUserData({
          username,
        });
        if (resp) {
          setUsername(user.getUsername());
          setUsernameError("");
        }
      } catch (error) {
        const toastProps = TOAST_PROPS;
        toastProps.title = "Username couldn't updated!";
        toastProps.description = error;
        toast(toastProps);
      }
    }
  };

  const isDisabled = username === "" || username.length < 3;

  return (
    <Card>
      <Text textAlign="left" fontSize="14px">
        <b>Username:</b> {user.getUsername()}
      </Text>
      <Text textAlign="left" fontSize="14px" mb="20px">
        <b>Wallet Address:</b> {shortenAddress(user.get("ethAddress"))}
      </Text>
      <form method="post" onSubmit={handleSubmit}>
        <InputElement
          label="Username"
          name="username"
          value={username}
          handleChange={handleChange}
          placeholder="Username"
          error={usernameError}
        />
        <Button
          mt="20px"
          colorScheme="purple"
          type="submit"
          size="medium"
          fontSize="14px"
          p="8px 20px"
          disabled={isDisabled || isUserUpdating}
        >
          Change Username 😎
        </Button>
      </form>
    </Card>
  );
};

export default Profile;
