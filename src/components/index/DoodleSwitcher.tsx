import { useState, type ReactNode } from "react";
import doodle4 from "@/assets/images/socratica-doodle-4.png?url";
import doodle5 from "@/assets/images/socratica-doodle-5.png?url";
import doodle6 from "@/assets/images/socratica-doodle-6.png?url";
import doodle2 from "@/assets/images/socratica-doodle-alt.png?url";
import doodle1 from "@/assets/images/socratica-doodle.png?url";

interface Doodle {
  src: string;
  title: string;
  className?: string;
}

const doodles: Doodle[] = [
  { src: doodle1, title: '"Little Guys", by Aileen Luo' },
  { src: doodle2, title: '"Project Block", by Someone' },
  { src: doodle4, title: '"Socratica", by Someone' },
  { src: doodle5, title: '"MS Paint", by HudZah' },
  {
    src: doodle6,
    title: `"Aileen's Worst Nightmare", by Jake Rudolph`,
    className: "md:h-[450px] md:-mt-14",
  },
];

export default function DoodleSwitcher({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * doodles.length),
  );

  const current = doodles[index];

  return (
    <>
      <div className="flex flex-col items-center relative lg:h-[250px] mt-16 -mb-8 md:mb-0">
        <button
          onClick={() => setIndex((i) => (i + 1) % doodles.length)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label="Switch artwork"
        />
        <img
          src={current.src}
          alt="Socratica Logo"
          className={`h-[200px] w-auto object-contain ${current.className ?? ""}`}
        />
      </div>

      <div className="flex space-x-4 mb-8 md:mb-12">
        {children}

        <div className="flex-1 flex flex-col items-end justify-end">
          <p className="font-mono text-[8px] md:text-sm text-[#706F6B]">
            CURRENT ART
          </p>
          <p className="text-right text-[10px] md:text-sm">{current.title}</p>
        </div>
      </div>
    </>
  );
}
