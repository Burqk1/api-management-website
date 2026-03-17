"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";

interface Logo {
  name: string;
  id: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  columns.forEach((col) => {
    while (col.length < 2) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

function LogoColumn({ logos, index }: { logos: Logo[]; index: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length);
        setIsAnimating(false);
      }, 400);
    }, 2000 + index * 200);

    return () => clearInterval(interval);
  }, [logos.length, index]);

  const currentLogo = logos[currentIndex];

  return (
    <div
      className="relative h-12 w-28 md:h-14 md:w-36 overflow-hidden"
      style={{
        opacity: 0,
        animation: `logoFadeIn 0.5s ease-out ${index * 0.1}s forwards`,
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-400"
        style={{
          transform: isAnimating ? "translateY(-20px)" : "translateY(0)",
          opacity: isAnimating ? 0 : 1,
          filter: isAnimating ? "blur(8px)" : "blur(0px)",
          transitionDuration: "400ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <span className="text-sm md:text-base font-medium text-[#5C5C5C] hover:text-[#8B8B8B] transition-colors tracking-tight">
          {currentLogo.name}
        </span>
      </div>
    </div>
  );
}

interface LogoCarouselProps {
  columnCount?: number;
  logos: Logo[];
}

export function LogoCarousel({ columnCount = 5, logos }: LogoCarouselProps) {
  const [logoColumns, setLogoColumns] = useState<Logo[][]>([]);

  useEffect(() => {
    const columns = distributeLogos(logos, columnCount);
    setLogoColumns(columns);
  }, [logos, columnCount]);

  return (
    <>
      <style>{`
        @keyframes logoFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {logoColumns.map((columnLogos, index) => (
          <LogoColumn key={index} logos={columnLogos} index={index} />
        ))}
      </div>
    </>
  );
}

export type { Logo };
