import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StatsComponent = ({ user, leetCodeUsername }) => {
    const [totalSolved, setTotalSolved] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [toastDisplayed, setToastDisplayed] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && !leetCodeUsername && !toastDisplayed) {
            // If leetCodeUsername is empty and toast hasn't been displayed yet, show the toast
            toast.error('Please enter your LeetCode username first', {
                autoClose: 2000,
            });
            setToastDisplayed(true); // Set toastDisplayed to true to prevent further toasts
            navigate('/account');
            return; // Stop further execution of the useEffect
        }

        if (!loading && user) {
            fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}?t=${Date.now()}`)
                .then(response => response.json())
                .then(data => {
                    setTotalSolved(data.totalSolved);
                    setTotalQuestions(data.totalQuestions);
                })
                .catch(error => console.log(error));
        } else {
            // Reset the state when the user logs out
            setTotalSolved(0);
            setTotalQuestions(0);
        }

        // Set loading to false after the initial data fetching
        if (loading) {
            setLoading(false);
        }
    }, [user, leetCodeUsername, toastDisplayed, loading, navigate]);

    const progress = (totalSolved / totalQuestions) * 100;
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Stats</h2>

            {/* Render the external URL below the progress bar */}
            <div className="mt-4">
                <iframe
                    title="External Content"
                    src={`https://leetcard.jacoblin.cool/${leetCodeUsername}?ext=activity&theme=light`}
                    className="w-full h-96"
                />
            </div>
        </div>
    );
};

export default StatsComponent;
