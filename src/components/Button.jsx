export default function Button({ children, textOnly, className, ...props }) {
  let classes = textOnly ? "text-button" : "button";
  classes += ` ${className}`;
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
