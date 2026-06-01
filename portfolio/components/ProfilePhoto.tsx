"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";

type ProfilePhotoProps = {
  variant?: "circle" | "square";
  className?: string;
};

export default function ProfilePhoto({ variant = "circle", className = "" }: ProfilePhotoProps) {
  const [hasError, setHasError] = useState(false);

  const isCircle = variant === "circle";
  const sizeClass = isCircle ? "h-56 w-56 sm:h-64 sm:w-64 rounded-full" : "h-48 w-48 rounded-2xl";
  const wrapperClass = isCircle ? "photo-ring rounded-full" : "photo-ring rounded-2xl";

  if (hasError) {
    return (
      <div className={`${wrapperClass} ${className}`}>
        <div
          className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900/60 to-teal-900/60 p-6 text-center ${sizeClass}`}
        >
          <span className="font-display text-5xl font-bold text-white/90">CD</span>
          {isCircle && (
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              Add your photo at
              <br />
              <code className="text-teal-400">public/images/profile.jpg</code>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className={`relative overflow-hidden bg-slate-900 ${sizeClass}`}>
        <Image
          src={SITE.photo}
          alt={SITE.name}
          fill
          className="object-cover"
          sizes={isCircle ? "256px" : "192px"}
          onError={() => setHasError(true)}
          priority={isCircle}
        />
      </div>
    </div>
  );
}
