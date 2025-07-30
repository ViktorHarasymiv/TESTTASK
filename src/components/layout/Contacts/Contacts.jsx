// SETUP

import React from "react";

// COMPONENTS

import HeadingSection from "../../ui/Heading/HeadingSection";
import ContactList from "./ContactList";
import Button from "../../ui/Button/Button";

// FUNCTION

import { scrollByElemHeight } from "../../../scripts/utils";

// CONTEXT

import { useUser } from "../../../UserContext";

// LOADER

import Loader from "../../ui/Loader/Loader";
import Error from "../../ui/Error/Error";

// BODY

export default function Contacts() {
  const { contactData, page, setPage, total_pages, isLoading, isError } =
    useUser();

  const nextPage = () => {
    setPage(page + 1);
  };

  const checkDisabled = total_pages <= page;

  return (
    <section id="user" className="user_section">
      <div className="user__wrapper container">
        {/* H2 TITLE */}
        <HeadingSection>
          Working with <span className="uppercase_text">get</span> request
        </HeadingSection>
        {isError ? (
          /* Error */
          <Error />
        ) : (
          <React.Fragment>
            {/* USERS LIST */}
            <ContactList data={contactData} />
            {!checkDisabled && (
              <Button
                type={"button"}
                handleClick={() => {
                  nextPage();
                  scrollByElemHeight();
                }}
                size={120}
                disabled={checkDisabled}
              >
                Show more
              </Button>
            )}
          </React.Fragment>
        )}
        <Loader isLoading={isLoading} />
      </div>
    </section>
  );
}
