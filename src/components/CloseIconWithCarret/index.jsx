import React from "react";
import {
  AiFillCaretDown,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCaretUp,
  AiOutlineClose,
} from "react-icons/ai";

import "./styles.css";

const CloseIconWithCarret = ({ carretDirection = "left", noCarret }) => {
  return (
    <div className="closeIconWithCarret">
      {!noCarret && (
        <span className={`carret__icon flex-full-center ${carretDirection}`}>
          {carretDirection === "up" && <AiFillCaretUp />}
          {carretDirection === "right" && <AiFillCaretRight />}
          {carretDirection === "down" && <AiFillCaretDown />}
          {carretDirection === "left" && <AiFillCaretLeft />}
        </span>
      )}
      <div className={`closeIconWithCarret__close ${carretDirection}`}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default CloseIconWithCarret;
