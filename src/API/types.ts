// API Response Types based on API documentation

// Success Response Structure
export interface ApiSuccessResponse {
  content: {
    success: boolean;
    message: string;
    data: string;
  };
  userType: "Chatbot";
}

// Error Response Structure
export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Field Validation Error Structure
export interface ValidationErrorResponse {
  error: Record<string, string[]>;
}

// Options Response Structure
export interface OptionItem {
  action: string;
  label: string;
  description: string;
}

export interface OptionsResponse {
  options: OptionItem[];
}

// Action Types
export type ActionType = "question_answer" | "summarizer" | "generate_questions" | "upload_document" | "main_menu";

// Request Payloads
export interface QuestionAnswerRequest {
  action: "question_answer";
  documenturl: string;
  question: string;
}

export interface SummarizerRequest {
  action: "summarizer";
  documenturl: string;
  min_page?: number;
  max_page?: number;
}

export interface GenerateQuestionsRequest {
  action: "generate_questions";
  documenturl: string;
  min_page?: number;
  max_page?: number;
}

export type ConversationRequest = QuestionAnswerRequest | SummarizerRequest | GenerateQuestionsRequest;

// Error Codes
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "PDF_URL_INVALID"
  | "PDF_DOWNLOAD_FAILED"
  | "PDF_TOO_LARGE"
  | "AGENT_PROCESSING_FAILED"
  | "INTERNAL_ERROR";
