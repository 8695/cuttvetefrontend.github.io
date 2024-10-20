import React, { useState } from 'react';
import Sidebar from './Sidebar';
import InterViewForm from './InterViewForm';

function Home() {
    const [showForm, setShowInterview] = useState(false);

    const handleForm = () => {
        setShowInterview(!showForm);
    };

    return (
        <div className="flex h-screen">
            
            <div className="text-white p-4">
                <Sidebar />
            </div>

           
            <div className="flex-1 p-4">
                <button 
                    onClick={handleForm} 
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Interview
                </button>

                {showForm && <InterViewForm setShowInterview={setShowInterview} />}
            </div>
        </div>
    );
}

export default Home;
