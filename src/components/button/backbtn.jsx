import React from 'react'

function Backbtn(props) {
  return (
    <button className={`flex items-center ${props.className}`} onClick={props.onClick}>
        <img className="mr-2" src="cheveron-left.svg" alt="<" />
        {props.children}
    </button>
  )
}

export default Backbtn