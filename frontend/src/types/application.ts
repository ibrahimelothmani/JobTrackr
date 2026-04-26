export type ApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected";

export interface Company {
  id: string;
  name: string;
  website?: string | null;
}

export interface Application {
  id: string;
  company: Company;
  company_id: string;
  role: string;
  status: ApplicationStatus;
  applied_at: string;
  salary_min?: number | null;
  salary_max?: number | null;
  notes?: string | null;
  updated_at: string;
}

export interface CreateApplicationPayload {
  company_id: string;
  role: string;
  status?: ApplicationStatus;
  applied_at: string;
  salary_min?: number;
  salary_max?: number;
  notes?: string;
}

export interface UpdateApplicationPayload {
  role?: string;
  status?: ApplicationStatus;
  salary_min?: number;
  salary_max?: number;
  notes?: string;
}
