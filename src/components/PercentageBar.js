import React from 'react';

const PercentageBar = ({ dividend, divisor }) => {
  const totalSegments = 40;
  const percentage = (dividend / divisor) * 100;
  const filledSegments = Math.round((percentage / 100) * totalSegments);

  return (
    <div className="flex items-center border border-black w-52 rounded-full">
      <div className="flex w-full h-5 rounded-full">
        <div className="bg-green-500 h-full rounded-full" style={{ width: `${(filledSegments / totalSegments) * 100}%` }}></div>
        <div className="bg-gray-200 h-full flex-grow rounded-full"></div>
      </div>
    </div>
  );
}

export default PercentageBar;
