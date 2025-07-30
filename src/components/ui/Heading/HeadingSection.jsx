import React from "react";

import PropTypes from "prop-types";

HeadingSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function HeadingSection({ children }) {
  return <h2 className="heading__section">{children}</h2>;
}
