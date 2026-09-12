import Image from "next/image";

import { cn } from "@/lib/utils";

export function CivicBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 select-none overflow-hidden",
        className,
      )}
    >
      <Image
        src="https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Civic Society Infrastructure"
        fill
        className="scale-105 object-cover object-center opacity-25 blur-[0.5px]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-50/95 backdrop-blur-[1.5px]" />
      <div className="absolute -left-[10%] -top-[10%] h-80 w-80 rounded-full bg-teal-500/15 blur-[100px]" />
      <div className="absolute -bottom-[10%] -right-[10%] h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]" />
    </div>
  );
}