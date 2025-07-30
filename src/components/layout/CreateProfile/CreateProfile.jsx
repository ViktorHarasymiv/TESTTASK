// SETUP

import React from "react";

// IMPORT

import HeadingSection from "../../ui/Heading/HeadingSection";
import CreateForm from "./CreateForm";

// BODY

export default function CreateProfile() {
  return (
    <section id="profile" className="profile__section">
      <div className="container">
        <HeadingSection>
          Working with <span className="uppercase_text">POST</span> request
        </HeadingSection>
        <CreateForm />
      </div>
    </section>
  );
}
