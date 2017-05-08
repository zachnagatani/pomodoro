import React from 'react';

// Button to start the timer
const GoButton = props => {
	return (
		<button className="btn btn-default go-btn" onClick={() => {props.beginCountdown()}}>GO</button>
	);
};

export default GoButton;