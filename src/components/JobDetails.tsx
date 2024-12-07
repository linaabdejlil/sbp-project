import React from 'react';
import { Building2, MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '../types';
import { Button } from './ui/Button';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export function JobDetails({ job, onClose, onApply }: JobDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-start gap-6">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.posted}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Job Description</h3>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Requirements</h3>
        <ul className="list-disc list-inside space-y-2">
          {job.requirements.map((req, index) => (
            <li key={index} className="text-gray-700">{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-4">
        <Button variant="primary" size="lg" onClick={() => onApply(job)}>
          Apply Now
        </Button>
        <Button variant="outline" size="lg" onClick={onClose}>
          Back to Jobs
        </Button>
      </div>
    </div>
  );
}