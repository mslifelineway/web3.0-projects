import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

const InputElement = ({
  label,
  value,
  handleChange,
  type = "text",
  placeholder,
  name,
  error,
}) => {
  const TextInput = (
    <Input
      id={name}
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete="off"
      title={error !== "" ? error : value}
      focusBorderColor={error === "" ? "blue.300" : "red.300"}
      isInvalid={error !== "" ? true : false}
    />
  );

  const CustomNumberInput = (
    <NumberInput
      id={name}
      name={name}
      type={type}
      label={label}
      defaultValue={value}
      onChange={handleChange}
      placeholder={placeholder}
      title={error !== "" ? error : value}
      focusBorderColor={error === "" ? "blue.300" : "red.300"}
      isInvalid={error !== "" ? true : false}
      // precision={2}//0.00 (Number of 0 after decimal point)
      step={0.2}
    >
      <NumberInputField
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      <NumberInputStepper>
        <NumberIncrementStepper color="rgba(0,0,0,0.6)" />
        <NumberDecrementStepper color="rgba(0,0,0,0.6)" />
      </NumberInputStepper>
    </NumberInput>
  );

  return (
    <FormControl>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {(() => {
        switch (type) {
          case "text":
            return TextInput;
          case "number":
            return CustomNumberInput;
          default:
            return TextInput;
        }
      })()}
    </FormControl>
  );
};

export default InputElement;
