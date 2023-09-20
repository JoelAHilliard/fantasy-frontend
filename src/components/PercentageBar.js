import React from 'react';

const PercentageBar = ({ dividend, divisor }) => {
  const totalSegments = 40;
  const percentage = (dividend / divisor) * 100;
  const filledSegments = Math.round((percentage / 100) * totalSegments);

  return (
    
    <div className="flex items-center border border-black w-75 rounded">
      <div className="flex w-full h-5 rounded">
        <div className="bg-green-500 h-full rounded-s" style={{ width: `${(filledSegments / totalSegments) * 100}%` }}></div>
        <div className="bg-gray-300 h-full flex-grow rounded-e"></div>
      </div>
    </div>
  );
}

export default PercentageBar;
