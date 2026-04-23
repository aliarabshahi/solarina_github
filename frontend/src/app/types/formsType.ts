
export interface ContactUsRequest {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
}

export interface ProjectOrderRequest {
  full_name: string;
  email: string;
  phone_number: string;
  project_description: string;
  budget?: string;
  deadline?: string;
  files?: File[];
}

export interface ResumeSubmissionRequest {
  full_name: string;
  email: string;
  phone_number: string;
  linkedin_profile?: string;
  github_profile?: string;
  resume_file: File; // 👈 must handle file upload
  cover_letter?: string;
}
