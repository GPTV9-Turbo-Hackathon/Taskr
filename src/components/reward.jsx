import React, { useState } from 'react';

function Reward() {
    // State to keep track of user's points and exchange history
    const [userPoints, setUserPoints] = useState(1000); // Initial points can be fetched from a database or context
    const [exchangeHistory, setExchangeHistory] = useState([]);

    // Sample rewards data - this could come from a database or be defined as state if it changes
    const rewards = [
        { id: 1, name: 'Coupons', pointsRequired: 200 },
        { id: 2, name: 'Paid-Dayoff', pointsRequired: 500 },
        { id: 3, name: 'Plane Ticket', pointsRequired: 1200 },
        { id: 4, name: 'Plane Ticket', pointsRequired: 1200 },
        { id: 5, name: 'Plane Ticket', pointsRequired: 1200 },
        { id: 6, name: 'Plane Ticket', pointsRequired: 1200 },
        { id: 7, name: 'Plane Ticket', pointsRequired: 1200 },
        { id: 8, name: 'Plane Ticket', pointsRequired: 1200 },
    ];

    // Handle redeeming rewards
    const redeemReward = (reward) => {
        if (userPoints >= reward.pointsRequired) {
            // Subtract points and add to exchange history
            setUserPoints(userPoints - reward.pointsRequired);
            setExchangeHistory([...exchangeHistory, { ...reward, timestamp: new Date() }]);
            alert('Exchange successful!');
        } else {
            alert('Sorry, not enough points');
        }
    };

    // Dummy function for Exchange History button
    const viewExchangeHistory = () => {
        alert('Exchange History Clicked!');
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
                <div className="flex-initial">
                    <h1 className="text-lg font-semibold">Your Points: {userPoints}</h1>
                </div>
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">Rewards</h1>
                </div>
                <div className="flex-initial">
                    <button 
                        onClick={viewExchangeHistory}
                        className="text-lg font-semibold bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                    >
                        Exchange History
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {rewards.map(reward => (
                        <div key={reward.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-2">{reward.name}</h2>
                            <p>Points Required: {reward.pointsRequired}</p>
                            <button
                                onClick={() => redeemReward(reward)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
                            >
                                Exchange
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reward;