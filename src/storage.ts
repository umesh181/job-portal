import { Application, Job, User } from './types';
import { generateId } from './utills';

const STORAGE_KEYS = {
  USERS: 'jobPortal_users',
  JOBS: 'jobPortal_jobs',
  APPLICATIONS: 'jobPortal_applications',
  CURRENT_USER: 'jobPortal_currentUser',
};

// Dummy jobs data
const dummyJobs: Omit<Job, 'id'>[] = [
  {
    employerId: 'dummy-employer-1',
    title: 'Senior React Developer',
    description: 'Looking for an experienced React developer to join our team. Must have strong TypeScript skills and experience with modern React practices.',
    skillsRequired: ['React', 'TypeScript', 'Redux', 'Node.js'],
    salaryRange: { min: 100000, max: 150000 },
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  },
  {
    employerId: 'dummy-employer-2',
    title: 'Full Stack Developer',
    description: 'Join our fast-growing startup as a Full Stack Developer. Work on exciting projects using modern technologies.',
    skillsRequired: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    salaryRange: { min: 90000, max: 130000 },
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
  },
  {
    employerId: 'dummy-employer-1',
    title: 'UI/UX Designer',
    description: 'Looking for a creative UI/UX designer with experience in designing modern web applications.',
    skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
    salaryRange: { min: 80000, max: 120000 },
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
  },
];

// Initialize dummy data if not exists
const initializeDummyData = () => {
  const jobs = storage.getJobs();
  if (jobs.length === 0) {
    dummyJobs.forEach(job => {
      storage.saveJob(job);
    });
  }
};

export const storage = {
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },
  
  findUser: (name: string, role: 'employer' | 'seeker'): User | null => {
    const users = storage.getUsers();
    return users.find(user => user.name === name && user.role === role) || null;
  },
  
  saveUser: (user: Omit<User, 'id'>) => {
    const existingUser = storage.findUser(user.name, user.role);
    if (existingUser) {
      return existingUser;
    }
    
    const users = storage.getUsers();
    const newUser = { ...user, id: generateId() };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, newUser]));
    return newUser;
  },

  getJobs: (): Job[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || '[]');
  },

  getJobsByEmployer: (employerId: string): Job[] => {
    const jobs = storage.getJobs();
    return jobs.filter(job => job.employerId === employerId);
  },

  saveJob: (job: Omit<Job, 'id' | 'createdAt'>) => {
    const jobs = storage.getJobs();
    const newJob = { 
      ...job, 
      id: generateId(),
      createdAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify([...jobs, newJob]));
    return newJob;
  },

  getApplications: (): Application[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  },

  getApplicationsBySeeker: (seekerId: string): Application[] => {
    const applications = storage.getApplications();
    return applications.filter(app => app.seekerId === seekerId);
  },

  getApplicationsByJob: (jobId: string): Application[] => {
    const applications = storage.getApplications();
    return applications.filter(app => app.jobId === jobId);
  },

  saveApplication: (application: Omit<Application, 'id' | 'appliedAt'>) => {
    const applications = storage.getApplications();
    const newApplication = {
      ...application,
      id: generateId(),
      appliedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([...applications, newApplication]));
    return newApplication;
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
};

// Initialize dummy data
initializeDummyData();