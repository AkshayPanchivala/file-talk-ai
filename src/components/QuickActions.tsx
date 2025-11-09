import { motion } from "framer-motion";
import type { JSX } from "react";
import { FaBars } from "react-icons/fa";
import { FiUpload, FiHelpCircle, FiFileText, FiList } from "react-icons/fi";

interface OptionItem {
  action: string;
  label: string;
  description: string;
}

interface QuickActionsProps {
  fetchedActions?: OptionItem[];
  onSelect: (action: string) => void;
}

export function QuickActions({ onSelect, fetchedActions }: QuickActionsProps) {
  // Icon mapping for different action types
  const iconMap: Record<string, JSX.Element> = {
    upload_file: <FiUpload />,
    question_answer: <FiHelpCircle />,
    summarizer: <FiFileText />,
    generate_questions: <FiList />,
    main_menu: <FaBars />,
  };

  // Gradient color mapping for different actions
  const gradientMap: Record<string, string> = {
    upload_file: "from-indigo-500 to-purple-500",
    question_answer: "from-purple-500 to-pink-500",
    summarizer: "from-pink-500 to-indigo-500",
    generate_questions: "from-indigo-600 to-purple-600",
    main_menu: "from-purple-600 to-pink-600",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {fetchedActions && fetchedActions.length > 0
        ? fetchedActions.map((action: OptionItem, index: number) => (
              <motion.button
                key={action.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(action.action)}
                className="group relative flex flex-col gap-2 p-5 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center gap-3">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${gradientMap[action.action] || 'from-indigo-500 to-purple-500'} text-white text-xl shadow-lg`}>
                    {iconMap[action.action] || <FiHelpCircle />}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {action.label}
                  </span>
                </div>
                {action.description && (
                  <p className="relative text-sm text-gray-600 dark:text-gray-400 ml-13">
                    {action.description}
                  </p>
                )}
              </motion.button>
            ))
        : null}
    </div>
  );
}
