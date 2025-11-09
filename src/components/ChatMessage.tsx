import { motion } from "framer-motion";
import { TypingIndicator } from "./TypingIndicator";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  animate?: boolean;
  isTyping?: boolean;
}

export function ChatMessage({
  message,
  isBot,
  animate = false,
  isTyping = false,
}: ChatMessageProps) {
  const [cleanHtml, setCleanHtml] = useState<string>("");

  useEffect(() => {
    const renderMarkdown = async () => {
      const rawHtml = await marked.parse(message);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setCleanHtml(sanitizedHtml);
    };

    renderMarkdown();
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`relative group max-w-[80%] px-5 py-3 rounded-2xl shadow-lg ${
          isBot
            ? "bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-100"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-indigo-500/30"
        }`}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <div
            className="text prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          ></div>
        )}
      </div>
    </motion.div>
  );
}
