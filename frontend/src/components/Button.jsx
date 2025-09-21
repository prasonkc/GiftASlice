function Button({ text }) {
  return (
    <button
      className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] p-3 font-semibold rounded-full shadow-lg hover:shadow-cyan-500/30 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      {text}
    </button>
  );
}

export default Button;
