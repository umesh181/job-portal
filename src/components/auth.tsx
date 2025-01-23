import { UserCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { storage } from '../storage';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isEmployer, setIsEmployer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experience: '',
    company: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = isEmployer
      ? {
          name: formData.name,
          company: formData.company,
          role: 'employer' as const,
        }
      : {
          name: formData.name,
          skills: formData.skills.split(',').map(s => s.trim()),
          experience: formData.experience,
          role: 'seeker' as const,
        };

    const savedUser = storage.saveUser(user);
    onLogin(savedUser);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="text-center">
          <UserCircle2 className="icon" />
          <h2 className="title">Welcome to JobHub</h2>
          <p className="subtitle">Create or access your account</p>
        </div>

        <div className="role-buttons">
          <button
            className={`role-button ${!isEmployer ? 'active' : ''}`}
            onClick={() => setIsEmployer(false)}
          >
            Job Seeker
          </button>
          <button
            className={`role-button ${isEmployer ? 'active' : ''}`}
            onClick={() => setIsEmployer(true)}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          {isEmployer ? (
            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Enter your company name"
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Skills (comma-separated)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., React, JavaScript, Node.js"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Experience</label>
                <textarea
                  required
                  className="form-textarea"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Describe your work experience..."
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-full">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
