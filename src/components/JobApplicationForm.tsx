import React, { useState } from 'react';
import { Job } from '../types';

interface JobApplicationFormProps {
  job: Job;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

export function JobApplicationForm({
  job,
  onSubmit,
  onCancel,
}: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files && e.target.files.length > 0) {
        setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('linkedin', formData.linkedin);
    data.append('portfolio', formData.portfolio);
    data.append('coverLetter', formData.coverLetter);
    if (formData.resume) {
      data.append('resume', formData.resume);
    }

    try {
      const response = await fetch(`http://localhost:8080/api/applications`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        onSubmit(data); // Notify parent component
      } else {
        const errorData = await response.json();
        console.error('Failed to submit application:', errorData.message);
        alert('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">
        Apply for {job.title} at {job.company}
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={formData.linkedin}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio Link"
          value={formData.portfolio}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={formData.coverLetter}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="p-2 border rounded"
          required
        />
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
