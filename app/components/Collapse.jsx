import React, { useState } from "react";
import Collapsible from "@kunukn/react-collapse";
import { GoChevronRight as ChevronRight } from "react-icons/go";

const Collapse = ({ trigger, children, className, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <button
        aria-label="Open menu item"
        onClick={() => setOpen(!open)}
        className={`flex w-full justify-between ${className ? className : ""} `}
      >
        <div className="uppercase">{trigger}</div>

        <ChevronRight
          className={`font-bold text-[20px] text-white lg:hidden ${
            open && "transform rotate-90"
          }`}
        />
      </button>
      <Collapsible className="duration-500 ease-out " isOpen={open}>
        {children}
      </Collapsible>
    </div>
  );
};

export default Collapse;