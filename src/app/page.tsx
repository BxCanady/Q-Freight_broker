import FreightReputation from "@/components/FreightReputation";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#F7FAF9] font-sans">
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-3xl font-semibold text-[#12343B]">
          Welcome to Togeto
        </h1>
      </div>
      <FreightReputation />
    </main>
  );
}
