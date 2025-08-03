// SETUP

import React, { useState } from "react";

// COMPONENT

import HoverTextPreview from "../../ui/HoverTextPreview/HoverTextPreview";

// BODY

export default function ContactCard({ user }) {
  const { email, id, name, phone, photo, position } = user;

  const [isHover, setIshover] = useState(false);
  const [isHoverEmail, setIshoverEmail] = useState(false);

  return (
    <li>
      <article className="user__tile">
        <figure className="user__avatar">
          <img
            src={photo ? photo : "/images/icons/photo-cover.png"}
            alt={`Фото:${name}`}
            width={70}
            height={70}
            loading="lazy"
          />
        </figure>
        <div className="user__name-wrapper">
          <h2
            onMouseEnter={() => setIshover(true)}
            onMouseLeave={() => setIshover(false)}
            className="user__name"
          >
            {name}
          </h2>
          {isHover && <HoverTextPreview name={name} />}
        </div>
        <div className="user__contact-wrapper">
          <h3 className="user__position">{position}</h3>
          <div className="user__email-wrapper">
            <a
              href={`mailto:${email}`}
              className="user__email"
              onMouseEnter={() => setIshoverEmail(true)}
              onMouseLeave={() => setIshoverEmail(false)}
            >
              {email}
            </a>
            {isHoverEmail && <HoverTextPreview name={email} />}
          </div>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </article>
    </li>
  );
}
