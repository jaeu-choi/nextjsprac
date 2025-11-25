import Image from "next/image";

export function PublicHero() {
  return (
    <section className="relative w-full h-[500px] flex items-end md:items-center justify-center">
      <Image
        src="/Section.jpg"
        fill
        alt="LearnHub hero background"
        className="object-cover"
      />
      <div className="text-white font-bold text-3xl opacity-75 z-10 text-center my-40 md:my-0">
        <h2>Learn Everything</h2>
        <h2>Learn EveryWhere</h2>
      </div>
    </section>
  );
}
