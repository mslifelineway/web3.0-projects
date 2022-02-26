import React, { useContext, useState } from "react";
import { MoralisContext } from "../../contexts/MoralisContext";
import { Button, Input } from "..";
import AuthFormLogo from "../../assets/images/girl-with-sphare.svg";
import MetamaskFox from "../../assets/images/metamask-fox.svg";
import CloseIcon from "../../assets/images/close-icon.svg";
import GoogleG from "../../assets/images/google-g-icon.svg";
import Divider from "../../assets/images/divider.svg";
import { GlobalContext } from "../../contexts/GlobalContext";
import { errorMessages } from "../../utils/constants";

import "./styles.css";

const defaultValues = {
  email: "",
  password: "",
};
const defaultErrors = {
  email: "",
  password: "",
};

const AuthForm = () => {
  const { handleAuthFormModalClose, handleWalletsModalOpen } =
    useContext(GlobalContext);
  const { signUpWithEmailAndPassword } = useContext(MoralisContext);

  const [emailSignup, setEmailSignup] = useState(false);
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      setErrors({ ...errors, [name]: errorMessages[name] });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateFormData = () => {
    let validated = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        validated = false;
        newErrors[key] = errorMessages[key];
      } else {
        newErrors[key] = "";
      }
    });
    setErrors(newErrors);
    return validated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      await signUpWithEmailAndPassword(formData);
      
    }
  };

  return (
    <div className="authform">
      {/* <ToastContainer {...toastMessageOptions} /> */}
      <div className="authform__inner">
        <img
          src={CloseIcon}
          alt="Close"
          className="close__icon"
          title="Close"
          onClick={handleAuthFormModalClose}
        />
        <img
          src={AuthFormLogo}
          alt="authform logo"
          className="auth__logo mb45"
        />
        <div className="authform__wrapper">
          {emailSignup ? (
            <div className="signup__form">
              <h4 className="title mb20">Continue with Email</h4>
              <form onSubmit={handleSubmit} method="post">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  handleChange={handleInputChange}
                  value={formData.email}
                  error={errors.email}
                  className="mb25"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  handleChange={handleInputChange}
                  value={formData.password}
                  error={errors.password}
                  className="mb45"
                />
                <Button
                  type="submit"
                  text="Authenticate"
                  className="mb20"
                  style={{ fontWeight: "700" }}
                />
              </form>
            </div>
          ) : (
            <div className="action__buttons">
              <Button
                text="Login With Google"
                onClick={() => {}}
                icon={<img src={GoogleG} alt="metamask" />}
                className="mb20"
                style={{ color: "#fff" }}
              />
              <Button
                text="Connect to wallet"
                onClick={() => {
                  handleAuthFormModalClose();
                  handleWalletsModalOpen();
                }}
                icon={<img src={MetamaskFox} alt="metamask" />}
                className="mb20"
              />
              <img src={Divider} alt="divider" className="divider" />
              <Button
                text="Continue With Email"
                onClick={() => setEmailSignup(true)}
                className="mb20"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
