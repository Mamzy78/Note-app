import React from "react";

function Btn(props) {
  return (
    <button
      className={`rounded-full text-fuchsia-600 mt-9 w-full h-14 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Btn;
