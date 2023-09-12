import React, { useState } from 'react';

function ContestColumns({ liveContests, todayContests, upcomingContests }) {
    const [activeView, setActiveView] = useState('today');

    const isContestLive = (contest) => {
        const currentTime = new Date().getTime();
        const startTime = new Date(contest.start_time).getTime();
        const endTime = new Date(contest.end_time).getTime();
        return startTime <= currentTime && currentTime <= endTime;
    };

    const formatDate = (time) => {
        const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
        return new Date(time).toLocaleDateString('en-US', options);
    };

    const renderTimeBox = (time, isStart) => (
        <div className={`rounded-md p-1 text-white ${isStart ? 'bg-green-500' : 'bg-blue-500'}`}>
            {new Date(time).toLocaleTimeString('en-US', { hour12: false })}
        </div>
    );

    const renderContestCard = (contest) => (
        <div
            key={contest.name}
            className="bg-white rounded-lg shadow-md p-4 mb-4 transition duration-300 hover:shadow-lg w-full"
        >
            <div className="flex flex-col md:flex-row items-center justify-between">
                <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-lg font-semibold md:text-xl md:mr-4 text-center md:text-left"
                >
                    {contest.name}
                </a>
                <div className="flex flex-col items-center md:items-end mt-2 md:mt-0">
                    <span>{formatDate(contest.start_time)}</span>
                    <span>{formatDate(contest.end_time)}</span>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <div className="flex flex-col items-center md:items-end">
                    {renderTimeBox(contest.start_time, true)}
                </div>
                <div className="flex flex-col items-center md:items-end ml-4">
                    {renderTimeBox(contest.end_time, false)}
                </div>
            </div>
        </div>
    );

    const liveContestsList = liveContests.filter(isContestLive);

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                <button
                    className={`py-2 px-4 rounded ${activeView === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setActiveView('today')}
                >
                    Today
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeView === 'live' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setActiveView('live')}
                >
                    Live Contests
                </button>
                <button
                    className={`py-2 px-4 rounded ${activeView === 'upcoming' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setActiveView('upcoming')}
                >
                    Upcoming Contests
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-2">
                {activeView === 'today' && todayContests.map((contest) => renderContestCard(contest))}
                {activeView === 'live' && liveContestsList.map((contest) => renderContestCard(contest))}
                {activeView === 'upcoming' && upcomingContests.map((contest) => renderContestCard(contest))}
            </div>
        </div>
    );
}

export default ContestColumns;
