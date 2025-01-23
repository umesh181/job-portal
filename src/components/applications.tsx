import { Briefcase, Calendar, User as UserIcon } from 'lucide-react';
import { Application, Job, JobSeeker, User } from '../types';
import { formatDate } from '../utills';

interface ApplicationsProps {
  applications: Application[];
  jobs: Job[];
  users: User[];
  currentUser: User;
}

export function Applications({ applications, jobs, users, currentUser }: ApplicationsProps) {
  const relevantApplications = currentUser.role === 'employer'
    ? applications.filter(app => 
        jobs.some(job => job.id === app.jobId && job.employerId === currentUser.id)
      )
    : applications.filter(app => app.seekerId === currentUser.id);

  const getJob = (jobId: string) => jobs.find(job => job.id === jobId);
  const getUser = (userId: string) => users.find(user => user.id === userId);

  return (
    <div className="container">
      <div className="header">
        <Briefcase className="icon" />
        <h2 className="title">
          {currentUser.role === 'employer' ? 'Job Applications' : 'Your Applications'}
        </h2>
      </div>

      <div className="applications-list">
        {relevantApplications.map(application => {
          const job = getJob(application.jobId);
          const applicant = currentUser.role === 'employer' 
            ? getUser(application.seekerId)
            : currentUser;

          if (!job || !applicant) return null;

          return (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <h3 className="job-title">{job.title}</h3>
                {currentUser.role === 'employer' && (
                  <div className="applicant-info">
                    <UserIcon className="icon-small" />
                    <span>{(applicant as JobSeeker).name}</span>
                  </div>
                )}
              </div>
              
              <div className="application-content">
                <div className="application-meta">
                  <div className="meta-info">
                    <Calendar className="icon-small" />
                    <span>Applied on {formatDate(application.appliedAt)}</span>
                  </div>
                </div>
                
                {currentUser.role === 'employer' && (
                  <>
                    <div className="skills-section">
                      <h4 className="section-title">Skills:</h4>
                      <div className="skills-list">
                        {(applicant as JobSeeker).skills.map(skill => (
                          <span key={skill} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="experience-section">
                      <h4 className="section-title">Experience:</h4>
                      <p className="experience-text">
                        {(applicant as JobSeeker).experience}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        {relevantApplications.length === 0 && (
          <div className="no-applications">
            <p className="no-applications-text">
              {currentUser.role === 'employer' 
                ? 'No applications received yet.'
                : 'You haven\'t applied to any jobs yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
