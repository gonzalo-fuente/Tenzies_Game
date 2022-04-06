import React from "react";

function Die({ die, holdDice }) {
  const { id, value, isHeld } = die;
  return (
    <div
      className={`die ${isHeld ? "die-held" : ""}`}
      onClick={() => holdDice(id)}
    >
      <h2>{value}</h2>
    </div>
  );
}

export default Die;
