import React, { useState } from 'react';

function Reward() {
    // State to keep track of user's points and exchange history
    const [userPoints, setUserPoints] = useState(1000); // Initial points can be fetched from a database or context
    const [exchangeHistory, setExchangeHistory] = useState([]);

    // Sample rewards data - this could come from a database or be defined as state if it changes
    const rewards = [
        { id: 1, name: 'Coupons', pointsRequired: 200 },
        { id: 2, name: 'Paid-Dayoff', pointsRequired: 500 },
        { id: 3, name: 'Plane Ticket', pointsRequired: 1200 }
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

    return (
        <div>
            <h1>Reward</h1>
            <p>Remaining points: {userPoints}</p>
            {rewards.map(reward => (
                <div key={reward.id}>
                    <h2>{reward.name}</h2>
                    <p>Points required: {reward.pointsRequired}</p>
                    <button onClick={() => redeemReward(reward)}>Exchange</button>
                </div>
            ))}
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <h2>Exchange History</h2>
                <ul>
                    {exchangeHistory.map((item, index) => (
                        <li key={index}>
                            {`${item.name} - ${item.pointsRequired} points - ${item.timestamp.toLocaleString()}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Reward;