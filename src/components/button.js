import { memo } from "react";

const Button = (props) => (
  <button
    className="w-full px-4 py-3 bg-slate-800 rounded-md text-white"
    {...props}
  >
    {props.children}
  </button>
);

export default memo(Button);
