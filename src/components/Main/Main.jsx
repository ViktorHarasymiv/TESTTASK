import React from "react";

import Hero from "../Hero/Hero";
import Users from "../Users/Users";
import ProfileSubmit from "../ProfileSubmit/ProfileSubmit";
import Success from "../Success/Success";

import { useUser } from "../../UserContext";

export default function Main() {
  // CONTEXT
  const { isSend } = useUser();
  return (
    <main>
      <Hero></Hero>
      <Users></Users>
      {isSend ? <Success /> : <ProfileSubmit />}
    </main>
  );
}
