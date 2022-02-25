import React from "react";

import "./styles.css";

const Button = ({
  icon,
  text,
  onClick,
  link,
  type = "text",
  style = {},
  className,
}) => {
  const RenderIconText = () =>
    icon ? (
      <>
        {icon} {text}
      </>
    ) : (
      text
    );

  return (
    <div className={`custom__button ${className || ""}`}>
      {link ? (
        <a
          href={link}
          className="btn-common custom_btn-link linear_gradient_primary"
          style={style}
        >
          <RenderIconText />
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className="btn-common custom_btn linear_gradient_primary"
          style={style}
        >
          <RenderIconText />
        </button>
      )}
    </div>
  );
};

export default Button;
