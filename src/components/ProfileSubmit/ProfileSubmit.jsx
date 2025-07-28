// SETUP

import React from "react";

// IMPORT

import HeadingSection from "../Heading/HeadingSection";
import UserForm from "./UserForm";

// BODY

export default function ProfileSubmit() {
  return (
    <section id="profile" className="profile__section">
      <HeadingSection>
        Working with <span className="uppercase_text">POST</span> request
      </HeadingSection>
      <UserForm></UserForm>
    </section>
  );
}
