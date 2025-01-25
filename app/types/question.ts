export interface Question {
  id: string;
  categorie: string;
  question: string;
  reponse: string;
  mots_cles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse {
  success: boolean;
  data: Question[];
  message?: string;
} 