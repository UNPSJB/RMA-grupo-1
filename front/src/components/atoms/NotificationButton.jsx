import React from "react";
import { FaRegBell } from "react-icons/fa";

const NotificationButton = () => {
  return (
    <button
      onClick={() => console.log("Hacer algo ... algo...")}
      type="button"
      className="relative rounded-full p-2 transition-all duration-200 ease-in-out
              text-gray-600 hover:bg-gray-50 
             dark:text-gray-400 dark:hover:bg-gray-700"
    >
      <div className="absolute -top-0 -right-0 h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
      <FaRegBell
        aria-hidden="true"
        className="h-6 w-6 transition-transform transform active:scale-50"
      />
    </button>
  );
};

export default NotificationButton;
