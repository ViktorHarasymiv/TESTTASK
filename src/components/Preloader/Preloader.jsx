// IMPORT

import React, { useState } from "react";
// MEDIA

import { ClipLoader } from "react-spinners";

export default function Preloader({ isLoading }) {
  let [color, setColor] = useState("#00BDD3");

  const override = {
    display: "block",
    margin: "0 auto",
    borderWidth: "5px",
  };

  return (
    <ClipLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={48}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
