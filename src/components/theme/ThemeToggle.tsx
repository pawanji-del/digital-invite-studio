"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-stone-100 border border-stone-200 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Day Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Day Mode (Light)" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 shadow-sm ${
        isDark
          ? "bg-stone-900 border-amber-500/30 text-amber-400 hover:bg-stone-800 hover:border-amber-400/50"
          : "bg-white border-amber-300/80 text-amber-600 hover:bg-amber-50 hover:border-amber-400"
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-4 h-4 text-amber-600 fill-amber-500/20" />
        )}
      </motion.div>
    </motion.button>
  );
}
