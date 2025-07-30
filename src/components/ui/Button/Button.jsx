// SETUP

import React from "react";

// PROPS SETUP
import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

// BODY

export default function Button({
  children,
  type,
  handleClick,
  size,
  disabled,
}) {
  return (
    <button
      onClick={handleClick}
      type={type}
      className="button"
      style={{ width: `${size}px` }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
