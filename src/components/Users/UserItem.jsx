import React, { useState } from "react";
import FullTextContent from "../FullTextContent/FullTextContent";

export default function UserItem({ user }) {
  const { email, id, name, phone, photo, position } = user;

  const [isHover, setIshover] = useState(false);
  const [isHoverEmail, setIshoverEmail] = useState(false);

  return (
    <li className="user__tile">
      <figure className="user__avatar">
        <img
          src={photo ? photo : "/assets/icons/photo-cover.png"}
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
        {isHover && <FullTextContent name={name} />}
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
          {isHoverEmail && <FullTextContent name={email} />}
        </div>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
    </li>
  );
}
