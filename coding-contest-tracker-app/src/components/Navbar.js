import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        // Handle the "Logout" action here (e.g., clear user data and navigate to the sign-in page)
        // You can use a routing library like React Router for navigation.
        setUser(null);
    };

    return (
        <nav className="bg-blue-500 p-2 md:p-4 text-white">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center justify-between">
                <li>
                    <Link to="/contests" className="cursor-pointer hover:underline text-center md:text-left">
                        Contests
                    </Link>
                </li>
                <li>
                    <Link to="/subscribe" className="cursor-pointer hover:underline text-center md:text-left">
                        Subscribe
                    </Link>
                </li>
                <li className="relative cursor-pointer" onClick={toggleProfileDropdown}>
                    {user ? (
                        <div className="flex items-center">
                            <span>{user.displayName}</span>
                            <FontAwesomeIcon icon={faUser} className="ml-2" />
                        </div>
                    ) : (
                        <FontAwesomeIcon icon={faUser} />
                    )}
                    {showProfileDropdown && (
                        <ul className="absolute top-8 right-0 bg-white text-black border border-gray-300 rounded-md shadow-lg">
                            {user ? (
                                <>
                                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-100">
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" onClick={handleLogout}>
                                        Logout
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-100">
                                        <Link to="/register">Register</Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 hover:bg-gray-100">
                                        <Link to="/signin">Sign In</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
