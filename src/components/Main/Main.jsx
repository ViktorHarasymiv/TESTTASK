// SETUP

import React from "react";

// COMPONENTS

import Hero from "../layout/Hero/Hero";
import Contacts from "../layout/Contacts/Contacts";
import CreateProfile from "../layout/CreateProfile/CreateProfile";
import Success from "../layout/Success/Success";

// CONTEXT

import { useUser } from "../../UserContext";

// BODY

export default function Main() {
  // CONTEXT DATA

  const { isSend } = useUser();

  return (
    <main>
      <Hero />
      <Contacts />
      {isSend ? <Success /> : <CreateProfile />}
    </main>
  );
}
