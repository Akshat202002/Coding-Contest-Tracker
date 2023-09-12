// App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'; // Import Navbar component
import ContestColumns from './components/ContestsCoulmns'; // Import ContestColumns component
import Subscribe from './components/Subscribe';
function App() {
  const [activeTab, setActiveTab] = useState('contests');
  const [contests, setContests] = useState([]);
  const [liveContests, setLiveContests] = useState([]);
  const [todayContests, setTodayContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [subscribedContests, setSubscribedContests] = useState([]);




  useEffect(() => {
    // Fetch contest data from the API
    fetch('https://kontests.net/api/v1/all')
      .then((response) => response.json())
      .then((data) => {
        // Organize contests into live, today, and upcoming
        const currentDate = new Date();
        const live = [];
        const today = [];
        const upcoming = [];

        data.forEach((contest) => {
          const startTime = new Date(contest.start_time);
          if (startTime <= currentDate) {
            live.push(contest);
          } else if (
            startTime.getDate() === currentDate.getDate() &&
            startTime.getMonth() === currentDate.getMonth() &&
            startTime.getFullYear() === currentDate.getFullYear()
          ) {
            today.push(contest);
          } else {
            upcoming.push(contest);
          }
        });

        setLiveContests(live);
        setTodayContests(today);
        setUpcomingContests(upcoming);
        setContests(data);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubscribe = (subscribed) => {
    setSubscribedContests(subscribed);
  };




  return (
    <div>
      <Navbar onTabChange={handleTabChange} />
      {activeTab === 'contests' ? (
        <ContestColumns
          liveContests={liveContests}
          todayContests={todayContests}
          upcomingContests={upcomingContests}

        />
      ) : (
        <Subscribe contests={contests} onSubscribe={handleSubscribe} />
      )}
    </div>
  );
}

export default App;
