import React from 'react';
import Timer from './Timer';
import GoButton from './GoButton';

// The awesome tomato component that holds the timer and go button
const Tomato = props => {
	return (
		<div id="tomato" className="tomato animated bounceInDown">
			<div id="stem">
				<div className="leaf" id="leaf1">
				</div>
				<div className="leaf"  id="leaf2">
				</div>
				<div className="leaf"  id="leaf3">
				</div>
			</div>
			<h2>{props.status}</h2>
			<Timer timer={props.state.timer} />
			<GoButton beginCountdown={props.beginCountdown} />
		</div>
	);
};

export default Tomato;
