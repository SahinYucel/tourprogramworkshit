import React from 'react';
import StatusCell from './StatusCell';
import ActionButtons from './ActionButtons';

const TourTableRow = ({ 
  tour, 
  index, 
  isExpanded, 
  onToggle, 
  onEdit, 
  onDelete, 
  onCopy, 
  onStatusChange 
}) => {
  return (
    <tr 
      className="tour-header position-relative" 
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: isExpanded ? '#f8f9fa' : 'transparent'
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
        }
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <td 
        onClick={() => onToggle(index)}
        style={{
          width: '40px',
          textAlign: 'center'
        }}
      >
        <div 
          className={`d-flex align-items-center justify-content-center rounded-circle ${isExpanded ? 'bg-primary' : 'bg-light'}`}
          style={{
            width: '24px',
            height: '24px',
            transition: 'all 0.2s ease'
          }}
        >
          <i className={`bi bi-${isExpanded ? 'dash' : 'plus'}-lg ${isExpanded ? 'text-white' : 'text-primary'}`}></i>
        </div>
      </td>
      <td>
        <StatusCell 
          isActive={tour.isActive}
          onChange={() => onStatusChange(tour)}
          index={index}
        />
      </td>
      <td onClick={() => onToggle(index)}>
        <span className="fw-medium">{tour.tourName}</span>
      </td>
      <td onClick={() => onToggle(index)}>
        <div className="d-flex flex-column">
          <span>{tour.operator}</span>
          {tour.operatorId && (
            <small className="text-muted">ID: {tour.operatorId}</small>
          )}
        </div>
      </td>
      <td>
        <ActionButtons
          onEdit={() => onEdit(tour)}
          onDelete={() => onDelete(tour)}
          onCopy={() => onCopy(tour)}
        />
      </td>
    </tr>
  );
};

export default TourTableRow; 