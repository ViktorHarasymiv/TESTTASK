import React from "react";
import HeadingSection from "../Heading/HeadingSection";

export default function Success() {
  return (
    <section>
      <HeadingSection>User successfully registered</HeadingSection>
      <div className="success__image-wrapper container">
        <img
          src="/images/form/success-image.svg"
          alt="Success image"
          width={328}
          height={290}
        />
      </div>
    </section>
  );
}
