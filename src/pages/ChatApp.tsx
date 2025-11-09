import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { ThemeToggle } from "../components/ThemeToggle";
import { QuickActions } from "../components/QuickActions";
import { navigate } from "../components/Router";
import { FaRobot } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import useAxios from "../API/Apihandler";
import Loader from "../components/Loader";
import {
  generateQuestionsMessage,
  initialMessage,
  processingMessage,
  questionAnswerMessage,
  summaryMessage,
  fileUploadUrl
} from "../constant";
import { toast, ToastContainer } from "react-toastify";

// Type Definitions
interface OptionItem {
  action: string;
  label: string;
  description: string;
}

interface OptionsResponse {
  options: OptionItem[];
}

interface ApiSuccessResponse {
  content: {
    success: boolean;
    message: string;
    data: string;
  };
  userType: "Chatbot";
}

interface ActionParams {
  action: string;
  question?: string;
  min_page?: number;
  max_page?: number;
}

interface Message {
  text: string;
  isBot: boolean;
  id: number;
  isTyping?: boolean;
  isInfo: boolean;
}

interface CloudinaryUploadResponse {
  secure_url: string;
}

function ChatApp() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: initialMessage,
      isBot: true,
      id: 1,
      isInfo: true,
    },
  ]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [fetchedActions, setFetchedActions] = useState<OptionItem[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { request, loading, error } = useAxios();
  const [showInputMessage, setShowInputMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFileUploadeLoading, setIsFileUploadeLoading] = useState(true);

  const fetchOptions = async () => {
    const data = await request("POST", "options/", {
      startedChatbot:localStorage.getItem("startedChatbot") ?localStorage.getItem("startedChatbot"):false
    }) as OptionsResponse | null;
    if (data && data.options) {
      setIsFileUploadeLoading(false);
      setFetchedActions(data.options);
      setShowQuickActions(true);
    }
  };

  useEffect(() => {
    localStorage.removeItem("startedChatbot");
    localStorage.removeItem("documenturl");

    fetchOptions();
  }, [request]);

  useEffect(() => {
    if (messagesEndRef.current && showQuickActions) {
      scrollToBottom();
    }
  }, [messages, showQuickActions]);

  useEffect(() => {
    if (error) {
      setMessages((prev) =>
        prev.filter((msg) => msg.text !== processingMessage)
      );
      setShowQuickActions(false);
      setShowInputMessage(false);
      localStorage.removeItem("startedChatbot");
      localStorage.removeItem("documenturl");
      fetchOptions();

    }
  }, [error]);

  const selectedOptionHandler = async (paramsData: ActionParams): Promise<void> => {
    const requestPayload: Record<string, string | number> = {
      action: paramsData.action,
      documenturl: localStorage.getItem("documenturl") || "",
    };

    // Add question for question_answer action
    if (paramsData.action === "question_answer" && paramsData.question) {
      requestPayload.question = paramsData.question;
    }

    // Add optional min_page and max_page for summarizer and generate_questions
    if (paramsData.action === "summarizer" || paramsData.action === "generate_questions") {
      if (paramsData.min_page) requestPayload.min_page = paramsData.min_page;
      if (paramsData.max_page) requestPayload.max_page = paramsData.max_page;
    }

    const data = await request("POST", "conversation/", requestPayload) as ApiSuccessResponse | null;

    if (data && data.content) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.text === processingMessage
            ? {
                ...msg,
                isTyping: false,
                text: data.content.data,
                isBot: true,
                isInfo: true,
              }
            : msg
        )
      );
      fetchOptions();
    }
  };

  const handleSendMessage = (message: string) => {
    setShowQuickActions(false);
    setShowInputMessage(false);
    const botMessageId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { text: message, isBot: false, id: Date.now(), isInfo: false },
      {
        text: processingMessage,
        isBot: true,
        id: botMessageId,
        isTyping: true,
        isInfo: true,
      },
    ]);
    selectedOptionHandler({ question: message, action: "question_answer" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpload = async (tempFile: File): Promise<void> => {
    setIsFileUploadeLoading(true);
    const fileSize = tempFile.size / (1024 * 1024); // Convert to MB
    if (fileSize > 10) {
      toast.error(
        "File size exceeds 10MB. Please upload a smaller file.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        }
      );
      setIsFileUploadeLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", tempFile);
    formData.append("upload_preset", "NewDocGPT");

    try {
      const res = await axios.post<CloudinaryUploadResponse>(
        fileUploadUrl,
        formData
      );
      const fileUrl = res.data.secure_url;
      localStorage.setItem("documenturl", fileUrl);
      localStorage.setItem("startedChatbot", "true");
      setMessages((prev) => [
        ...prev,
        {
          text: "Document uploaded successfully!",
          isBot: true,
          id: Date.now(),
          isInfo: true,
        },
      ]);
      setShowQuickActions(false);
      fetchOptions();
      setIsFileUploadeLoading(false);
      setShowQuickActions(true);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Upload error:", error);
      toast.error(
        "Error uploading file. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        }
      );
      setIsFileUploadeLoading(false);
    }
  };

  const handleOptionSelect = (action: string) => {
    switch (action) {
      case "upload_file":
        fileInputRef?.current?.click();
        break;
      case "question_answer":
        setShowQuickActions(false);
        setMessages((prev) => [
          ...prev,
          {
            text: questionAnswerMessage,
            isBot: false,
            id: Date.now(),
            isInfo: false,
          },
        ]);
        setShowInputMessage(true);
        break;
      case "summarizer":
        setShowQuickActions(false);
        setMessages((prev) => [
          ...prev,
          {
            text: summaryMessage,
            isBot: false,
            id: Date.now(),
            isInfo: false,
          },
          {
            text: processingMessage,
            isBot: true,
            id: Date.now() + 1,
            isTyping: true,
            isInfo: true,
          },
        ]);
        selectedOptionHandler({ action: "summarizer" });
        break;
      case "generate_questions":
        setShowQuickActions(false);
        setMessages((prev) => [
          ...prev,
          {
            text: generateQuestionsMessage,
            isBot: false,
            id: Date.now(),
            isInfo: false,
          },
          {
            text: processingMessage,
            isBot: true,
            id: Date.now() + 1,
            isTyping: true,
            isInfo: true,
          },
        ]);
        selectedOptionHandler({ action: "generate_questions" });
        break;
      case "main_menu":
        setShowQuickActions(false);
        setShowInputMessage(false);
        setMessages([
          {
            text: initialMessage,
            isBot: true,
            id: 1,
            isInfo: true,
          },
        ]);
        localStorage.removeItem("startedChatbot");
        localStorage.removeItem("documenturl");
        fetchOptions();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      <div className="h-screen flex flex-col pb-10">
        <div className="flex-1 pt-4 pb-4 px-4 overflow-hidden">
          <div className="h-full max-w-7xl mx-auto bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 flex flex-col">
            {/* Enhanced Header */}
            <header className="flex items-center w-full justify-between px-6 py-4 border-b border-white/30 dark:border-gray-700/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-t-2xl">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <FaRobot className="text-2xl text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  File Talk AI
                </h1>
              </button>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <input
                  accept="application/pdf"
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUpload(file);
                    }
                  }}
                />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 scroll-container">
              <div>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isBot={message.isBot}
                    animate={message.isBot && message.isInfo === true}
                    isTyping={message.isTyping}
                  />
                ))}
                {showQuickActions && (
                  <QuickActions
                    onSelect={handleOptionSelect}
                    fetchedActions={fetchedActions}

                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/30 dark:border-gray-700/30 w-full bg-white/20 dark:bg-gray-800/20 rounded-b-2xl">
              <ChatInput
                onSend={handleSendMessage}
                disabled={showInputMessage}
                setInputMessage={setInputMessage}
                inputMessage={inputMessage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-white/90 via-indigo-50/90 to-purple-50/90 dark:from-gray-900/90 dark:via-indigo-950/90 dark:to-purple-950/90 backdrop-blur-lg border-t border-indigo-200/50 dark:border-indigo-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left - Copyright */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaRobot className="text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" />
              <span className="font-medium">© 2025 File Talk AI</span>
            </div>

            {/* Center - Made with love */}
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>by</span>
              <a
                href="https://akshaypanchivala.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Akshay Panchivala
              </a>
            </div>

            {/* Right - Contact */}
            <a
              href="https://akshaypanchivala.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {isFileUploadeLoading && <Loader />}
      <ToastContainer />
    </div>
  );
}

export default ChatApp;
