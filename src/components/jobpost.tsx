import { BriefcaseIcon, DollarSign, PlusCircle, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { Employer } from '../types';

interface JobPostProps {
  currentUser: Employer;
  onPost: (job: {
    title: string;
    description: string;
    skillsRequired: string[];
    salaryRange: { min: number; max: number };
  }) => void;
}

export function JobPost({ currentUser, onPost }: JobPostProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    minSalary: '',
    maxSalary: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onPost({
      title: formData.title,
      description: formData.description,
      skillsRequired: formData.skills.split(',').map(s => s.trim()),
      salaryRange: {
        min: parseInt(formData.minSalary),
        max: parseInt(formData.maxSalary),
      },
    });

    setFormData({
      title: '',
      description: '',
      skills: '',
      minSalary: '',
      maxSalary: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card-bg rounded-lg shadow-lg p-6 fade-in">
          <div className="flex items-center gap-3 mb-6">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Post a New Job</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <div className="relative">
                <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
                <input
                  type="text"
                  required
                  className="form-input pl-10"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior React Developer"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                required
                rows={4}
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the job role, responsibilities, and requirements..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Skills</label>
              <div className="relative">
                <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
                <input
                  type="text"
                  required
                  className="form-input pl-10"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., React, TypeScript, Node.js"
                />
              </div>
              <small className="text-text-secondary text-sm mt-1 block">
                Separate skills with commas
              </small>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Minimum Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
                  <input
                    type="number"
                    required
                    min="0"
                    className="form-input pl-10"
                    value={formData.minSalary}
                    onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Maximum Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
                  <input
                    type="number"
                    required
                    min="0"
                    className="form-input pl-10"
                    value={formData.maxSalary}
                    onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              <PlusCircle className="h-5 w-5" />
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}