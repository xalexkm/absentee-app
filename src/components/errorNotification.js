import { memo } from "react";

const ErrorNotification = ({ message }) => (
  <div className="p-4 my-4 rounded-md bg-red-400 text-white">
    {message ? message : "Unknown error"}
  </div>
);

export default memo(ErrorNotification);
