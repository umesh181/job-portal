import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Applications } from './components/applications';
import { Auth } from './components/auth';
import { JobList } from './components/joblist';
import { JobPost } from './components/jobpost';
import { Landing } from './components/landingpage';
import { storage } from './storage';
import { Application, Job, User } from './types';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentUser());
  const [view, setView] = useState<'jobs' | 'applications' | 'post'>('jobs');
  const [jobs, setJobs] = useState<Job[]>(storage.getJobs());
  const [applications, setApplications] = useState<Application[]>(storage.getApplications());
  const [users, setUsers] = useState<User[]>(storage.getUsers());

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    storage.setCurrentUser(user);
    setUsers(storage.getUsers());
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storage.setCurrentUser(null);
    setView('jobs');
    setShowLanding(true);
  };

  const handlePostJob = (jobData: Omit<Job, 'id' | 'employerId' | 'createdAt'>) => {
    if (currentUser?.role !== 'employer') return;
    
    const newJob = storage.saveJob({
      ...jobData,
      employerId: currentUser.id,
    });
    
    setJobs(storage.getJobs());
    setView('jobs');
  };

  const handleApply = (jobId: string) => {
    if (currentUser?.role !== 'seeker') return;

    storage.saveApplication({
      jobId,
      seekerId: currentUser.id,
    });

    setApplications(storage.getApplications());
  };

  if (showLanding) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="header-content">
          <div className="nav-links">
            <button
              onClick={() => setView('jobs')}
              className={`nav-link ${view === 'jobs' ? 'active' : ''}`}
            >
              Jobs
            </button>
            <button
              onClick={() => setView('applications')}
              className={`nav-link ${view === 'applications' ? 'active' : ''}`}
            >
              Applications
            </button>
            {currentUser.role === 'employer' && (
              <button
                onClick={() => setView('post')}
                className={`nav-link ${view === 'post' ? 'active' : ''}`}
              >
                Post Job
              </button>
            )}
          </div>
          <div className="user-info">
            <span className="user-name">
              {currentUser.name} ({currentUser.role === 'employer' ? 'Employer' : 'Job Seeker'})
            </span>
            <button onClick={handleLogout} className="btn btn-primary">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        {view === 'jobs' && currentUser.role === 'seeker' && (
          <JobList
            jobs={jobs}
            applications={applications}
            currentUser={currentUser}
            onApply={handleApply}
          />
        )}
        {view === 'post' && currentUser.role === 'employer' && (
          <JobPost
            currentUser={currentUser}
            onPost={handlePostJob}
          />
        )}
        {view === 'applications' && (
          <Applications
            applications={applications}
            jobs={jobs}
            users={users}
            currentUser={currentUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;