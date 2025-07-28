import React from "react";
import UserItem from "./UserItem";

export default function UsersList({ data }) {
  return (
    <ul className="user__list">
      {/* USER BLOCK */}
      {data?.users.map((item, i) => {
        return <UserItem user={item} key={i} />;
      })}
    </ul>
  );
}
