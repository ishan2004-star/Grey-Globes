const Button = ({ title }) => {
  return (
    <button
      className="
        px-6
        py-3
        rounded-2xl
        bg-cyan-500
        hover:bg-cyan-400
        transition-all
        duration-300
        text-white
        font-semibold
        shadow-lg
      "
    >
      {title}
    </button>
  );
};

export default Button;