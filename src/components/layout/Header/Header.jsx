// SETUP

import React from "react";

import { Link } from "react-router-dom";

// COMPONENT

import Button from "../../ui/Button/Button";

// FUNCTION

import { handleScroll } from "../../../scripts/utils";

// MEDIA

import Logo from "../../../../public/images/icons/logo.png";

// BODY

export default function Header() {
  // BUTTON VARIABLES

  const variables = [
    { label: "Users", pathId: "user" },
    { label: "Sign up", pathId: "profile" },
  ];

  return (
    <header className="header">
      <div className="header__wrapper container">
        <Link to="/" className="header__logo-link">
          <img src={Logo} alt="Header logo icon" width={104} height={26} />
        </Link>
        <div className="header__buttons--wrapper">
          {variables.map((button, i) => (
            <Button
              key={i}
              type={"button"}
              handleClick={() => handleScroll(button.pathId)}
              size={100}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
