import React, { useState } from 'react';
import TourTableHeader from './table/TourTableHeader';
import TourTableRow from './table/TourTableRow';
import TourTableExpandedRow from './table/TourTableExpandedRow';

const TourTable = ({ tours, onEdit, onDelete, bolgeler, onCopy, onStatusChange }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!tours.length) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        Henüz tur oluşturulmamış.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-borderless">
        <TourTableHeader />
        <tbody>
          {tours.map((tour, index) => (
            <React.Fragment key={index}>
              <TourTableRow 
                tour={tour}
                index={index}
                isExpanded={expandedRows[index]}
                onToggle={toggleRow}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
                onStatusChange={onStatusChange}
              />
              {expandedRows[index] && (
                <TourTableExpandedRow 
                  tour={tour}
                  bolgeler={bolgeler}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable; 