function Card({ title, url }) {
  return (
    <div className="hidden md:flex flex-col w-48 h-72 bg-[#1E293B] rounded-2xl shadow-md p-4 hover:shadow-cyan-500/30 transition transform hover:scale-105 cursor-pointer">
        <h1 className="text-[#E2E8F0] font-bold text-lg mb-2 text-center">{title}</h1>
      <img
        src={url}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <button className="mt-auto bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-semibold py-2 rounded-xl shadow-sm transition">
        Donate
      </button>
    </div>
  );
}

export default Card;
