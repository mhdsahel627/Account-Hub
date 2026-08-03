const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;