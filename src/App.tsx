import { JobListPage } from './pages/JobListPage';

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">JobFinder</h1>
            <div className="space-x-4">
              <button
                className={`px-4 py-2 rounded-md bg-blue-100 text-blue-700
                    
                  }`}
              >
                Find Jobs
              </button>

            </div>
          </div>
        </div>
      </nav>

      <JobListPage />
    </div>
  );
}

export default App;