"use client";

import React from "react";
import { cn } from "../../lib/utils";

const sizeClasses: Record<string, string> = {
  xxs: "text-base md:text-lg",
  xs: "text-lg md:text-xl lg:text-2xl",
  sm: "text-xl md:text-2xl lg:text-3xl",
  md: "text-2xl md:text-3xl lg:text-4xl",
  lg: "text-3xl md:text-4xl lg:text-5xl",
  xl: "text-4xl md:text-5xl lg:text-6xl",
};

const variantClasses: Record<string, string> = {
  default: "from-[#F5F5F5] to-[#5C5C5C]",
  secondary: "from-[#8B8B8B] to-[#5C5C5C]",
  light: "from-[#F5F5F5] to-[#8B8B8B]",
  accent: "from-[#FF9500] to-[#E07800]",
};

const weightClasses: Record<string, string> = {
  thin: "font-thin",
  base: "font-normal",
  semi: "font-semibold",
  bold: "font-bold",
  black: "font-black",
};

interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  weight?: keyof typeof weightClasses;
}

export function GradientHeading({
  className,
  variant = "default",
  size = "md",
  weight = "bold",
  children,
  ...props
}: GradientHeadingProps) {
  return (
    <h2
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-b",
        variantClasses[variant],
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
