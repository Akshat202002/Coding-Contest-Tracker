import React, { useState } from 'react';

function Navbar({ onTabChange }) {
    const [activeTab, setActiveTab] = useState('contests');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4">
                <li
                    className={`cursor-pointer hover:underline ${activeTab === 'contests' ? 'font-semibold' : ''
                        }`}
                    onClick={() => handleTabChange('contests')}
                >
                    Contests
                </li>
                <li
                    className={`cursor-pointer hover:underline ${activeTab === 'subscribe' ? 'font-semibold' : ''
                        }`}
                    onClick={() => handleTabChange('subscribe')}
                >
                    Subscribe
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
