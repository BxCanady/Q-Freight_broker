import FreightServices from "@/components/FreightServices";

export default function HomeSection() {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[32rem] flex-1 items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/home_bg.jfif')" }}
      >
        <div className="absolute inset-0 bg-[#12343B]/65" aria-hidden="true" />
        <h1
          className="relative text-center font-[family-name:var(--font-display)] text-5xl font-black leading-[0.92] xl:text-6xl text-red-600"
          style={{
            WebkitTextStroke: "1px white",
          }}
        >
          Welcome to rcs3pl.com
        </h1>
      </section>
      <div className="relative z-10 -mt-4 mx-4 overflow-hidden shadow-[0_20px_42px_rgba(18,52,59,0.16)] [transform:perspective(1200px)_rotateX(1deg)] [transform-origin:top_center] sm:-mt-8 sm:mx-8 lg:-mt-12 lg:mx-16 xl:mx-24">
        <FreightServices />
      </div>
    </>
  );
}
