import React from "react";

import Hero from "../Hero/Hero";
import Users from "../Users/Users";
import Form from "../ProfileSubmit/UserForm";
import ProfileSubmit from "../ProfileSubmit/ProfileSubmit";

export default function Main() {
  return (
    <main>
      <Hero></Hero>
      <Users></Users>
      <ProfileSubmit></ProfileSubmit>
    </main>
  );
}
