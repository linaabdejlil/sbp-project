import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import { JobDetails } from '../components/JobDetails';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { Job } from '../types';

type ViewState = 'list' | 'details' | 'apply';

export function JobListPage() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [viewState, setViewState] = React.useState<ViewState>('list');

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs/external');
        const jsonResponse = await response.json();

        if (jsonResponse.success && jsonResponse.data) {
          const fetchedJobs = jsonResponse.data.map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.company?.name || 'Unknown Company',
            location: job.location,
            type: job.type,
            salary: job.benefits || 'Not specified',
            description: 'No description provided.',
            requirements: ['No requirements provided.'],
            posted: job.postDate,
            logo: job.company?.logo || 'https://via.placeholder.com/150',
          }));

          setJobs(fetchedJobs);
        } else {
          console.error('Failed to fetch jobs:', jsonResponse.message);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (query: string, location: string) => {
    console.log('Searching for:', query, location);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setViewState('apply');
  };

  const handleApplicationSubmit = (formData: FormData) => {
    console.log('Submitting application:', Object.fromEntries(formData));
    setViewState('list');
    setSelectedJob(null);
    // alert('Application submitted successfully!');
  };

  const renderContent = () => {
    switch (viewState) {
      case 'details':
        return selectedJob ? (
          <JobDetails
            job={selectedJob}
            onClose={() => {
              setViewState('list');
              setSelectedJob(null);
            }}
            onApply={handleApply}
          />
        ) : null;
      case 'apply':
        return selectedJob ? (
          <JobApplicationForm
            job={selectedJob}
            onSubmit={handleApplicationSubmit}
            onCancel={() => {
              setViewState('details');
            }}
          />
        ) : null;
      default:
        return (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={(job) => {
                  setSelectedJob(job);
                  setViewState('details');
                }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Find Your Dream Job
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
