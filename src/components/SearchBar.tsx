import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/Button';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full ">
      <div className="flex gap-2 p-2 bg-white rounded-lg shadow-md">
        <div className="flex-1 flex items-center gap-2 px-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full py-2 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 flex items-center gap-2 px-4 border-l">
          <MapPin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            className="w-full py-2 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary">
          Search Jobs
        </Button>
      </div>
    </form>
  );
}