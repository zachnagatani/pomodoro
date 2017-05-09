import React from 'react';

// Allows the timer to be reset
const ResetLink = props => {
	return (
		<div className="text-center">
			<a className="reset-link" href="#" onClick={(e) => props.resetCountdown(e)}>Reset Timer</a>
		</div>
	);
};

export default ResetLink;
