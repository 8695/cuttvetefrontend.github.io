import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';


function InterViewForm({setShowInterview}) {
  const { register, handleSubmit } = useForm();
  const [candidates, setCandidates] = useState(['']); // Initial state with one input

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      add_candidate: candidates.filter(email => email) // Filter out empty strings
    };

    console.log("formattedData",formattedData)

    try {
      const response = await axios.post(`${BASE_URL}/sendMeeting`, formattedData);

      if (response) {
        toast.success(response.data.message);
        setShowInterview(false);
      }else{
        toast.error( "Error sending meting request")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCandidate = () => {
    setCandidates([...candidates, '']); // Add an empty string for a new input
  };

  const handleCandidateChange = (index, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value; // Update the specific input
    setCandidates(updatedCandidates);
  };

  const handleRemoveCandidate = (index) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index); // Remove input at index
    setCandidates(updatedCandidates);
  };

  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <label htmlFor="job_title">Job Title</label>
                  </div>
                  <div className="lg:col-span-2">
                    <input
                      type="text"
                      {...register('job_title')}
                      id="job_title"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder='Enter Job Title'
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label htmlFor="job_description">Job Description</label>
                  </div>
                  <div className="lg:col-span-2">
                    <textarea
                      {...register('job_description')}
                      id="job_description"
                      className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder='Enter Job Description'
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <label htmlFor="experience_level">Experience Level</label>
                  </div>
                  <div className="lg:col-span-2">
                    <select {...register('experience_level')} id="experience_level" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                      <option value="entry-level">Entry Level</option>
                      <option value="mid-level">Mid Level</option>
                      <option value="senior-level">Senior Level</option>
                    </select>
                  </div>

                  <div className="lg:col-span-1">
                    <label htmlFor="add_candidate">Add Candidates</label>
                  </div>
                  <div className="lg:col-span-2">
                    {candidates.map((email, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleCandidateChange(index, e.target.value)}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder='Enter Candidate Email'
                          required
                        />
                        <button type="button" onClick={() => handleRemoveCandidate(index)} className="ml-2 text-red-500">
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddCandidate} className="mt-2 text-blue-500">
                      Add Another Candidate
                    </button>
                  </div>

                  <div className="lg:col-span-1">
                    <label htmlFor="end_date">End Date</label>
                  </div>
                  <div className="lg:col-span-2">
                    <input
                      type="date"
                      {...register('end_date')}
                      id="end_date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>
                </div>

                {/* Button Container */}
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterViewForm;
