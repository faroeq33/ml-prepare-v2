interface Params {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function ThemeButton(props: Params) {
  return (
    <button
      type={props.type || "button"}
      className="px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default ThemeButton;
