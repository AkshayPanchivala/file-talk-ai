import TextareaAutosize from "react-textarea-autosize";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  onSend: (message: string) => void;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  setInputMessage,
  inputMessage,
  disabled,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSend(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4">
      <TextareaAutosize
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a question..."
        maxRows={4}
        className={`flex-1 resize-none rounded-2xl px-5 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200/60 dark:disabled:bg-gray-700/60 transition-all duration-200`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        disabled={!disabled}
      />

      <button
        type="submit"
        disabled={!disabled}
        className={`p-3 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg ${
          !disabled
            ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105 active:scale-95"
        }`}
      >
        <FiSend className="w-5 h-5" />
      </button>
    </form>
  );
}
