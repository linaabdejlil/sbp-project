import React from 'react';
import { JobListPage } from './pages/JobListPage';
import { PostJobPage } from './pages/PostJobPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'list' | 'post'>('list');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">JobFinder</h1>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentPage('list')}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 'list'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Find Jobs
              </button>
             
            </div>
          </div>
        </div>
      </nav>

      {currentPage === 'list' ? <JobListPage /> : <PostJobPage />}
    </div>
  );
}

export default App;