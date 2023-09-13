import React, { useState, useEffect } from 'react';

const mapping = {
    HackerEarth: {
        logo: "https://yt3.ggpht.com/ytc/AAUvwngkLcuAWLtda6tQBsFi3tU9rnSSwsrK1Si7eYtx0A=s176-c-k-c0x00ffffff-no-rj",
        color: "#323754",
    },
    AtCoder: {
        logo: "https://avatars.githubusercontent.com/u/7151918?s=200&v=4",
        color: "#222222",
    },
    CodeChef: {
        logo: "https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg",
        color: "#D0C3AD",
    },
    LeetCode: {
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
        color: "#FFA20E",
    },
    GeeksforGeeks: {
        logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
        color: "#34A853",
    },
    CodeForces: {
        logo: "https://i.pinimg.com/736x/b4/6e/54/b46e546a3ee4d410f961e81d4a8cae0f.jpg",
        color: "#3B5998",
    },
    TopCoder: {
        logo: "https://images.ctfassets.net/b5f1djy59z3a/3MB1wM9Xuwca88AswIUwsK/dad472153bcb5f75ea1f3a193f25eee2/Topcoder_Logo_200px.png",
        color: "#F69322",
    },
    HackerRank: {
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
        color: "#1BA94C",
    },
};


function Subscribe({ selectedPlatforms, onUpdatePlatforms, onSubscribe }) {
    useEffect(() => {
        // Load selected platforms from local storage if available
        const storedPlatforms = localStorage.getItem('selectedPlatforms');
        if (storedPlatforms) {
            onUpdatePlatforms(JSON.parse(storedPlatforms));
        }
    }, [onUpdatePlatforms]);

    const handleSubscription = (platform) => {
        const updatedPlatforms = selectedPlatforms.includes(platform)
            ? selectedPlatforms.filter((p) => p !== platform)
            : [...selectedPlatforms, platform];

        onUpdatePlatforms(updatedPlatforms); // Call the callback prop to update selected platforms
        localStorage.setItem('selectedPlatforms', JSON.stringify(updatedPlatforms));
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Subscribe to Coding Platforms</h2>
            <div className="mt-4">
                {Object.keys(mapping).map((platform) => (
                    <div key={platform} className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center flex-grow">
                            <img
                                src={mapping[platform].logo}
                                alt={platform}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 2,
                                    cursor: "default",
                                }}
                            />
                            <span className="ml-4">{platform}</span>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                checked={selectedPlatforms.includes(platform)}
                                onChange={() => handleSubscription(platform)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscribe;
