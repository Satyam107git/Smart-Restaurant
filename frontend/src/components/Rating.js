import React from "react";

function Rating({ value, text, color }) {
  // console.log(text);

  let rows = [];
  for (let i = 1; i <= 5; i++) {
    rows.push(
      <span key={i}>
        <i
          style={{ color }}
          className={
            value >= i
              ? "fas fa-star"
              : value >= i/2
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    );
  }

  return (
    <div className="rating">
      {rows}
      <span>{text}</span>
    </div>
  );
}

export default Rating;
