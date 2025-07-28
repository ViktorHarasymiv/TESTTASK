// SETUP

import React from "react";

// COMPONENT

import Heading from "../Heading/Heading";
import ResponseBackground from "./ResponseBackground";
import Button from "../Button/Button";

// FUNCTION

import { handleScroll } from "../../scripts/scrollByPath";

// BODY

export default function Hero() {
  // BUTTON VARIABLES

  const variables = [{ label: "Sign up", pathId: "profile" }];

  return (
    <section id="hero__section" className="hero">
      <ResponseBackground />
      <div className="hero__wrapper">
        <Heading>Test assignment for front-end developer</Heading>
        <div className="hero__content-about">
          What defines a good front-end developer is one that has skilled
          knowledge of <span className="uppercase_text">HTML, CSS, JS</span>{" "}
          with a vast understanding of User design thinking as they'll be
          building web interfaces with accessibility in mind. They should also
          be excited to learn, as the world of Front-End Development keeps
          evolving.
        </div>
        {variables.map((button, i) => {
          return (
            <Button
              key={i}
              type={"button"}
              handleClick={() => handleScroll(button.pathId)}
              size={100}
            >
              {button.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
