import React from "react";

export default function Numbers({ value, className , onClick }) {
  return (
    <div onClick={onClick} className={`calc_element ${className}`}>
      <span>{value}</span>
    </div>
  );
}
