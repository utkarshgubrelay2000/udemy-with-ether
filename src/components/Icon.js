  
import React from "react"

const Icon = (props) => (
  <svg
    className={`svg-icon ${props.className ? props.className : ""}`}
    style={props.style}
  >
    <use xlinkHref={`#${props.icon}`} />
  </svg>
)

export default Icon;