// SETUP

import React from "react";

// COMPONENT

import ContactCard from "./ContactCard";

// BODY

export default function ContactList({ data }) {
  return (
    <ul className="user__list">
      {/* USER BLOCK */}
      {[...data]
        .sort((a, b) => b.registration_timestamp - a.registration_timestamp)
        .map((item, i) => {
          return <ContactCard user={item} key={i} />;
        })}
    </ul>
  );
}
