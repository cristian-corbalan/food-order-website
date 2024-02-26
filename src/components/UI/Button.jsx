export default function Button ({ children, isTextOnly, className = '', ...props }) {
  let cssClasses = isTextOnly ? 'text-button' : 'button';
  cssClasses += className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
