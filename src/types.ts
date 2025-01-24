export interface JobSeeker {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  role: 'seeker';
}

export interface Employer {
  id: string;
  name: string;
  company: string;
  role: 'employer';
}


export interface Job {
  id: string;
  employerId: string;
  title: string;
  description: string;
  skillsRequired: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  createdAt: number;
  companyName: string;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  appliedAt: number;
}

export type User = JobSeeker | Employer;

export interface SortOption {
  field: 'salaryRange' | 'createdAt';
  direction: 'asc' | 'desc';
}