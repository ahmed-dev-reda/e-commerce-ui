import Image from "next/legacy/image";

export default function Hero() {
  return (
    <section className="container mx-auto">
      <div className="w-full flex justify-center">
        <Image
          src="/featured.png"
          alt="Hero"
          width={1200}
          height={400}
          className="w-full h-auto object-contain "
        />
      </div>
    </section>
  );
}
