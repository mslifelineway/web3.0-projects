export const shortenAddress = (address = "") => {
  if (address !== "" && typeof address === "string") {
    return `${address.substring(0, 5)}...${address.substring(
      address.length - 4,
      address.length
    )}`;
  }
};
