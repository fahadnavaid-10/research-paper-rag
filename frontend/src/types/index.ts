export interface Source {
  title?: string;
  authors?: string;
  year?: string;
  doi?: string;
  journal?: string;
  [key: string]: any;
}

export interface AnswerResponse {
  answer: string;
  sources: Source[];
  context_used: string;
}

export interface QueryRequest {
  question: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  context?: string;
  timestamp: Date;
}
