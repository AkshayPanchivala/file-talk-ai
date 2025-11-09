import { useState, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../constant";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: baseUrl, // 🔁 Change to your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    return Promise.reject(error);
  }
);

// Helper function to provide user-friendly error messages
const getUserFriendlyErrorMessage = (errorCode: string | null, defaultMessage: string): string => {
  if (!errorCode) return defaultMessage;

  const errorMessages: Record<string, string> = {
    'VALIDATION_ERROR': 'Please check your input and try again.',
    'PDF_DOWNLOAD_FAILED': 'Could not download the PDF. Please check the URL.',
    'PDF_URL_INVALID': 'Invalid PDF URL. URL must point to a valid PDF file.',
    'PDF_TOO_LARGE': 'PDF file is too large. Maximum size is 50MB.',
    'AGENT_PROCESSING_FAILED': 'AI processing failed. Please try again.',
    'INTERNAL_ERROR': 'A server error occurred. Please try again later.',
  };

  return errorMessages[errorCode] || defaultMessage;
};

// Types for API handler
interface ApiError {
  response?: {
    data?: {
      error?: string | { code?: string; message?: string; details?: Record<string, unknown> } | Record<string, string[]>;
      message?: string;
    };
  };
  message?: string;
}

const useAxios = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T = unknown>(
      method: string,
      url: string,
      data: Record<string, unknown> | null = null,
      config: Record<string, unknown> = {}
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient({
          method,
          url,
          data,
          ...config,
        });
        return response.data as T;
      } catch (err) {
        const apiError = err as ApiError;
        console.log("Error", apiError);

        // Handle different error response structures
        let errorMessage: string = "Unknown error";
        let errorCode: string | null = null;

        if (apiError.response?.data?.error) {
          // Structured error from API documentation
          if (typeof apiError.response.data.error === 'object' && 'message' in apiError.response.data.error && apiError.response.data.error.message) {
            errorMessage = apiError.response.data.error.message;
            errorCode = apiError.response.data.error.code || null;
          }
          // Field validation errors
          else if (typeof apiError.response.data.error === 'object') {
            const firstError = Object.values(apiError.response.data.error)[0];
            errorMessage = Array.isArray(firstError) ? firstError[0] : String(firstError);
          }
          // Simple string error
          else {
            errorMessage = String(apiError.response.data.error);
          }
        } else if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        } else if (apiError.message) {
          errorMessage = apiError.message;
        } else if (!apiError.response) {
          errorMessage = "Network error. Please check your connection.";
        }

        setError(errorMessage);

        // Display user-friendly error messages based on error codes
        const displayMessage = getUserFriendlyErrorMessage(errorCode, errorMessage);

        toast.error(
          `Error: ${displayMessage}`,
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

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading, error };
};

export type { ApiError };
export default useAxios;
