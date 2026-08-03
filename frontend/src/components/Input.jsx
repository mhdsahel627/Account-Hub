const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};

export default Input;