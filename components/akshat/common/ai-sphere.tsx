"use client";

import { motion } from "framer-motion";

export function AISphere({ progress = 0 }: { progress?: number }) {
  const isCompleted = progress >= 100;
  const accent = isCompleted ? "#0D9488" : "#F97316";
  const ringHex = isCompleted ? "#14B8A6" : "#F97316";

  return (
    <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32 cursor-pointer">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 40px ${accent}66, 0 0 80px ${accent}22`,
        }}
      />

      <div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: `conic-gradient(${ringHex} ${progress * 3.6}deg, rgba(226,232,240,0.5) 0deg)`,
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
          transform: "rotate(-90deg)",
        }}
      />


      <div className="absolute inset-[24%] rounded-full bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800 shadow-[inset_-6px_-10px_20px_rgba(6,78,59,0.55),inset_6px_10px_20px_rgba(153,246,228,0.35)]" />

      <div className="absolute inset-0 opacity-80">
        <div
          className="absolute inset-0 h-full w-full animate-[orbitA_9s_linear_infinite] rounded-full"
          style={{ border: "2px solid rgba(13,148,136,0.5)", borderTopColor: "transparent" }}
        />
        <div
          className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] animate-[orbitB_12s_linear_infinite] rounded-full"
          style={{ border: "1.5px solid rgba(249,115,22,0.5)", borderBottomColor: "transparent" }}
        />
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[orbitA_16s_linear_infinite]">
        <g fill="none" stroke="#99f6e4" strokeWidth="0.6" opacity="0.8">
          <ellipse cx="50" cy="50" rx="46" ry="18" />
          <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(72 50 50)" />
          <ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(144 50 50)" />
          <ellipse cx="50" cy="50" rx="18" ry="46" />
          <ellipse cx="50" cy="50" rx="18" ry="46" transform="rotate(72 50 50)" />
          <ellipse cx="50" cy="50" rx="18" ry="46" transform="rotate(144 50 50)" />
        </g>
      </svg>

      <motion.span
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: ringHex, boxShadow: `0 0 10px ${ringHex}` }}
        animate={{ top: ["0%", "92%", "0%"], opacity: [1, 0.4, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-teal-400"
        style={{ boxShadow: "0 0 10px #0D9488" }}
        animate={{ left: ["0%", "92%", "0%"], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
}