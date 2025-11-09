import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <FiMoon className="w-6 h-6 text-indigo-600" />
      )}
    </button>
  );
}
