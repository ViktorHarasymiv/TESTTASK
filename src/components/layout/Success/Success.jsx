// SETUP

import React from "react";

// COMPONENT

import HeadingSection from "../../ui/Heading/HeadingSection";

// BODY

export default function Success() {
  return (
    <section>
      {/* H1 TITLE */}
      <HeadingSection>User successfully registered</HeadingSection>
      {/* IMAGE CONTENT */}
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
