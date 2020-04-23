import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   
   let buttonClass = classNames(
      "button", 
      {"button--danger": props.danger}, 
      {"button--confirm": props.confirm}
   );

   return(
      <button 
      disabled={props.disabled} 
      onClick={props.onClick} 
      className={buttonClass}>
         {props.children}
      </button>
   );
};
