const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;