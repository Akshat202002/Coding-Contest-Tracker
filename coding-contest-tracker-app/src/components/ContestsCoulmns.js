// ContestColumns.js
import React, { useEffect, useState } from 'react';

function ContestColumns({ liveContests, todayContests, upcomingContests }) {
    const isContestLive = (contest) => {
        const currentTime = new Date().getTime();
        const startTime = new Date(contest.start_time).getTime();
        const endTime = new Date(contest.end_time).getTime();
        return startTime <= currentTime && currentTime <= endTime;
    };



    const renderContestCard = (contest) => (
        <div
            key={contest.name}
            className="bg-white rounded-lg shadow-md p-4 mb-4 transition duration-300 hover:shadow-lg"
        >
            <a
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xl font-semibold"
            >
                {contest.name}
            </a>
            <p className="text-gray-600">
                Start Time: {new Date(contest.start_time).toLocaleString()}
            </p>
            <p className="text-gray-600">
                End Time: {new Date(contest.end_time).toLocaleString()}
            </p>
        </div>
    );

    const liveContestsList = liveContests.filter(isContestLive);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {/* Live Contests */}
            <div className="bg-gray-200 p-4">
                <h2 className="text-lg font-semibold">Live Contests</h2>
                {liveContestsList.map(renderContestCard)}
            </div>

            {/* Today */}
            <div className="bg-gray-200 p-4">


                <h2 className="text-lg font-semibold">Today</h2>
                {todayContests.map(renderContestCard)}
            </div>

            {/* Upcoming Contests */}
            <div className="bg-gray-200 p-4">
                <h2 className="text-lg font-semibold">Upcoming Contests</h2>
                {upcomingContests.map(renderContestCard)}
            </div>
        </div>
    );
}

export default ContestColumns;
