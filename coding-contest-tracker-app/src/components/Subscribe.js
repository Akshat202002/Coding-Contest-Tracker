import React, { useState } from 'react';

function Subscribe({ contests, onSubscribe }) {
    const [selectedContest, setSelectedContest] = useState('');
    const [subscribedContests, setSubscribedContests] = useState([]);

    const handleSubscription = () => {
        if (selectedContest) {
            setSubscribedContests([...subscribedContests, selectedContest]);
            onSubscribe([...subscribedContests, selectedContest]);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Subscribe to Contests</h2>
            <div className="flex space-x-4 mt-4">
                <select
                    className="border p-2 rounded"
                    value={selectedContest}
                    onChange={(e) => setSelectedContest(e.target.value)}
                >
                    <option value="">Select a Contest</option>
                    {contests.map((contest) => (
                        <option key={contest.name} value={contest.name}>
                            {contest.name}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSubscription}
                >
                    Subscribe
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Subscribed Contests</h3>
                <ul>
                    {subscribedContests.map((contest) => (
                        <li key={contest}>{contest}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Subscribe;
