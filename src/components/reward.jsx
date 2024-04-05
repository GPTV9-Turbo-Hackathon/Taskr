import React, { useState } from 'react';

function Reward() {
  const [userPoints, setUserPoints] = useState(1000);
  const [exchangeHistory, setExchangeHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const rewards = [
    { id: 1, name: 'Coupons', pointsRequired: 200 },
    { id: 2, name: 'Paid-Dayoff', pointsRequired: 500 },
    { id: 3, name: 'Plane Ticket', pointsRequired: 1200 },

    { id: 4, name: 'Coffee Voucher', pointsRequired: 50 },
    { id: 5, name: 'Book Token', pointsRequired: 150 },
    { id: 6, name: 'Concert Tickets', pointsRequired: 800 },
    { id: 7, name: 'Gym Membership', pointsRequired: 700 },
    { id: 8, name: 'Massage Session', pointsRequired: 350 },
    { id: 9, name: 'Dinner for Two', pointsRequired: 650 },
    { id: 10, name: 'Cinema Passes', pointsRequired: 250 },
    { id: 11, name: 'Cooking Class', pointsRequired: 400 },
    { id: 12, name: 'Tech Gadgets', pointsRequired: 1200 },
    { id: 13, name: 'Gaming Gear', pointsRequired: 1100 },
    { id: 14, name: 'Weekend Getaway', pointsRequired: 1500 },
    { id: 15, name: 'Spa Retreat', pointsRequired: 950 },
    { id: 16, name: 'Museum Membership', pointsRequired: 300 },
    { id: 17, name: 'Art Supplies', pointsRequired: 220 },
    { id: 18, name: 'Luxury Bedding Set', pointsRequired: 500 },
  ];

  const redeemReward = (reward) => {
    if (userPoints >= reward.pointsRequired) {
      setUserPoints(userPoints - reward.pointsRequired);
      setExchangeHistory([...exchangeHistory, { ...reward, timestamp: new Date() }]);
      alert('Exchange successful!');
    } else {
      alert('Sorry, not enough points');
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 relative">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-700">Reward System</h1>
        <p className="text-xl mb-6 text-center font-semibold text-gray-600">Remaining points: {userPoints}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4">{reward.name}</h2>
              <p className="mb-4">Points required: {reward.pointsRequired}</p>
              <button
                onClick={() => redeemReward(reward)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Exchange
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={toggleHistory}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors absolute top-4 right-4"
        >
          {showHistory ? 'Hide' : 'View'} Exchange History
        </button>

        {showHistory && (
          <div className="fixed top-16 right-16 md:right-16 lg:right-1/4 xl:right-1/3 w-80 md:w-96 h-96 overflow-y-auto bg-white border border-gray-300 p-4 shadow-xl rounded z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Exchange History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
            <ul className="list-disc list-inside">
              {exchangeHistory.map((item, index) => (
                <li key={index} className="mb-2">
                  {`${item.name} - ${item.pointsRequired} points - ${item.timestamp.toLocaleString()}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Reward;
