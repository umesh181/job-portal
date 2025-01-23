import { Building2, Calendar, DollarSign, Search } from 'lucide-react';
import { useState } from 'react';
import { Application, Job, JobSeeker, SortOption } from '../types';
import { formatDate, formatSalary } from '../utills';

interface JobListProps {
  jobs: Job[];
  applications: Application[];
  currentUser: JobSeeker;
  onApply: (jobId: string) => void;
}

export function JobList({ jobs, applications, currentUser, onApply }: JobListProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>({ field: 'createdAt', direction: 'desc' });

  const hasApplied = (jobId: string) => {
    return applications.some(app => app.jobId === jobId && app.seekerId === currentUser.id);
  };

  const filteredJobs = jobs.filter(job => {
    const searchLower = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.skillsRequired.some(skill => skill.toLowerCase().includes(searchLower))
    );
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
      <div >
        <div >
          <div >
            <Search/>
            <input
              type="text"
              placeholder="Search jobs by title, description, or skills..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSort(prev => ({
              field: 'salaryRange',
              direction: prev.field === 'salaryRange' && prev.direction === 'asc' ? 'desc' : 'asc'
            }))}
            className={`btn ${sort.field === 'salaryRange' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <DollarSign/>
            Salary
          </button>
          <button
            onClick={() => setSort(prev => ({
              field: 'createdAt',
              direction: prev.field === 'createdAt' && prev.direction === 'asc' ? 'desc' : 'asc'
            }))}
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
            <div >
              <h3 className="job-title">{job.title}</h3>
              <div >
                <Building2 />
                <span>Company Name</span>
              </div>
            </div>
            <div >
              <div className="job-salary">
                <DollarSign />
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
                <span >
                  Posted {formatDate(job.createdAt)}
                </span>
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
          <div >
            <p >No jobs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}