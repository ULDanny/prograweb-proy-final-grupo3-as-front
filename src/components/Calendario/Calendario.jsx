import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendario.css'; 

const Calendario = ({ startDate, handleDateChange }) => {
    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="custom-calendar" 
            calendarClassName="custom-calendar-container" 
            calendarButtonClassName="custom-calendar-button" 
        />
    );
}

export default Calendario;
