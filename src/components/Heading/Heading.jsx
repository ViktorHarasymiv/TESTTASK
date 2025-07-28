import React from "react";

import PropTypes from "prop-types";

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Heading({ children }) {
  return <h1 className="heading__title">{children}</h1>;
}
