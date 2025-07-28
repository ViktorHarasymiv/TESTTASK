// SETUP

import React from "react";

// COMPONENT

import HeadingSection from "../Heading/HeadingSection";
import UsersList from "./UsersList";
import Button from "../Button/Button";

// CONTEXT

import { useUser } from "../../UserContext";

// PRELOADER UI

import Preloader from "../Preloader/Preloader";

// BODY

export default function Users() {
  const { usersData, page, setPage, total_pages, isLoading, isError } =
    useUser();

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <section id="user" className="user_section">
      <div className="user__wrapper container">
        {/* H2 TITLE */}
        <HeadingSection>
          Working with <span className="uppercase_text">get</span> request
        </HeadingSection>
        {/* USERS LIST */}
        <UsersList data={usersData} />
        <Preloader isLoading={isLoading} />
        {total_pages > page && (
          <Button type={"button"} handleClick={nextPage} size={120}>
            Show more
          </Button>
        )}
      </div>
    </section>
  );
}
