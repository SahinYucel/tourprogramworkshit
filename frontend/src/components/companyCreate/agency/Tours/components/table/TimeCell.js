import React from 'react';

const TimeCell = ({ times }) => {
  const formatTime = (time) => {
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
  };

  return (
    <div className="d-flex flex-column gap-1">
      {(times || [times]).map((time, i) => (
        <div key={i} className="badge bg-light text-dark">
          {formatTime(time)} 
          {time.region && time.area && (
            <span className="ms-1 text-muted">
              ({time.region} - {time.area})
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeCell; 