import { Building2, Calendar, IndianRupee } from 'lucide-react';
import { useState } from 'react';
import { Application, Job, JobSeeker, SortOption } from '../types';
import { formatDate, formatSalary } from '../utills';

interface JobListProps {
  jobs: Job[];
  applications: Application[];
  currentUser: JobSeeker;
  onApply: (jobId: string) => void;
}

const AVAILABLE_SKILLS = [
  'React',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'Node.js',
  'Python',
  'Java',
  'SQL',
  'AWS',
  'Docker',
  'Git',
];

export function JobList({ jobs, applications, currentUser, onApply }: JobListProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>({ field: 'createdAt', direction: 'desc' });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const hasApplied = (jobId: string) => {
    return applications.some(app => app.jobId === jobId && app.seekerId === currentUser.id);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.companyName.toLowerCase().includes(searchLower) || // Added company name filtering
      job.skillsRequired.some(skill => skill.toLowerCase().includes(searchLower));
  
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some(skill =>
        job.skillsRequired.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
      );
  
    return matchesSearch && matchesSkills;
  });
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort.field === 'salaryRange') {
      const compareValue = sort.direction === 'asc'
        ? a.salaryRange.min - b.salaryRange.min
        : b.salaryRange.min - a.salaryRange.min;
      return compareValue;
    } else {
      return sort.direction === 'asc'
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt;
    }
  });

  return (
    <div className="container">
      <div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Search jobs by title, company, description, or skills..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="skills-filter">
            <h3>Filter by Skills</h3>
            <div className="skills-list">
              {AVAILABLE_SKILLS.map(skill => (
                <label key={skill} className="skill-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() =>
              setSort(prev => ({
                field: 'salaryRange',
                direction: prev.field === 'salaryRange' && prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`btn ${sort.field === 'salaryRange' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <IndianRupee />
            Salary
          </button>
          <button
            onClick={() =>
              setSort(prev => ({
                field: 'createdAt',
                direction: prev.field === 'createdAt' && prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            className={`btn ${sort.field === 'createdAt' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Calendar />
            Date
          </button>
        </div>
      </div>

      <div className="job-list">
        {sortedJobs.map(job => (
          <div key={job.id} className="job-card fade-in">
            <div>
              <h3 className="job-title">{job.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{job.companyName}</span>
              </div>
            </div>
            <div>
              <div className="job-salary">
                {formatSalary(job.salaryRange.min, job.salaryRange.max)}
              </div>
              <p className="job-description">{job.description}</p>
              <div className="skills-list">
                {job.skillsRequired.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <div>
                <span>Posted {formatDate(job.createdAt)}</span>
                <button
                  onClick={() => onApply(job.id)}
                  disabled={hasApplied(job.id)}
                  className={`btn ${hasApplied(job.id) ? 'btn-disabled' : 'btn-primary'}`}
                >
                  {hasApplied(job.id) ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {sortedJobs.length === 0 && (
          <div>
            <p>No jobs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
