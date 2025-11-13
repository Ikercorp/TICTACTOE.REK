import React from "react";

export default function Square({ value, onClick }) {
  let imgSrc = null;

  if (value === "X") {
    imgSrc = "/images/X-1.png";
  } else if (value === "O") {
    imgSrc = "/images/O-1.png";
  }

  return (
    <button className="square" onClick={onClick}>
      {imgSrc ? <img src={imgSrc} alt={value} className="icon" /> : null}
    </button>
  );
}
