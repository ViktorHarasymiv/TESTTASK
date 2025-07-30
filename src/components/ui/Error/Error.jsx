import React from "react";
import Button from "../Button/Button";

export default function Error() {
  return (
    <div className="error">
      <h3>"Please,reload page,something errors!"</h3>
      <Button handleClick={() => location.reload()} type={"button"} size={120}>
        Refresh
      </Button>
    </div>
  );
}
