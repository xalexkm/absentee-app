import {memo} from "react";

const Button = (props) => <button className="p-4 bg-slate-800 rounded-md text-white" {...props}>{props.children}</button>

export default memo(Button)