import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import { JobDetails } from '../components/JobDetails';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { Job } from '../types';

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are looking for a Senior React Developer to join our team...',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern frontend tools'
    ],
    posted: '2 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '3',
    title: 'Machine Learning Engineer',
    company: 'AI Innovations',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$140,000 - $180,000',
    description: 'Join our cutting-edge AI team to develop scalable ML models...',
    requirements: [
      '3+ years of experience with Python and TensorFlow',
      'Experience deploying ML models in production',
      'Strong understanding of data preprocessing'
    ],
    posted: '5 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  },
  
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'WebWorks',
    location: 'Remote',
    type: 'Part-time',
    salary: '$60,000 - $80,000',
    description: 'We are seeking a Full Stack Developer with a passion for building web apps...',
    requirements: [
      'Proficient in React and Node.js',
      'Experience with PostgreSQL or MongoDB',
      'Good understanding of CI/CD pipelines'
    ],
    posted: '1 week ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  
  },
  {
    id: '5',
    title: 'Backend Engineer',
    company: 'DataFlow',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Build robust backend systems and APIs for our data-driven platform...',
    requirements: [
      '5+ years of experience with Java and Spring Boot',
      'Familiarity with RESTful API design',
      'Experience with microservices architecture'
    ],
    posted: '3 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'Creative Designs',
    location: 'Los Angeles, CA',
    type: 'Contract',
    salary: '$90,000 - $120,000',
    description: 'Design and implement modern UIs for our e-commerce platform...',
    requirements: [
      'Strong experience with CSS frameworks like Tailwind',
      'Familiarity with Next.js and React',
      'Basic understanding of SEO principles'
    ],
    posted: '4 days ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'CloudSync',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Automate and manage our cloud infrastructure to improve scalability...',
    requirements: [
      '3+ years of experience with AWS or Azure',
      'Proficient in Docker and Kubernetes',
      'Experience with Infrastructure as Code (e.g., Terraform)'
    ],
    posted: '1 day ago',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1470&q=80'
  
  }
  
  // Add more sample jobs as needed
];

type ViewState = 'list' | 'details' | 'apply';

export function JobListPage() {
  const [jobs, setJobs] = React.useState<Job[]>(SAMPLE_JOBS);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [viewState, setViewState] = React.useState<ViewState>('list');

  const handleSearch = (query: string, location: string) => {
    // Implement search logic here
    console.log('Searching for:', query, location);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setViewState('apply');
  };

  const handleApplicationSubmit = (formData: FormData) => {
    // Implement application submission logic here
    console.log('Submitting application:', Object.fromEntries(formData));
    // Reset view state and show success message
    setViewState('list');
    setSelectedJob(null);
    alert('Application submitted successfully!');
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