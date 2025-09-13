import "./App.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <section className="bg-[#0F172A] min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#E2E8F0] leading-tight">
            Fund Your Creative Work
          </h1>
          <h3 className="mt-4 text-xl md:text-2xl text-gray-400">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </h3>
          <div className="mt-8">
            <Button text="Donate Now" />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
