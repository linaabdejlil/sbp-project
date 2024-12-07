import React from 'react';
import { Building2, MapPin, Clock } from 'lucide-react';
import { Job } from '../types';
import { Button } from './ui/Button';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
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
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {job.type}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onClick(job)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}